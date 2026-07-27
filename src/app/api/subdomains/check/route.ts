import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');
  const ext = searchParams.get('ext'); // e.g., .golddunia.com

  if (!domain || !ext) {
    return NextResponse.json({ error: 'Missing domain or ext parameters' }, { status: 400 });
  }

  // TODO: Connect this to IT Hub's Firestore
  const takenSubdomains = ['test', 'demo', 'admin', 'shop', 'store'];
  const cleanDomain = domain.toLowerCase().trim();
  const isAvailable = !takenSubdomains.includes(cleanDomain);
  const baseExt = ext.replace(/^\./, ''); // golddunia.com

  // Add artificial delay to simulate DB check
  await new Promise((resolve) => setTimeout(resolve, 800));

  return NextResponse.json({
    custom: false,
    suggestions: [
      {
        id: 'subdomain',
        name: `${cleanDomain}.${baseExt}`,
        price: '2999',
        available: isAvailable,
        description: 'Premium Subdomain'
      },
      {
        id: 'path-root',
        name: `${baseExt}/${cleanDomain}`,
        price: '999',
        available: isAvailable,
        description: 'Direct Root Path'
      },
      {
        id: 'path-state',
        name: `${baseExt}/odisha/${cleanDomain}`,
        price: '499',
        available: isAvailable,
        description: 'State Level Path'
      },
      {
        id: 'path-city',
        name: `${baseExt}/odisha/sambalpur/${cleanDomain}`,
        price: '199',
        available: isAvailable,
        description: 'City Level Path'
      }
    ]
  });
}
