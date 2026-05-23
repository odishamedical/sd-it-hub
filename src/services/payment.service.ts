import { Transaction } from '../lib/db-schema';

interface PaymentOptions {
  amount: number;
  currency: string;
  partnerId: string;
  description: string;
}

export class PaymentService {
  /**
   * Initializes a mock Razorpay payment flow.
   * In a real environment, this would call your backend to create a Razorpay Order,
   * then open the Razorpay Checkout modal on the frontend.
   */
  static async initiateMockPayment(options: PaymentOptions): Promise<Transaction> {
    console.log(`[Mock Razorpay] Initializing payment for ${options.amount} ${options.currency}`);
    
    // Simulate network delay for opening checkout modal
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For the mock, we instantly simulate a successful checkout after the delay
    console.log(`[Mock Razorpay] Payment successful.`);

    const mockTransaction: Transaction = {
      id: `pay_mock_${Math.random().toString(36).substring(2, 10)}`,
      partnerId: options.partnerId,
      amount: options.amount,
      currency: options.currency,
      status: 'success',
      description: options.description,
      createdAt: Date.now(),
    };

    // In a real environment, you would save this transaction to Firestore via a webhook.
    // Here we just return it to the caller to update the UI.
    return mockTransaction;
  }
}
