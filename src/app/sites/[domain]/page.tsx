import { notFound } from 'next/navigation';
import { db, doc, getDoc } from '@/utils/firebase';
import JewelModernTemplate from '@/components/templates/JewelModernTemplate';

export default async function SiteRenderer({ params }: { params: { domain: string } }) {
  const { domain } = params;

  // 1. Fetch deployment configuration from IT Hub Database
  const deploymentRef = doc(db, 'deployments', domain);
  const deploymentSnap = await getDoc(deploymentRef);

  if (!deploymentSnap.exists()) {
    return notFound();
  }

  const deployment = deploymentSnap.data();

  // 2. Fetch live data from Gold Hub API Bridge
  // In a real environment, we'd use the production URL. For now we use the live domain since we pushed it.
  const apiBridgeUrl = `https://golddunia.com/api/export-shop?shopId=${deployment.shopId}`;
  
  let shopData = null;
  let products = [];
  
  try {
    const res = await fetch(apiBridgeUrl, { next: { revalidate: 60 } }); // Cache for 60 seconds
    const json = await res.json();
    if (json.success) {
      shopData = json.data.shop;
      products = json.data.products;
    }
  } catch (error) {
    console.error("Failed to fetch from Gold Hub API Bridge", error);
  }

  if (!shopData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-2">Data Source Error</h1>
          <p>Could not connect to the inventory database for {domain}.</p>
        </div>
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
