"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as Icons from "lucide-react";

function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemType = searchParams.get("type") || "domain";
  const itemName = searchParams.get("item") || "Premium Service";
  const amount = searchParams.get("amount") || "999";

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Auth check
    const email = localStorage.getItem("sd_current_user_email");
    if (!email) {
      window.location.href = `https://sd-auth-center.vercel.app?redirect_uri=${encodeURIComponent(window.location.href)}`;
    }
  }, []);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const email = localStorage.getItem("sd_current_user_email") || "guest";
      
      // Call our mock Payment API
      const { PaymentService } = await import('@/services/payment.service');
      await PaymentService.initiateMockPayment({
        amount: parseInt(amount),
        currency: "INR",
        partnerId: email,
        description: `Payment for ${itemType}: ${itemName}`
      });

      setIsProcessing(false);
      setIsSuccess(true);
      
      // Redirect after success animation
      setTimeout(() => {
        if (itemType === "domain") {
          router.push(`/portal?payment_success=true&domain=${encodeURIComponent(itemName)}`);
        } else if (itemType === "template") {
          router.push(`/portal/configure?template=${encodeURIComponent(itemName)}`);
        } else if (itemType === "franchise") {
          router.push(`/portal?franchise_activated=true`);
        } else {
          router.push("/portal");
        }
      }, 2000);
    } catch (error) {
      console.error("Payment failed", error);
      setIsProcessing(false);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-center text-white">
          <h1 className="text-xl font-bold tracking-wider">SD SECURE CHECKOUT</h1>
          <p className="text-indigo-200 text-sm mt-1">Powered by SD Payments</p>
        </div>

        {/* Order Details */}
        <div className="p-6 border-b border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-500 font-medium">Order Item</span>
            <span className="font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-full text-sm">
              {itemType.toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-800 font-bold text-lg">{itemName}</span>
            <span className="text-2xl font-black text-indigo-600">₹{amount}</span>
          </div>
        </div>

        {/* Payment Simulation UI */}
        <div className="p-6">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Icons.Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">Payment Successful!</h2>
              <p className="text-slate-500 text-sm text-center">
                Redirecting to your dashboard to complete the setup...
              </p>
            </div>
          ) : (
            <>
              <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">Select Payment Method</h3>
              
              <div className="space-y-3 mb-6">
                <button className="w-full flex items-center justify-between p-4 border border-indigo-600 bg-indigo-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Icons.CreditCard className="w-5 h-5 text-indigo-600" />
                    <span className="font-bold text-indigo-900">Credit / Debit Card</span>
                  </div>
                  <div className="w-4 h-4 rounded-full border-4 border-indigo-600 bg-white"></div>
                </button>
                <button className="w-full flex items-center justify-between p-4 border border-slate-200 hover:border-slate-300 rounded-xl text-slate-500">
                  <div className="flex items-center gap-3">
                    <Icons.Smartphone className="w-5 h-5" />
                    <span className="font-medium">UPI / GPay</span>
                  </div>
                  <div className="w-4 h-4 rounded-full border border-slate-300 bg-white"></div>
                </button>
              </div>

              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Icons.Loader2 className="w-5 h-5 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Icons.Lock className="w-4 h-4" />
                    Pay ₹{amount} Securely
                  </>
                )}
              </button>
              
              <div className="mt-4 flex items-center justify-center gap-1 text-xs text-slate-400">
                <Icons.ShieldCheck className="w-4 h-4" />
                <span>256-bit SSL Encrypted Transaction</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><Icons.Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>}>
      <CheckoutForm />
    </Suspense>
  );
}
