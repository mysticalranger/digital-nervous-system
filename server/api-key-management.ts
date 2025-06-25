import { Router } from 'express';
import { z } from 'zod';
import { ApiKeyService } from './api-auth';
import { authMiddleware } from './index';

const router = Router();

// Input validation schemas
const createApiKeySchema = z.object({
  name: z.string().min(1).max(100),
  permissions: z.array(z.enum([
    'basic_analysis',
    'batch_analysis',
    'voice_analysis',
    'cultural_pulse',
    'viral_prediction',
    'premium_features'
  ])).min(1),
  rateLimit: z.number().min(100).max(10000).optional().default(1000)
});

const updateApiKeySchema = z.object({
  name: z.string().min(1).max(100).optional(),
  permissions: z.array(z.string()).optional(),
  rateLimit: z.number().min(100).max(10000).optional(),
  isActive: z.boolean().optional()
});

// API Key Management Routes (for authenticated users)

// 1. Create new API key
router.post('/api-keys', authMiddleware, async (req: any, res) => {
  try {
    const { name, permissions, rateLimit } = createApiKeySchema.parse(req.body);
    const userId = req.user.id;
    
    // Check subscription limits
    const userSubscription = req.user.subscription || 'free';
    const maxKeys = {
      free: 1,
      pro: 5,
      enterprise: 20
    };
    
    // Count existing API keys
    const { db } = await import('./db');
    const { apiKeys } = await import('@shared/schema');
    const { eq, count } = await import('drizzle-orm');
    
    const [existingKeysCount] = await db
      .select({ count: count() })
      .from(apiKeys)
      .where(eq(apiKeys.userId, userId));
    
    if (existingKeysCount.count >= maxKeys[userSubscription as keyof typeof maxKeys]) {
      return res.status(403).json({
        error: 'API key limit exceeded',
        message: `Your ${userSubscription} plan allows up to ${maxKeys[userSubscription as keyof typeof maxKeys]} API keys`,
        currentCount: existingKeysCount.count,
        maxAllowed: maxKeys[userSubscription as keyof typeof maxKeys]
      });
    }
    
    // Validate permissions based on subscription
    const allowedPermissions = {
      free: ['basic_analysis'],
      pro: ['basic_analysis', 'batch_analysis', 'cultural_pulse'],
      enterprise: ['basic_analysis', 'batch_analysis', 'voice_analysis', 'cultural_pulse', 'viral_prediction', 'premium_features']
    };
    
    const userAllowedPermissions = allowedPermissions[userSubscription as keyof typeof allowedPermissions];
    const invalidPermissions = permissions.filter(p => !userAllowedPermissions.includes(p));
    
    if (invalidPermissions.length > 0) {
      return res.status(403).json({
        error: 'Invalid permissions',
        message: `Your ${userSubscription} plan doesn't include: ${invalidPermissions.join(', ')}`,
        allowedPermissions: userAllowedPermissions
      });
    }
    
    const result = await ApiKeyService.createApiKey(userId, name, permissions, rateLimit);
    
    res.status(201).json({
      success: true,
      data: {
        id: result.id,
        name: result.keyName,
        key: result.plainKey, // Only shown once
        permissions: JSON.parse(result.permissions as string),
        rateLimit: result.rateLimit,
        isActive: result.isActive,
        createdAt: result.createdAt,
        expiresAt: result.expiresAt
      },
      warning: 'Save this API key securely. It will not be shown again.'
    });
  } catch (error) {
    console.error('Create API key error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.errors
      });
    }
    res.status(500).json({
      error: 'Failed to create API key',
      message: 'An error occurred while creating your API key'
    });
  }
});

// 2. List user's API keys
router.get('/api-keys', authMiddleware, async (req: any, res) => {
  try {
    const userId = req.user.id;
    const { db } = await import('./db');
    const { apiKeys } = await import('@shared/schema');
    const { eq } = await import('drizzle-orm');
    
    const userApiKeys = await db
      .select({
        id: apiKeys.id,
        name: apiKeys.keyName,
        permissions: apiKeys.permissions,
        rateLimit: apiKeys.rateLimit,
        isActive: apiKeys.isActive,
        lastUsedAt: apiKeys.lastUsedAt,
        createdAt: apiKeys.createdAt,
        expiresAt: apiKeys.expiresAt
      })
      .from(apiKeys)
      .where(eq(apiKeys.userId, userId))
      .orderBy(apiKeys.createdAt);
    
    const formattedKeys = userApiKeys.map(key => ({
      ...key,
      permissions: JSON.parse(key.permissions as string),
      keyPreview: `dns_****${key.id.slice(-8)}`
    }));
    
    res.json({
      success: true,
      data: formattedKeys
    });
  } catch (error) {
    console.error('List API keys error:', error);
    res.status(500).json({
      error: 'Failed to list API keys',
      message: 'An error occurred while fetching your API keys'
    });
  }
});

