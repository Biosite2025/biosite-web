/**
 * Next.js API Route Memory Monitor
 * 
 * This middleware logs memory usage for every API request
 * Add this to your API routes to track memory consumption
 * 
 * Usage in API routes:
 * import { withMemoryLogging } from '@/lib/memory-logger';
 * export const GET = withMemoryLogging(async (req) => { ... });
 */

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export const logMemoryForRequest = (routeName: string) => {
  const usage = process.memoryUsage();
  const timestamp = new Date().toISOString();
  const RENDER_LIMIT_MB = 512;
  const usagePercentage = ((usage.rss / (RENDER_LIMIT_MB * 1024 * 1024)) * 100).toFixed(2);
  
  console.log(`[${timestamp}] 📍 ${routeName}`);
  console.log(`   Memory: ${formatBytes(usage.rss)} (${Math.round(usage.rss / 1024 / 1024)}MB / ${RENDER_LIMIT_MB}MB) - ${usagePercentage}%`);
  
  if (parseFloat(usagePercentage) >= 90) {
    console.log(`   ⚠️  CRITICAL: Memory at ${usagePercentage}%!`);
  } else if (parseFloat(usagePercentage) >= 75) {
    console.log(`   ⚠️  WARNING: Memory at ${usagePercentage}%`);
  }
  
  return { usage, usagePercentage };
};

// Middleware wrapper for API routes
export const withMemoryLogging = (handler: Function) => {
  return async (req: any, ...args: any[]) => {
    const routeName = req.url || 'Unknown Route';
    
    // Log memory before request
    console.log(`\n🔵 Request Start: ${routeName}`);
    const beforeMemory = logMemoryForRequest(`BEFORE ${routeName}`);
    
    try {
      // Execute the actual handler
      const result = await handler(req, ...args);
      
      // Log memory after request
      const afterMemory = logMemoryForRequest(`AFTER ${routeName}`);
      const memoryDiff = afterMemory.usage.rss - beforeMemory.usage.rss;
      
      console.log(`   Δ Memory Change: ${formatBytes(Math.abs(memoryDiff))} ${memoryDiff >= 0 ? '📈' : '📉'}`);
      console.log(`🟢 Request Complete: ${routeName}\n`);
      
      return result;
    } catch (error) {
      // Log memory on error
      console.error(`\n❌ Request Error: ${routeName}`);
      console.error(`   Error: ${error instanceof Error ? error.message : String(error)}`);
      logMemoryForRequest(`ERROR ${routeName}`);
      console.log(`🔴 Request Failed: ${routeName}\n`);
      
      throw error;
    }
  };
};

// Simple memory checker
export const checkMemoryHealth = () => {
  const usage = process.memoryUsage();
  const RENDER_LIMIT_BYTES = 512 * 1024 * 1024;
  const usagePercentage = (usage.rss / RENDER_LIMIT_BYTES) * 100;
  
  return {
    healthy: usagePercentage < 75,
    warning: usagePercentage >= 75 && usagePercentage < 90,
    critical: usagePercentage >= 90,
    percentage: usagePercentage.toFixed(2),
    used: Math.round(usage.rss / 1024 / 1024),
    limit: 512,
    free: Math.round((RENDER_LIMIT_BYTES - usage.rss) / 1024 / 1024),
  };
};
