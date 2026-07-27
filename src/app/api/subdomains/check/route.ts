import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');
  const ext = searchParams.get('ext'); // .golddunia.com, .bhulia.com, .dehapa.com

  if (!domain || !ext) {
    return NextResponse.json({ error: 'Missing domain or ext parameters' }, { status: 400 });
  }

  // TODO: Connect this to IT Hub's Firestore `deployments` or `shops` collection
  // For now, we simulate a check by making "test", "demo", "admin" taken
  const takenSubdomains = ['test', 'demo', 'admin', 'shop', 'store'];
  
  // Clean up input
  const cleanDomain = domain.toLowerCase().trim();

  const isAvailable = !takenSubdomains.includes(cleanDomain);

  // Add artificial delay to simulate DB check
  await new Promise((resolve) => setTimeout(resolve, 800));

  return NextResponse.json({
    domain: cleanDomain,
    ext: ext,
    available: isAvailable,
    custom: false
  });
}