// 3. Update API key
router.patch('/api-keys/:keyId', authMiddleware, async (req: any, res) => {
  try {
    const { keyId } = req.params;
    const userId = req.user.id;
    const updates = updateApiKeySchema.parse(req.body);
    
    const { db } = await import('./db');
    const { apiKeys } = await import('@shared/schema');
    const { eq, and } = await import('drizzle-orm');
    
    // Verify ownership
    const [existingKey] = await db
      .select()
      .from(apiKeys)
      .where(and(eq(apiKeys.id, keyId), eq(apiKeys.userId, userId)));
    
    if (!existingKey) {
      return res.status(404).json({
        error: 'API key not found',
        message: 'The specified API key does not exist or does not belong to you'
      });
    }
    
    // Prepare update data
    const updateData: any = {};
    if (updates.name) updateData.keyName = updates.name;
    if (updates.permissions) updateData.permissions = JSON.stringify(updates.permissions);
    if (updates.rateLimit) updateData.rateLimit = updates.rateLimit;
    if (updates.isActive !== undefined) updateData.isActive = updates.isActive;
    
    const [updatedKey] = await db
      .update(apiKeys)
      .set(updateData)
      .where(eq(apiKeys.id, keyId))
      .returning();
    
    res.json({
      success: true,
      data: {
        id: updatedKey.id,
        name: updatedKey.keyName,
        permissions: JSON.parse(updatedKey.permissions as string),
        rateLimit: updatedKey.rateLimit,
        isActive: updatedKey.isActive,
        lastUsedAt: updatedKey.lastUsedAt,
        createdAt: updatedKey.createdAt,
        expiresAt: updatedKey.expiresAt
      }
    });
  } catch (error) {
    console.error('Update API key error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.errors
      });
    }
    res.status(500).json({
      error: 'Failed to update API key',
      message: 'An error occurred while updating your API key'
    });
  }
});

// 4. Delete API key
router.delete('/api-keys/:keyId', authMiddleware, async (req: any, res) => {
  try {
    const { keyId } = req.params;
    const userId = req.user.id;
    
    const { db } = await import('./db');
    const { apiKeys } = await import('@shared/schema');
    const { eq, and } = await import('drizzle-orm');
    
    // Verify ownership and delete
    const [deletedKey] = await db
      .delete(apiKeys)
      .where(and(eq(apiKeys.id, keyId), eq(apiKeys.userId, userId)))
      .returning({ id: apiKeys.id, name: apiKeys.keyName });
    
    if (!deletedKey) {
      return res.status(404).json({
        error: 'API key not found',
        message: 'The specified API key does not exist or does not belong to you'
      });
    }
    
    res.json({
      success: true,
      message: `API key '${deletedKey.name}' has been deleted successfully`
    });
  } catch (error) {
    console.error('Delete API key error:', error);
    res.status(500).json({
      error: 'Failed to delete API key',
      message: 'An error occurred while deleting your API key'
    });
  }
});

// 5. Get API key usage statistics
router.get('/api-keys/:keyId/usage', authMiddleware, async (req: any, res) => {
  try {
    const { keyId } = req.params;
    const userId = req.user.id;
    const days = parseInt(req.query.days as string) || 30;
    
    const { db } = await import('./db');
    const { apiKeys } = await import('@shared/schema');
    const { eq, and } = await import('drizzle-orm');
    
    // Verify ownership
    const [apiKey] = await db
      .select()
      .from(apiKeys)
      .where(and(eq(apiKeys.id, keyId), eq(apiKeys.userId, userId)));
    
    if (!apiKey) {
      return res.status(404).json({
        error: 'API key not found',
        message: 'The specified API key does not exist or does not belong to you'
      });
    }
    
    const stats = await ApiKeyService.getUsageStats(keyId, days);
    
    const summary = {
      keyName: apiKey.keyName,
      totalRequests: stats.length,
      successfulRequests: stats.filter(s => s.statusCode < 400).length,
      errorRequests: stats.filter(s => s.statusCode >= 400).length,
      totalCreditsUsed: stats.reduce((sum, s) => sum + (s.creditsUsed || 0), 0),
      averageResponseTime: stats.length > 0 
        ? Math.round(stats.reduce((sum, s) => sum + (s.responseTime || 0), 0) / stats.length)
        : 0,
      dailyBreakdown: stats.reduce((acc: any, stat) => {
        const date = stat.timestamp?.toISOString().split('T')[0];
        if (date) {
          acc[date] = (acc[date] || 0) + 1;
        }
        return acc;
      }, {}),
      endpointBreakdown: stats.reduce((acc: any, stat) => {
        acc[stat.endpoint] = (acc[stat.endpoint] || 0) + 1;
        return acc;
      }, {})
    };
    
    res.json({
      success: true,
      data: {
        period: `${days} days`,
        summary,
        recentUsage: stats.slice(0, 50)
      }
    });
  } catch (error) {
    console.error('API key usage stats error:', error);
    res.status(500).json({
      error: 'Failed to fetch usage statistics',
      message: 'An error occurred while retrieving usage data'
    });
  }
});

export default router;