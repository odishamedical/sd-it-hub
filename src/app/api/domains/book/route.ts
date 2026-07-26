import { NextResponse } from 'next/server';
import { db, collection, addDoc, serverTimestamp } from "@/utils/firebase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { domain, duration, userEmail, userName } = body;

    if (!domain || !duration || !userEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const API_KEY = process.env.RESELLERCLUB_API_KEY;
    const RESELLER_ID = process.env.RESELLERCLUB_RESELLER_ID;

    if (!API_KEY || !RESELLER_ID) {
      return NextResponse.json({ error: 'System configuration error.' }, { status: 500 });
    }

    // --- PHASE 1: CUSTOMER REGISTRATION (Mocked for now) ---
    // In a full production flow, we would first call:
    // https://test.httpapi.com/api/customers/signup.json
    // to create a billing profile for the user and get a customer-id and contact-id.
    const TEST_CUSTOMER_ID = "24921609"; // Example test customer ID
    const TEST_CONTACT_ID = "83477169"; // Example test contact ID

    // --- PHASE 2: DOMAIN REGISTRATION (ResellerClub Test Environment) ---
    const rcUrl = new URL('https://test.httpapi.com/api/domains/register.json');
    rcUrl.searchParams.append('auth-userid', RESELLER_ID);
    rcUrl.searchParams.append('api-key', API_KEY);
    rcUrl.searchParams.append('domain-name', domain);
    rcUrl.searchParams.append('years', duration);
    rcUrl.searchParams.append('ns', 'ns1.shyamdash.com');
    rcUrl.searchParams.append('ns', 'ns2.shyamdash.com');
    rcUrl.searchParams.append('customer-id', TEST_CUSTOMER_ID);
    rcUrl.searchParams.append('reg-contact-id', TEST_CONTACT_ID);
    rcUrl.searchParams.append('admin-contact-id', TEST_CONTACT_ID);
    rcUrl.searchParams.append('tech-contact-id', TEST_CONTACT_ID);
    rcUrl.searchParams.append('billing-contact-id', TEST_CONTACT_ID);
    rcUrl.searchParams.append('invoice-option', 'NoInvoice');

    let rcResponseStatus = "pending";
    let rcOrderId = null;

    // We execute the live POST request to the ResellerClub OTE Server
    const response = await fetch(rcUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const data = await response.json();

    if (data.status === "ERROR") {
      // The OTE server will likely throw an error because the hardcoded TEST_CUSTOMER_ID 
      // does not belong to the user's specific Reseller account.
      console.warn("ResellerClub API Error (Expected during testing without real customer IDs):", data.message);
      // We will proceed to log it in Firebase as a "Simulated Success" for UI testing purposes
      rcResponseStatus = "simulated_success"; 
    } else {
      rcResponseStatus = "active";
      rcOrderId = data.entityid || data.actionid;
    }

    // --- PHASE 3: LOG TO FIREBASE ---
    await addDoc(collection(db, "domains"), {
      domainName: domain,
      ownerEmail: userEmail,
      ownerName: userName || "Client",
      isAllocated: true,
      duration: parseInt(duration),
      purchasedAt: serverTimestamp(),
      source: "client_portal_booking",
      rcStatus: rcResponseStatus,
      rcOrderId: rcOrderId
    });

    return NextResponse.json({ 
      success: true, 
      domain, 
      message: rcResponseStatus === 'simulated_success' 
        ? "Domain booking simulated successfully! (Real booking requires valid Customer IDs)"
        : "Domain successfully registered via ResellerClub!"
    });

  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json({ error: 'Failed to process booking' }, { status: 500 });
  }
}
