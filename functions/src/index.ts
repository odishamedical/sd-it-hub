import * as functions from "firebase-functions/v1";
import { defineString } from "firebase-functions/params";
import * as admin from "firebase-admin";
import { getFirestore, FieldValue, Timestamp } from "firebase-admin/firestore";
import axios from "axios";

// Initialize Firebase Admin
admin.initializeApp();
const db = getFirestore();

// ----------------------------------------------------------------------
// CRON JOB 1: GoogleJobsFetcher (Runs daily at 2:00 AM)
// ----------------------------------------------------------------------
export const fetchGoogleJobs = functions.pubsub.schedule("0 2 * * *").timeZone("Asia/Kolkata").onRun(async (context) => {
  console.log("Starting daily Google Jobs aggregation via SerpApi...");
  
  // Note: For Phase 2 launch, we are using the Free Tier (250 queries/month = ~8 queries/day)
  let queries = [
    "IT Services jobs in Odisha",
    "Healthcare jobs in Bhubaneswar",
    "Retail Management jobs in India"
  ];
  
  try {
    const settingsDoc = await db.collection("shyamdash_scraper_settings").doc("global").get();
    if (settingsDoc.exists) {
      const data = settingsDoc.data();
      if (data && Array.isArray(data.queries) && data.queries.length > 0) {
        queries = data.queries;
      }
    }
  } catch (error) {
    console.error("Failed to fetch custom queries, falling back to defaults:", error);
  }

  // Cap at 8 queries strictly to prevent going over 250/month Free Tier
  queries = queries.slice(0, 8);
  
  const serpApiKey = defineString("SERPAPI_KEY");
  const apiKey = serpApiKey.value();
  
  let totalJobsAdded = 0;

  for (const query of queries) {
    try {
      if (apiKey === "MOCK_KEY_FOR_TESTING") {
        console.log(`[MOCK MODE] Skipping actual API call for: ${query}`);
        continue; // Skip actual API calls during initial deploy if no key is set
      }

      const response = await axios.get("https://serpapi.com/search.json", {
        params: {
          engine: "google_jobs",
          q: query,
          api_key: apiKey
        }
      });

      const jobsList = response.data.jobs_results || [];
      
      for (const job of jobsList) {
        // Calculate expiration date (Current Date + 30 days)
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);

        const newJob = {
          title: job.title || "Unknown Title",
          company: job.company_name || "Unknown Company",
          location: job.location || "Remote",
          description: job.description || "No description provided.",
          salary: job.detected_extensions?.salary || "Not Disclosed",
          type: job.detected_extensions?.schedule_type || "Full-time",
          industry: "Aggregated", // Generic fallback
          logo: job.thumbnail || `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company_name || 'A')}&background=random`,
          posted: job.detected_extensions?.posted_at || "Just now",
          source: "external",
          applyLink: job.related_links?.[0]?.link || "https://google.com/search?q=jobs",
          createdAt: FieldValue.serverTimestamp(),
          expiresAt: Timestamp.fromDate(expiresAt),
          verified: false
        };

        // Use a unique ID to prevent duplicates (e.g., hash of company+title)
        const jobId = `ext_${Buffer.from(`${newJob.company}_${newJob.title}`).toString('base64').replace(/[^a-zA-Z0-9]/g, '')}`;
        
        await db.collection("shyamdash_jobs").doc(jobId).set(newJob, { merge: true });
        totalJobsAdded++;
      }
    } catch (error) {
      console.error(`Error fetching jobs for query '${query}':`, error);
    }
  }

  console.log(`Successfully completed daily aggregation. Added/Updated ${totalJobsAdded} external jobs.`);
  return null;
});

// ----------------------------------------------------------------------
// CRON JOB 2: ExpiredJobsCleaner (Runs daily at 3:00 AM)
// ----------------------------------------------------------------------
export const cleanExpiredJobs = functions.pubsub.schedule("0 3 * * *").timeZone("Asia/Kolkata").onRun(async (context) => {
  console.log("Starting daily cleanup of expired external jobs...");
  
  const now = Timestamp.now();
  
  try {
    // Find all jobs where expiresAt is less than the current time
    const snapshot = await db.collection("shyamdash_jobs")
      .where("expiresAt", "<", now)
      .get();
      
    if (snapshot.empty) {
      console.log("No expired jobs found today.");
      return null;
    }
    
    // Create a batch to delete all expired jobs at once (max 500 per batch)
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    console.log(`Successfully deleted ${snapshot.size} expired jobs.`);
  } catch (error) {
    console.error("Error cleaning up expired jobs:", error);
  }
  
  return null;
});
