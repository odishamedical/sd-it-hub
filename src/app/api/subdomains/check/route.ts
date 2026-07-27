import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');
  const ext = searchParams.get('ext'); // e.g., .golddunia.com
  const state = searchParams.get('state');
  const city = searchParams.get('city');
  const category = searchParams.get('category');

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

  const suggestions = [];

  // Always include the premium subdomain
  suggestions.push({
    id: 'subdomain',
    name: `${cleanDomain}.${baseExt}`,
    price: '2999',
    available: isAvailable,
    description: 'Premium Subdomain'
  });

  // Always include the direct root path
  suggestions.push({
    id: 'path-root',
    name: `${baseExt}/${cleanDomain}`,
    price: '999',
    available: isAvailable,
    description: 'Direct Root Path'
  });

  // If category is provided, generate a category path
  if (category) {
    const cleanCategory = category.toLowerCase().trim();
    suggestions.push({
      id: 'path-category',
      name: `${baseExt}/${cleanCategory}/${cleanDomain}`,
      price: '599',
      available: isAvailable,
      description: 'Category Level Path'
    });
  }

  // If state is provided
  if (state) {
    const cleanState = state.toLowerCase().trim();
    suggestions.push({
      id: 'path-state',
      name: `${baseExt}/${cleanState}/${cleanDomain}`,
      price: '499',
      available: isAvailable,
      description: 'State Level Path'
    });

    // If city is also provided
    if (city) {
      const cleanCity = city.toLowerCase().trim();
      suggestions.push({
        id: 'path-city',
        name: `${baseExt}/${cleanState}/${cleanCity}/${cleanDomain}`,
        price: '199',
        available: isAvailable,
        description: 'City Level Path'
      });
    }
  } else if (!state && !category) {
    // Default fallback if no filters are provided, just so they see some local options in the generic search
    suggestions.push({
      id: 'path-state-demo',
      name: `${baseExt}/odisha/${cleanDomain}`,
      price: '499',
      available: isAvailable,
      description: 'State Level Path'
    });
    suggestions.push({
      id: 'path-city-demo',
      name: `${baseExt}/odisha/sambalpur/${cleanDomain}`,
      price: '199',
      available: isAvailable,
      description: 'City Level Path'
    });
  }

  return NextResponse.json({
    custom: false,
    suggestions
  });
}
