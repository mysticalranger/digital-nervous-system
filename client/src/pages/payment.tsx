import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Coins, 
  Crown, 
  Zap, 
  Star, 
  Check,
  Wallet,
  TrendingUp,
  Shield,
  Gift,
  Clock
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface PaymentPlan {
  id: string;
  name: string;
  priceINR: number;
  culturalCredits: number;
  features: string[];
  popular?: boolean;
}

interface Transaction {
  id: string;
  type: 'purchase' | 'spend' | 'earn';
  amount: number;
  description: string;
  timestamp: string;
  status: string;
}

const PaymentPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [creditBalance, setCreditBalance] = useState(0);
  const queryClient = useQueryClient();

  const { data: plansData, isLoading: plansLoading } = useQuery({
    queryKey: ['/api/payment/plans']
  });

  const { data: balanceData } = useQuery({
    queryKey: ['/api/payment/balance'],
    refetchInterval: 30000
  });

  const { data: transactions } = useQuery({
    queryKey: ['/api/payment/transactions']
  });

  const { data: pricing } = useQuery({
    queryKey: ['/api/payment/pricing']
  });

  const createOrderMutation = useMutation({
    mutationFn: async (planId: string) => {
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId })
      });
      return response.json();
    },
    onSuccess: (order) => {
      // In real implementation, integrate with Razorpay
      console.log('Order created:', order);
      alert(`Order created successfully! Order ID: ${order.id}`);
      queryClient.invalidateQueries({ queryKey: ['/api/payment/balance'] });
    }
  });

  useEffect(() => {
    if (balanceData?.balance) {
      setCreditBalance(balanceData.balance);
    }
  }, [balanceData]);

  const handlePurchase = (planId: string) => {
    setSelectedPlan(planId);
    createOrderMutation.mutate(planId);
  };

  const mockPlans = {
    subscriptions: [
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
    ],
    credits: [
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
    ]
  };

  const mockTransactions: Transaction[] = [
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
  ];

  const plans = plansData || mockPlans;
  const transactionHistory = transactions || mockTransactions;

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'purchase': return <CreditCard className="h-4 w-4 text-green-600" />;
      case 'spend': return <Zap className="h-4 w-4 text-red-600" />;
      case 'earn': return <Gift className="h-4 w-4 text-blue-600" />;
      default: return <Coins className="h-4 w-4" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'purchase': return 'text-green-600';
      case 'spend': return 'text-red-600';
      case 'earn': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Cultural Credits & Subscriptions
          </h1>
          <p className="text-gray-600">
            Power your cultural intelligence with our flexible pricing
          </p>
        </motion.div>

        {/* Current Balance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <Card className="border-orange-200 bg-gradient-to-r from-orange-100 to-yellow-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-500 rounded-full">
                    <Wallet className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{creditBalance} Cultural Credits</h2>
                    <p className="text-gray-600">Current balance</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Exchange Rate</p>
                  <p className="text-lg font-semibold text-orange-600">₹1 = 10 Credits</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pricing Plans */}
        <Tabs defaultValue="subscriptions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="subscriptions">Monthly Plans</TabsTrigger>
            <TabsTrigger value="credits">Credit Packs</TabsTrigger>
            <TabsTrigger value="history">Transaction History</TabsTrigger>
          </TabsList>

          <TabsContent value="subscriptions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.subscriptions.map((plan: PaymentPlan, index: number) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-orange-500 text-white px-4 py-1">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <Card className={`border-2 h-full ${
                    plan.popular ? 'border-orange-300 bg-orange-50' : 'border-gray-200 bg-white'
                  } backdrop-blur-sm`}>
                    <CardHeader className="text-center pb-4">
                      <div className="flex justify-center mb-4">
                        {plan.id === 'free' && <Shield className="h-12 w-12 text-gray-600" />}
                        {plan.id === 'pro' && <Crown className="h-12 w-12 text-orange-600" />}
                        {plan.id === 'enterprise' && <Zap className="h-12 w-12 text-purple-600" />}
                      </div>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <div className="text-center">
                        <span className="text-4xl font-bold">₹{plan.priceINR}</span>
                        <span className="text-gray-600">/month</span>
                      </div>
                      <CardDescription>
                        {plan.culturalCredits.toLocaleString()} Cultural Credits included
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className={`w-full ${
                          plan.popular 
                            ? 'bg-orange-500 hover:bg-orange-600' 
                            : 'bg-gray-600 hover:bg-gray-700'
                        }`}
                        onClick={() => handlePurchase(plan.id)}
                        disabled={createOrderMutation.isPending}
                      >
                        {plan.id === 'free' ? 'Current Plan' : 'Upgrade Now'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="credits" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.credits.map((pack: PaymentPlan, index: number) => (
                <motion.div
                  key={pack.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-orange-200 bg-white/70 backdrop-blur-sm h-full">
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-4">
                        <Coins className="h-10 w-10 text-yellow-600" />
                      </div>
                      <CardTitle className="text-xl">{pack.name}</CardTitle>
                      <div className="text-center">
                        <span className="text-3xl font-bold text-orange-600">₹{pack.priceINR}</span>
                      </div>
                      <CardDescription>
                        {pack.culturalCredits.toLocaleString()} Cultural Credits
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {pack.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className="w-full bg-orange-500 hover:bg-orange-600"
                        onClick={() => handlePurchase(pack.id)}
                        disabled={createOrderMutation.isPending}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Buy Credits
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  Transaction History
                </CardTitle>
                <CardDescription>
                  Your recent credit purchases, earnings, and spending
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactionHistory.map((transaction) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white/50"
                    >
                      <div className="flex items-center gap-3">
                        {getTransactionIcon(transaction.type)}
                        <div>
                          <p className="font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(transaction.timestamp).toLocaleDateString()} at{' '}
                            {new Date(transaction.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount} credits
                        </p>
                        <Badge 
                          variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Usage Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <Card className="border-orange-200 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                Credit Usage Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">1</div>
                  <div className="text-sm text-blue-800">Basic Analysis</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">2</div>
                  <div className="text-sm text-green-800">Voice Analysis</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">3</div>
                  <div className="text-sm text-purple-800">Advanced Analysis</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">4</div>
                  <div className="text-sm text-red-800">Viral Prediction</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4 text-center">
                Credits are automatically deducted based on the complexity of your analysis request
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentPage;