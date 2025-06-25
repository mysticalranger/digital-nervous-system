// Payment service for Cultural Intelligence Platform
// Handles ₹1 = 10 cultural credits system with Razorpay integration

export interface PaymentPlan {
  id: string;
  name: string;
  priceINR: number;
  culturalCredits: number;
  features: string[];
  popular?: boolean;
}

export interface PaymentResult {
  success: boolean;
  orderId?: string;
  paymentId?: string;
  credits?: number;
  error?: string;
}

export class PaymentService {
  private razorpayKeyId: string;
  private razorpaySecret: string;

  constructor() {
    // In production, these would come from environment variables
    this.razorpayKeyId = process.env.RAZORPAY_KEY_ID || 'mock_key_id';
    this.razorpaySecret = process.env.RAZORPAY_SECRET || 'mock_secret';
  }

  // Subscription plans
  getSubscriptionPlans(): PaymentPlan[] {
    return [
      {
        id: 'free',
        name: 'Cultural Explorer',
        priceINR: 0,
        culturalCredits: 100,
        features: [
          '100 monthly analyses',
          'Basic cultural insights',
          '1 voice assistant',
          'Community access',
          'Mobile app'
        ]
      },
      {
        id: 'pro',
        name: 'Cultural Analyst',
        priceINR: 499,
        culturalCredits: 5000,
        features: [
          '5,000 monthly analyses',
          'Advanced AI insights',
          '2 voice assistants',
          'Live cultural pulse',
          'Viral prediction tools',
          'Festival automation',
          'Priority support'
        ],
        popular: true
      },
      {
        id: 'enterprise',
        name: 'Cultural Guru',
        priceINR: 2999,
        culturalCredits: 30000,
        features: [
          'Unlimited analyses',
          'All 4 voice assistants',
          'Custom AI training',
          'API access',
          'White-label solutions',
          'Dedicated success manager',
          'Advanced analytics',
          'Custom integrations'
        ]
      }
    ];
  }

  // Cultural credits packages (₹1 = 10 credits)
  getCreditPackages(): PaymentPlan[] {
    return [
      {
        id: 'credits_100',
        name: 'Starter Pack',
        priceINR: 10,
        culturalCredits: 100,
        features: ['100 cultural credits', 'Perfect for testing']
      },
      {
        id: 'credits_500',
        name: 'Popular Pack',
        priceINR: 49,
        culturalCredits: 500,
        features: ['500 cultural credits', '2% bonus credits']
      },
      {
        id: 'credits_1000',
        name: 'Power Pack',
        priceINR: 95,
        culturalCredits: 1000,
        features: ['1,000 cultural credits', '5% bonus credits']
      },
      {
        id: 'credits_2500',
        name: 'Pro Pack',
        priceINR: 225,
        culturalCredits: 2500,
        features: ['2,500 cultural credits', '10% bonus credits']
      },
      {
        id: 'credits_5000',
        name: 'Business Pack',
        priceINR: 425,
        culturalCredits: 5000,
        features: ['5,000 cultural credits', '15% bonus credits']
      }
    ];
  }

  // Create Razorpay order
  async createOrder(planId: string, userId: string): Promise<any> {
    const plans = [...this.getSubscriptionPlans(), ...this.getCreditPackages()];
    const plan = plans.find(p => p.id === planId);
    
    if (!plan) {
      throw new Error('Invalid plan ID');
    }

    // In real implementation, create Razorpay order
    const orderData = {
      amount: plan.priceINR * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `receipt_${userId}_${Date.now()}`,
      notes: {
        userId,
        planId,
        culturalCredits: plan.culturalCredits
      }
    };

    // Mock order creation for demo
    const mockOrder = {
      id: `order_${Date.now()}`,
      entity: 'order',
      amount: orderData.amount,
      amount_paid: 0,
      amount_due: orderData.amount,
      currency: 'INR',
      receipt: orderData.receipt,
      status: 'created',
      attempts: 0,
      notes: orderData.notes,
      created_at: Math.floor(Date.now() / 1000)
    };

    console.log('Created payment order:', mockOrder);
    return mockOrder;
  }

