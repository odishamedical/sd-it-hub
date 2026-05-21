export interface ITService {
  id: string;
  title: string;
  description: string;
  category: 'Web Development' | 'App Development' | 'Hosting' | 'White-Label Templates';
  icon: string; // Lucide icon name
  price_starting: number;
  features: string[];
}

export interface ITPortfolio {
  id: string;
  title: string;
  description: string;
  category: string;
  client: string;
  launch_year: string;
  image_url: string;
  live_url?: string;
}

export interface ITPricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  is_popular: boolean;
  button_text: string;
}

export interface ITInquiry {
  name: string;
  email: string;
  phone?: string;
  service_category: string;
  message: string;
}

// -------------------------------------------------------------
// LOCAL MOCK DATA (Fallback when Directus API is not configured)
// -------------------------------------------------------------

export const MOCK_SERVICES: ITService[] = [
  {
    id: 'web-dev',
    title: 'Custom Web Development',
    description: 'Bespoke, lightning-fast Next.js websites tailored with premium styling, headless CMS, and global SEO optimization.',
    category: 'Web Development',
    icon: 'Globe',
    price_starting: 799,
    features: ['Next.js React Architecture', 'Directus / Headless CMS', 'Mobile-Responsive UI', '100% Core Web Vitals Score']
  },
  {
    id: 'app-dev',
    title: 'Mobile App Development',
    description: 'High-performance React Native iOS and Android apps connected seamlessly to your central databases.',
    category: 'App Development',
    icon: 'Smartphone',
    price_starting: 1499,
    features: ['Cross-Platform Coverage', 'App Store & Play Store publishing', 'Real-time sync (Websockets)', 'Push Notifications']
  },
  {
    id: 'hosting',
    title: 'High-Performance Hosting',
    description: 'Supercharged cloud hosting built on Railway and Vercel Edge with zero-downtime PostgreSQL instances.',
    category: 'Hosting',
    icon: 'CloudLightning',
    price_starting: 29,
    features: ['99.99% Uptime Guarantee', 'Automatic daily backups', 'SSL Certificates included', 'Scale-on-demand resources']
  },
  {
    id: 'templates',
    title: 'White-Label Templates',
    description: 'Ready-to-deploy, customizable storefront and landing page modules specifically optimized for vendor storefront setups.',
    category: 'White-Label Templates',
    icon: 'LayoutGrid',
    price_starting: 199,
    features: ['Multi-theme options', 'Built-in payment triggers', 'Pre-configured SEO metadata', 'Full source code ownership']
  }
];

export const MOCK_PORTFOLIO: ITPortfolio[] = [
  {
    id: 'gold-hub',
    title: 'Shyam Dash Gold Marketplace',
    description: 'An ultra-premium multi-vendor marketplace featuring dynamic price tickers, HUID authenticity badges, and custom vendor portals.',
    category: 'Marketplace',
    client: 'Shyam Dash Creation (Gold Division)',
    launch_year: '2026',
    image_url: '/assets/portfolio-gold.png'
  },
  {
    id: 'bhulia-heritage',
    title: 'Bhulia Handloom Platform',
    description: 'Artisan sovereign storefront CMS and Master Weaver directory preserving traditional ikat weaving culture with live onboarding forms.',
    category: 'Web Portal',
    client: 'Bhulia Weaver Alliance',
    launch_year: '2026',
    image_url: '/assets/portfolio-bhulia.png'
  },
  {
    id: 'sso-auth',
    title: 'Unified SSO Auth Center',
    description: 'A centralized Firebase Auth-driven single sign-on terminal managing user roles, vendor verification, and system parameters.',
    category: 'Security / SaaS',
    client: 'Shyam Dash Group',
    launch_year: '2026',
    image_url: '/assets/portfolio-auth.png'
  }
];

export const MOCK_PRICING: ITPricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Suite',
    price: '$49',
    period: 'mo',
    description: 'Perfect for small local vendors looking to host a premium mini-site or digital catalog.',
    features: ['1 Mini-Site Subdomain', '10GB Storage & CDN Hosting', 'Standard Directus CMS access', 'Community Email Support'],
    is_popular: false,
    button_text: 'Get Started'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Platform',
    price: '$199',
    period: 'mo',
    description: 'Full-featured package for established operations needing advanced custom databases, scaling, and premium subdomains.',
    features: ['Custom Subdomain setup', '100GB Premium Cloud Space', 'Full Directus Schema control', 'Priority 24/7 Slack Support', 'Daily database backups', 'AI Assistant integration'],
    is_popular: true,
    button_text: 'Deploy Enterprise'
  },
  {
    id: 'custom',
    name: 'Custom Service',
    price: 'Custom',
    period: 'quote',
    description: 'For organizations needing full-scale custom web, iOS/Android mobile apps, and dedicated server configurations.',
    features: ['Dedicated React Native Mobile App', 'Custom backend API pipelines', 'Tailored server architectures', 'SLA guaranteed uptime', 'Assigned Account Architect'],
    is_popular: false,
    button_text: 'Consult Architect'
  }
];

// -------------------------------------------------------------
// API FETCH WRAPPER FUNCTIONS
// -------------------------------------------------------------

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;

export async function getITServices(): Promise<ITService[]> {
  if (!DIRECTUS_URL) {
    return MOCK_SERVICES;
  }
  try {
    const res = await fetch(`${DIRECTUS_URL}/items/ithub_services?filter[status][_eq]=published`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.warn('Directus API error, falling back to mock services.');
    return MOCK_SERVICES;
  }
}

export async function getITPortfolio(): Promise<ITPortfolio[]> {
  if (!DIRECTUS_URL) {
    return MOCK_PORTFOLIO;
  }
  try {
    const res = await fetch(`${DIRECTUS_URL}/items/ithub_portfolio?filter[status][_eq]=published`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.warn('Directus API error, falling back to mock portfolio.');
    return MOCK_PORTFOLIO;
  }
}

export async function getITPricing(): Promise<ITPricingPlan[]> {
  if (!DIRECTUS_URL) {
    return MOCK_PRICING;
  }
  try {
    const res = await fetch(`${DIRECTUS_URL}/items/ithub_pricing?filter[status][_eq]=published`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.warn('Directus API error, falling back to mock pricing plans.');
    return MOCK_PRICING;
  }
}

export async function submitITInquiry(inquiry: ITInquiry): Promise<{ success: boolean; message: string }> {
  // Sync in local storage for logging mock submissions
  if (typeof window !== 'undefined') {
    const submissions = JSON.parse(localStorage.getItem('sd_it_inquiries') || '[]');
    submissions.push({ ...inquiry, date: new Date().toISOString() });
    localStorage.setItem('sd_it_inquiries', JSON.stringify(submissions));
  }

  if (!DIRECTUS_URL) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true, message: 'Inquiry successfully saved locally!' };
  }

  try {
    const res = await fetch(`${DIRECTUS_URL}/items/ithub_inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry)
    });
    if (!res.ok) throw new Error('Network error submitting inquiry');
    return { success: true, message: 'Inquiry submitted successfully to Directus!' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to submit. Saved to local storage fallback instead.' };
  }
}
