import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Key, 
  Plus, 
  Copy, 
  Eye, 
  EyeOff, 
  Edit, 
  Trash2, 
  BarChart3, 
  Shield, 
  Zap,
  Code,
  Globe,
  AlertCircle,
  CheckCircle,
  Clock,
  Activity
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

interface ApiKey {
  id: string;
  name: string;
  keyPreview: string;
  permissions: string[];
  rateLimit: number;
  isActive: boolean;
  lastUsedAt: string | null;
  createdAt: string;
  expiresAt: string;
}

interface ApiUsage {
  endpoint: string;
  requests: number;
  successRate: number;
  avgResponseTime: number;
  creditsUsed: number;
}

const ApiManagementPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedApiKey, setSelectedApiKey] = useState<string | null>(null);
  const [newApiKey, setNewApiKey] = useState<string>('');
  const [showApiKey, setShowApiKey] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: apiKeys, isLoading: keysLoading } = useQuery({
    queryKey: ['/api/dashboard/api-keys']
  });

  const { data: usageStats } = useQuery({
    queryKey: ['/api/dashboard/api-keys', selectedApiKey, 'usage'],
    enabled: !!selectedApiKey
  });

  const createApiKeyMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/dashboard/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setNewApiKey(data.data.key);
        setIsCreateDialogOpen(false);
        queryClient.invalidateQueries({ queryKey: ['/api/dashboard/api-keys'] });
        toast({
          title: "API Key Created",
          description: "Your new API key has been created successfully."
        });
      }
    }
  });

  const deleteApiKeyMutation = useMutation({
    mutationFn: async (keyId: string) => {
      const response = await fetch(`/api/dashboard/api-keys/${keyId}`, {
        method: 'DELETE'
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard/api-keys'] });
      toast({
        title: "API Key Deleted",
        description: "The API key has been deleted successfully."
      });
    }
  });

  const permissions = [
    { id: 'basic_analysis', label: 'Basic Analysis', description: 'Text sentiment and cultural scoring' },
    { id: 'batch_analysis', label: 'Batch Analysis', description: 'Process multiple texts at once' },
    { id: 'voice_analysis', label: 'Voice Analysis', description: 'Audio processing with AI assistants' },
    { id: 'cultural_pulse', label: 'Cultural Pulse', description: 'Real-time trending data' },
    { id: 'viral_prediction', label: 'Viral Prediction', description: 'Content virality analysis' },
    { id: 'premium_features', label: 'Premium Features', description: 'Advanced analytics and insights' }
  ];

  const mockApiKeys: ApiKey[] = [
    {
      id: 'key_1',
      name: 'Production API',
      keyPreview: 'dns_****abc123',
      permissions: ['basic_analysis', 'batch_analysis', 'cultural_pulse'],
      rateLimit: 5000,
      isActive: true,
      lastUsedAt: new Date(Date.now() - 3600000).toISOString(),
      createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
      expiresAt: new Date(Date.now() + 86400000 * 365).toISOString()
    },
    {
      id: 'key_2',
      name: 'Development API',
      keyPreview: 'dns_****def456',
      permissions: ['basic_analysis'],
      rateLimit: 1000,
      isActive: true,
      lastUsedAt: new Date(Date.now() - 7200000).toISOString(),
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      expiresAt: new Date(Date.now() + 86400000 * 365).toISOString()
    }
  ];

  const mockUsageStats = {
    summary: {
      totalRequests: 1250,
      successfulRequests: 1198,
      errorRequests: 52,
      totalCreditsUsed: 3750,
      averageResponseTime: 245,
      dailyBreakdown: {
        '2025-06-24': 180,
        '2025-06-23': 220,
        '2025-06-22': 195,
        '2025-06-21': 210,
        '2025-06-20': 165,
        '2025-06-19': 180,
        '2025-06-18': 100
      },
      endpointBreakdown: {
        '/v1/analyze': 850,
        '/v1/batch-analyze': 125,
        '/v1/cultural-pulse': 200,
        '/v1/viral-prediction': 75
      }
    }
  };

  const keys = apiKeys || mockApiKeys;
  const stats = usageStats || mockUsageStats;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "API key copied to clipboard"
    });
  };

  const handleCreateApiKey = (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      permissions: formData.getAll('permissions'),
      rateLimit: parseInt(formData.get('rateLimit') as string)
    };
    createApiKeyMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                API Management
              </h1>
              <p className="text-gray-600">
                Manage your API keys and monitor usage for business integrations
              </p>
            </div>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create API Key
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New API Key</DialogTitle>
                  <DialogDescription>
                    Generate a new API key for your business integration
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  handleCreateApiKey(formData);
                }} className="space-y-6">
                  <div>
                    <Label htmlFor="name">API Key Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="e.g., Production API, Development Key"
                      required 
                    />
                  </div>
                  
                  <div>
                    <Label>Permissions</Label>
                    <div className="grid grid-cols-1 gap-3 mt-2">
                      {permissions.map((permission) => (
                        <div key={permission.id} className="flex items-start space-x-2">
                          <Checkbox 
                            id={permission.id}
                            name="permissions"
                            value={permission.id}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor={permission.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {permission.label}
                            </label>
                            <p className="text-xs text-muted-foreground">
                              {permission.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="rateLimit">Rate Limit (requests per hour)</Label>
                    <Select name="rateLimit" defaultValue="1000">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100">100 req/hour</SelectItem>
                        <SelectItem value="500">500 req/hour</SelectItem>
                        <SelectItem value="1000">1,000 req/hour</SelectItem>
                        <SelectItem value="5000">5,000 req/hour</SelectItem>
                        <SelectItem value="10000">10,000 req/hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={createApiKeyMutation.isPending}>
                      {createApiKeyMutation.isPending ? 'Creating...' : 'Create API Key'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* New API Key Display */}
        {newApiKey && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6"
          >
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500 rounded-full">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-green-900">API Key Created Successfully!</h3>
                    <p className="text-green-700 mb-4">
                      Save this key securely. It will not be shown again.
                    </p>
                    <div className="flex items-center gap-2 p-3 bg-white rounded border">
                      <code className="flex-1 text-sm font-mono">
                        {showApiKey ? newApiKey : '••••••••••••••••••••••••••••••••'}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(newApiKey)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setNewApiKey('')}
                  >
                    ✕
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <Tabs defaultValue="keys" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="keys">API Keys</TabsTrigger>
            <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
          </TabsList>

          <TabsContent value="keys" className="space-y-6">
            <div className="grid gap-6">
              {keys.map((apiKey: ApiKey, index: number) => (
                <motion.div
                  key={apiKey.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-gray-200 bg-white/70 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Key className="h-5 w-5 text-blue-600" />
                            {apiKey.name}
                            {apiKey.isActive ? (
                              <Badge className="bg-green-100 text-green-800">Active</Badge>
                            ) : (
                              <Badge variant="secondary">Inactive</Badge>
                            )}
                          </CardTitle>
                          <CardDescription>
                            Created {new Date(apiKey.createdAt).toLocaleDateString()}
                            {apiKey.lastUsedAt && (
                              <> • Last used {new Date(apiKey.lastUsedAt).toLocaleDateString()}</>
                            )}
                          </CardDescription>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedApiKey(apiKey.id)}
                          >
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteApiKeyMutation.mutate(apiKey.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <code className="text-sm font-mono flex-1">{apiKey.keyPreview}</code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(apiKey.keyPreview)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium">Permissions</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {apiKey.permissions.map((permission) => (
                                <Badge key={permission} variant="secondary" className="text-xs">
                                  {permission.replace('_', ' ')}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium">Rate Limit</Label>
                            <p className="text-sm text-gray-600 mt-1">
                              {apiKey.rateLimit.toLocaleString()} requests/hour
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            {selectedApiKey ? (
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Usage Overview</CardTitle>
                    <CardDescription>Last 30 days statistics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {stats.summary.totalRequests.toLocaleString()}
                        </div>
                        <div className="text-sm text-blue-800">Total Requests</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {Math.round((stats.summary.successfulRequests / stats.summary.totalRequests) * 100)}%
                        </div>
                        <div className="text-sm text-green-800">Success Rate</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {stats.summary.totalCreditsUsed.toLocaleString()}
                        </div>
                        <div className="text-sm text-purple-800">Credits Used</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">
                          {stats.summary.averageResponseTime}ms
                        </div>
                        <div className="text-sm text-orange-800">Avg Response</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Endpoint Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(stats.summary.endpointBreakdown).map(([endpoint, requests]) => (
                        <div key={endpoint} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <div>
                            <code className="text-sm font-mono">{endpoint}</code>
                          </div>
                          <div className="text-sm font-medium">
                            {(requests as number).toLocaleString()} requests
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select an API Key</h3>
                  <p className="text-gray-600">Choose an API key from the list to view its usage statistics</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="documentation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  API Documentation
                </CardTitle>
                <CardDescription>
                  Complete guide to integrate Cultural Intelligence API into your business
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Base URL</h3>
                  <code className="block p-3 bg-gray-100 rounded text-sm">
                    https://your-domain.com/api/business
                  </code>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Authentication</h3>
                  <p className="text-gray-600 mb-2">Include your API key in the request header:</p>
                  <code className="block p-3 bg-gray-100 rounded text-sm">
                    X-API-Key: your_api_key_here
                  </code>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Available Endpoints</h3>
                  <div className="space-y-4">
                    <div className="border rounded p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge>POST</Badge>
                        <code className="text-sm">/v1/analyze</code>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Analyze text for cultural sentiment and insights
                      </p>
                      <details className="text-sm">
                        <summary className="cursor-pointer font-medium">Example Request</summary>
                        <pre className="mt-2 p-2 bg-gray-50 rounded overflow-x-auto">
{`{
  "text": "Aaj ka weather kitna accha hai! Perfect for chai and pakoras.",
  "region": "India",
  "features": ["sentiment", "cultural_score", "code_mixing"]
}`}
                        </pre>
                      </details>
                    </div>

                    <div className="border rounded p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge>POST</Badge>
                        <code className="text-sm">/v1/batch-analyze</code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Process multiple texts in a single request
                      </p>
                    </div>

                    <div className="border rounded p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge>GET</Badge>
                        <code className="text-sm">/v1/cultural-pulse</code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Get real-time cultural trends and insights
                      </p>
                    </div>

                    <div className="border rounded p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge>POST</Badge>
                        <code className="text-sm">/v1/viral-prediction</code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Predict viral potential of content
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Rate Limits</h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium text-yellow-800">Rate Limiting</span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      API requests are limited based on your subscription plan. 
                      When you exceed the limit, you&apos;ll receive a 429 status code.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Error Handling</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <code>400 Bad Request</code>
                      <span>Invalid request parameters</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <code>401 Unauthorized</code>
                      <span>Invalid or missing API key</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <code>402 Payment Required</code>
                      <span>Insufficient credits</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <code>429 Too Many Requests</code>
                      <span>Rate limit exceeded</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ApiManagementPage;