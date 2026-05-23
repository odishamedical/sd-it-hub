// Firestore Database Schema Definitions for SD Digital Hub (IT Hub)

export type PartnerStatus = 'active' | 'suspended' | 'pending';
export type TenantStatus = 'pending_setup' | 'active' | 'suspended';

export interface User {
  uid: string; // Firebase Auth UID
  email: string;
  displayName: string;
  role: 'partner' | 'admin';
  status: PartnerStatus;
  createdAt: number;
  companyName?: string;
  phone?: string;
}

export interface TenantNode {
  id: string; // Auto-generated Firestore ID
  partnerId: string; // Reference to User.uid
  domainName: string; // e.g., 'ertybh.com'
  subdomain?: string; // e.g., 'client1.shyamdash.com'
  status: TenantStatus;
  templateId?: string; // Reference to SaaS Template
  bandwidthUsageMB?: number;
  isSslSecured: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Transaction {
  id: string; // Auto-generated or from Razorpay
  partnerId: string; // Reference to User.uid
  amount: number;
  currency: string;
  status: 'success' | 'failed' | 'pending';
  description: string;
  createdAt: number;
}