  // Verify payment and award credits
  async verifyPayment(
    orderId: string, 
    paymentId: string, 
    signature: string,
    userId: string
  ): Promise<PaymentResult> {
    try {
      // In real implementation, verify signature with Razorpay
      // const expectedSignature = crypto
      //   .createHmac('sha256', this.razorpaySecret)
      //   .update(orderId + '|' + paymentId)
      //   .digest('hex');
      
      // if (signature !== expectedSignature) {
      //   return { success: false, error: 'Invalid payment signature' };
      // }

      // Mock verification for demo
      console.log('Verifying payment:', { orderId, paymentId, signature });

      // Fetch order details to get credits
      const mockCredits = 500; // In real implementation, get from order notes
      
      // Award credits to user
      await this.awardCredits(userId, mockCredits);

      return {
        success: true,
        orderId,
        paymentId,
        credits: mockCredits
      };
    } catch (error) {
      console.error('Payment verification failed:', error);
      return {
        success: false,
        error: 'Payment verification failed'
      };
    }
  }

  // Award credits to user
  private async awardCredits(userId: string, credits: number): Promise<void> {
    // In real implementation, update user's credit balance in database
    console.log(`Awarded ${credits} cultural credits to user ${userId}`);
    
    // Log transaction for audit
    const transaction = {
      userId,
      type: 'purchase',
      amount: credits,
      timestamp: new Date().toISOString(),
      description: 'Credit purchase via Razorpay'
    };
    
    console.log('Transaction logged:', transaction);
  }

  // Get user's credit balance
  async getCreditBalance(userId: string): Promise<number> {
    // In real implementation, fetch from database
    // For demo, return mock balance
    return Math.floor(Math.random() * 1000) + 500;
  }

  // Deduct credits for analysis
  async deductCredits(userId: string, amount: number, description: string): Promise<boolean> {
    const currentBalance = await this.getCreditBalance(userId);
    
    if (currentBalance < amount) {
      return false; // Insufficient credits
    }

    // In real implementation, update database
    console.log(`Deducted ${amount} credits from user ${userId} for: ${description}`);
    
    // Log transaction
    const transaction = {
      userId,
      type: 'spend',
      amount: -amount,
      timestamp: new Date().toISOString(),
      description
    };
    
    console.log('Transaction logged:', transaction);
    return true;
  }

  // Get credit pricing info
  getCreditPricing() {
    return {
      baseRate: {
        rupees: 1,
        credits: 10,
        description: '₹1 = 10 Cultural Credits'
      },
      analysisRates: {
        basic: 1,
        advanced: 3,
        premium: 5,
        voice_analysis: 2,
        viral_prediction: 4
      },
      bonusStructure: [
        { minPurchase: 100, bonus: 0 },
        { minPurchase: 500, bonus: 2 },
        { minPurchase: 1000, bonus: 5 },
        { minPurchase: 2500, bonus: 10 },
        { minPurchase: 5000, bonus: 15 }
      ]
    };
  }

  // Generate Razorpay checkout options
  generateCheckoutOptions(order: any, userEmail: string, userName: string) {
    return {
      key: this.razorpayKeyId,
      amount: order.amount,
      currency: order.currency,
      name: 'Digital Nervous System',
      description: 'Cultural Intelligence Credits',
      image: '/logo.png', // Your logo URL
      order_id: order.id,
      handler: function(response: any) {
        // This will be handled on frontend
        console.log('Payment successful:', response);
      },
      prefill: {
        name: userName,
        email: userEmail,
        contact: '' // User's phone number if available
      },
      notes: order.notes,
      theme: {
        color: '#F97316' // Orange theme matching your app
      },
      modal: {
        ondismiss: function() {
          console.log('Payment modal closed');
        }
      }
    };
  }

  // Get transaction history
  async getTransactionHistory(userId: string, limit: number = 20) {
    // In real implementation, fetch from database
    // Return mock transaction history
    return [
      {
        id: 'txn_001',
        type: 'purchase',
        amount: 500,
        description: 'Credit purchase - Pro Pack',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        status: 'completed'
      },
      {
        id: 'txn_002',
        type: 'spend',
        amount: -5,
        description: 'Premium cultural analysis',
        timestamp: new Date(Date.now() - 43200000).toISOString(),
        status: 'completed'
      },
      {
        id: 'txn_003',
        type: 'earn',
        amount: 50,
        description: 'Weekly streak bonus',
        timestamp: new Date(Date.now() - 21600000).toISOString(),
        status: 'completed'
      }
    ].slice(0, limit);
  }
}