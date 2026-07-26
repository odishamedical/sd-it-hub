import { NextResponse } from 'next/server';

// Mock pricing data for different TLDs
const TLD_PRICING: Record<string, number> = {
  '.com': 899,
  '.in': 499,
  '.org': 749,
  '.net': 999,
  '.co': 1299,
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');
  const tld = searchParams.get('tld');

  if (!domain || !tld) {
    return NextResponse.json({ error: 'Domain and TLD are required' }, { status: 400 });
  }

  const cleanDomain = domain.toLowerCase().replace(/[^a-z0-9-]/g, '');
  const cleanTld = tld.replace('.', ''); // ResellerClub expects 'com' not '.com'
  const fullDomain = `${cleanDomain}.${cleanTld}`;

  // ResellerClub credentials
  const API_KEY = process.env.RESELLERCLUB_API_KEY;
  const RESELLER_ID = process.env.RESELLERCLUB_RESELLER_ID;

  if (!API_KEY || !RESELLER_ID) {
    console.error("Missing ResellerClub API credentials in environment.");
    return NextResponse.json({ error: 'Domain search is temporarily unavailable.' }, { status: 500 });
  }

  try {
    // Call ResellerClub Test Environment API
    const rcUrl = `https://test.httpapi.com/api/domains/available.json?auth-userid=${RESELLER_ID}&api-key=${API_KEY}&domain-name=${cleanDomain}&tlds=${cleanTld}`;
    const response = await fetch(rcUrl);
    
    if (!response.ok) {
      throw new Error(`ResellerClub API error: ${response.status}`);
    }

    const data = await response.json();
    
    // ResellerClub response format: { "domain.com": { "status": "available", "classkey": "domcno" } }
    let isAvailable = false;
    if (data[fullDomain] && data[fullDomain].status === "available") {
      isAvailable = true;
    }

    // Still use our internal pricing logic for retail prices
    const retailPrice = TLD_PRICING[tld] || 999;

    // Generate some mocked alternatives for now (in production, we could query multiple TLDs at once)
    const alternatives = [];
    if (!isAvailable) {
      const alternateTlds = Object.keys(TLD_PRICING).filter((ext) => ext !== tld).slice(0, 3);
      for (const altTld of alternateTlds) {
        alternatives.push({
          domain: `${cleanDomain}${altTld}`,
          available: true, // Mocked for speed, could query these too
          price: TLD_PRICING[altTld],
        });
      }
    }

    return NextResponse.json({
      domain: fullDomain,
      available: isAvailable,
      price: isAvailable ? retailPrice : null,
      alternatives: alternatives,
    });
  } catch (error) {
    console.error("Domain search error:", error);
    return NextResponse.json({ error: 'Failed to query registry' }, { status: 500 });
  }
}
