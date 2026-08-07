import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { keyword, location, industry, jobType, experience, workplaceType } = body;

    if (!keyword) {
      return NextResponse.json({ error: "Keyword is required" }, { status: 400 });
    }

    // ==========================================
    // LIVE API INTEGRATION (SerpApi - Google Jobs)
    // ==========================================
    const query = `${keyword} in ${location} ${jobType} ${workplaceType}`;
    const response = await fetch(`https://serpapi.com/search.json?engine=google_jobs&q=${encodeURIComponent(query)}&api_key=${process.env.SERPAPI_KEY}`, {
      method: 'GET'
    });
    
    const rawData = await response.json();
    
    // Map raw SerpApi data into our strict schema
    const mappedJobs = (rawData.jobs_results || []).map((job: any) => ({
      title: job.title || 'Unknown Title',
      company: job.company_name || 'Unknown Company',
      location: job.location || 'Not Specified',
      jobType: job.detected_extensions?.schedule_type || 'Full-time',
      workplace: job.detected_extensions?.work_from_home ? "Remote" : (job.location?.toLowerCase().includes('remote') ? "Remote" : "On-site"),
      salary: job.detected_extensions?.salary || "Not Disclosed",
      url: job.share_link || job.related_links?.[0]?.link || '',
      logoUrl: job.thumbnail || '',
      description: job.description || 'No description provided.'
    }));

    return NextResponse.json({ jobs: mappedJobs });

  } catch (error) {
    console.error("Scraper API Error:", error);
    return NextResponse.json({ error: "Failed to scrape jobs" }, { status: 500 });
  }
}
