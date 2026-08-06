"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanExpiredJobs = exports.fetchGoogleJobs = void 0;
const functions = __importStar(require("firebase-functions/v1"));
const params_1 = require("firebase-functions/params");
const admin = __importStar(require("firebase-admin"));
const firestore_1 = require("firebase-admin/firestore");
const axios_1 = __importDefault(require("axios"));
// Initialize Firebase Admin
admin.initializeApp();
const db = (0, firestore_1.getFirestore)();
// ----------------------------------------------------------------------
// CRON JOB 1: GoogleJobsFetcher (Runs daily at 2:00 AM)
// ----------------------------------------------------------------------
exports.fetchGoogleJobs = functions.pubsub.schedule("0 2 * * *").timeZone("Asia/Kolkata").onRun(async (context) => {
    var _a, _b, _c, _d, _e;
    console.log("Starting daily Google Jobs aggregation via SerpApi...");
    // Note: For Phase 2 launch, we are using the Free Tier (100 queries/month = ~3 queries/day)
    const queries = [
        "IT Services jobs in Odisha",
        "Healthcare jobs in Bhubaneswar",
        "Retail Management jobs in India"
    ];
    const serpApiKey = (0, params_1.defineString)("SERPAPI_KEY");
    const apiKey = serpApiKey.value();
    let totalJobsAdded = 0;
    for (const query of queries) {
        try {
            if (apiKey === "MOCK_KEY_FOR_TESTING") {
                console.log(`[MOCK MODE] Skipping actual API call for: ${query}`);
                continue; // Skip actual API calls during initial deploy if no key is set
            }
            const response = await axios_1.default.get("https://serpapi.com/search.json", {
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
                    salary: ((_a = job.detected_extensions) === null || _a === void 0 ? void 0 : _a.salary) || "Not Disclosed",
                    type: ((_b = job.detected_extensions) === null || _b === void 0 ? void 0 : _b.schedule_type) || "Full-time",
                    industry: "Aggregated", // Generic fallback
                    logo: job.thumbnail || `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company_name || 'A')}&background=random`,
                    posted: ((_c = job.detected_extensions) === null || _c === void 0 ? void 0 : _c.posted_at) || "Just now",
                    source: "external",
                    applyLink: ((_e = (_d = job.related_links) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.link) || "https://google.com/search?q=jobs",
                    createdAt: firestore_1.FieldValue.serverTimestamp(),
                    expiresAt: firestore_1.Timestamp.fromDate(expiresAt),
                    verified: false
                };
                // Use a unique ID to prevent duplicates (e.g., hash of company+title)
                const jobId = `ext_${Buffer.from(`${newJob.company}_${newJob.title}`).toString('base64').replace(/[^a-zA-Z0-9]/g, '')}`;
                await db.collection("shyamdash_jobs").doc(jobId).set(newJob, { merge: true });
                totalJobsAdded++;
            }
        }
        catch (error) {
            console.error(`Error fetching jobs for query '${query}':`, error);
        }
    }
    console.log(`Successfully completed daily aggregation. Added/Updated ${totalJobsAdded} external jobs.`);
    return null;
});
// ----------------------------------------------------------------------
// CRON JOB 2: ExpiredJobsCleaner (Runs daily at 3:00 AM)
// ----------------------------------------------------------------------
exports.cleanExpiredJobs = functions.pubsub.schedule("0 3 * * *").timeZone("Asia/Kolkata").onRun(async (context) => {
    console.log("Starting daily cleanup of expired external jobs...");
    const now = firestore_1.Timestamp.now();
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
    }
    catch (error) {
        console.error("Error cleaning up expired jobs:", error);
    }
    return null;
});
//# sourceMappingURL=index.js.map