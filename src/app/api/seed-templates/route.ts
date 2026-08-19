import { NextResponse } from 'next/server';
import { db, doc, setDoc } from '@/utils/firebase';

export async function GET() {
  const templates = [
    {
      id: 'jewel-modern',
      name: 'Modern Minimalist',
      category: 'Gold Jewelry',
      description: 'Sleek, minimal, contemporary design perfect for modern jewelers.',
      previewUrl: '/preview/jewel-modern',
      colors: ['#0f172a', '#1e3a8a', '#374151'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1599643478524-fb66f70a9210?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'jewel-classic',
      name: 'Classic Elegance',
      category: 'Gold Jewelry',
      description: 'Traditional heritage layout with rich colors and serif typography.',
      previewUrl: '/preview/jewel-classic',
      colors: ['#7f1d1d', '#064e3b', '#451a03'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1599643477874-5c91fce90a19?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'jewel-prestige',
      name: 'Prestige Gallery',
      category: 'Gold Jewelry',
      description: 'High-end luxury dark mode with cinematic multi-page navigation.',
      previewUrl: '/preview/jewel-prestige',
      colors: ['#050505', '#171717', '#111827'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1605100804763-247f6612d486?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'jewel-commerce',
      name: 'Retail Commerce',
      category: 'Gold Jewelry',
      description: 'Catalog-heavy, conversion optimized design for large inventory retailers.',
      previewUrl: '/preview/jewel-commerce',
      colors: ['#0ea5e9', '#ef4444', '#10b981'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'jewel-artisan',
      name: 'Bespoke Artisan',
      category: 'Gold Jewelry',
      description: 'Handcrafted, organic asymmetrical layout perfect for independent creators.',
      previewUrl: '/preview/jewel-artisan',
      colors: ['#a16207', '#4d7c0f', '#b45309'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800'
    }
  ];

  try {
    for (const t of templates) {
      await setDoc(doc(db, 'shyamdash_templates', t.id), t);
    }
    return NextResponse.json({ success: true, message: `Successfully seeded ${templates.length} templates into Firebase!` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
