import { notFound } from 'next/navigation';
import { db, doc, getDoc } from '@/utils/firebase';
import JewelModernTemplate from '@/components/templates/JewelModernTemplate';
import JewelClassicTemplate from '@/components/templates/JewelClassicTemplate';
import JewelPrestigeTemplate from '@/components/templates/JewelPrestigeTemplate';
import JewelCommerceTemplate from '@/components/templates/JewelCommerceTemplate';
import JewelArtisanTemplate from '@/components/templates/JewelArtisanTemplate';

export default async function SiteRenderer({ params }: { params: { domain: string, slug?: string[] } }) {
  const { domain, slug } = params;
  const currentRoute = slug ? slug.join('/') : 'home';

  // 1. Fetch deployment configuration from IT Hub Database
  const deploymentRef = doc(db, 'deployments', domain);
  const deploymentSnap = await getDoc(deploymentRef);

  if (!deploymentSnap.exists()) {
    return notFound();
  }

  const deployment = deploymentSnap.data();

  // 2. Fetch live data from Gold Hub API Bridge
  // In a real environment, we'd use the production URL. For now we use the live domain since we pushed it.
  const apiBridgeUrl = `https://golddunia.com/api/export-shop?shopId=${deployment.hubId || deployment.shopId}`;
  
  let shopData = null;
  let products = [];
  
  try {
    const res = await fetch(apiBridgeUrl, { next: { revalidate: 60 } }); // Cache for 60 seconds
    if (!res.ok) {
      throw new Error(`API returned ${res.status}`);
    }
    const json = await res.json();
    if (json.success && json.data) {
      shopData = json.data.shop || null;
      products = json.data.products || [];
    } else {
      console.error("API returned success: false", json);
    }
  } catch (error) {
    console.error("Failed to fetch from Gold Hub API Bridge", error);
  }

  if (!shopData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-6 text-center">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl">⚠️</span>
        </div>
        <h1 className="text-3xl font-bold text-red-400 mb-4">Data Source Disconnected</h1>
        <p className="text-slate-400 max-w-md mb-8">
          Could not connect to the master inventory database for <strong className="text-white">{domain}</strong> (Hub ID: {deployment.hubId || deployment.shopId}). 
          Please ensure your Hub ID is correct in the configuration portal.
        </p>
        <a href="https://shyamdash.com/portal/configure" className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-sky-500/20">
          Reconfigure Site
        </a>
      </div>
    );
  }

  // 3. Render the correct template based on configuration
  if (deployment.templateId === 'jewel-modern') {
    return (
      <JewelModernTemplate 
        config={deployment} 
        shop={shopData} 
        products={products}
        currentRoute={currentRoute}
      />
    );
  } else if (deployment.templateId === 'jewel-classic') {
    return (
      <JewelClassicTemplate 
        config={deployment} 
        shop={shopData} 
        products={products}
        currentRoute={currentRoute}
      />
    );
  } else if (deployment.templateId === 'jewel-prestige') {
    return (
      <JewelPrestigeTemplate 
        config={deployment} 
        shop={shopData} 
        products={products}
        currentRoute={currentRoute}
      />
    );
  } else if (deployment.templateId === 'jewel-commerce') {
    return (
      <JewelCommerceTemplate 
        config={deployment} 
        shop={shopData} 
        products={products}
        currentRoute={currentRoute}
      />
    );
  } else if (deployment.templateId === 'jewel-artisan') {
    return (
      <JewelArtisanTemplate 
        config={deployment} 
        shop={shopData} 
        products={products}
        currentRoute={currentRoute}
      />
    );
  }

  // Fallback for other templates not yet built
  return (
    <div className="min-h-screen flex items-center justify-center transition-colors duration-500" style={{ backgroundColor: deployment.themeColor }}>
      <div className="bg-white/10 backdrop-blur-md p-12 rounded-2xl text-center text-white border border-white/20 shadow-2xl">
        <h1 className="text-4xl font-black mb-4">{deployment.shopName || shopData.name}</h1>
        <p className="text-xl opacity-90">{deployment.tagline || 'Welcome to our store'}</p>
        <p className="mt-8 text-sm opacity-60">Template: {deployment.templateId} (Coming Soon)</p>
      </div>
    </div>
  );
}
