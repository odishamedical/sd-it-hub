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

  // Simulate network delay for realism
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const fullDomain = `${domain.toLowerCase()}${tld}`;
  
  // Create deterministic mock availability based on string length
  // e.g., if the domain length is even, it's available, otherwise taken. 
  // Exception: "shyamdash" is always taken.
  let isAvailable = domain.length % 2 === 0;
  
  if (domain.toLowerCase() === 'shyamdash' || domain.toLowerCase() === 'google') {
    isAvailable = false;
  }

  // Generate some alternatives
  const alternatives = [];
  if (!isAvailable) {
    const alternateTlds = Object.keys(TLD_PRICING).filter((ext) => ext !== tld);
    // Pick 3 random alternative TLDs
    for (let i = 0; i < 3; i++) {
      const altTld = alternateTlds[i];
      alternatives.push({
        domain: `${domain}${altTld}`,
        available: true,
        price: TLD_PRICING[altTld],
      });
    }
  }

  return NextResponse.json({
    domain: fullDomain,
    available: isAvailable,
    price: isAvailable ? TLD_PRICING[tld] : null,
    alternatives: alternatives,
  });
}
