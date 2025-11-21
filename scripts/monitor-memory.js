/**
 * Memory Monitoring Script for Render Deployment
 * 
 * This script monitors RAM usage and logs detailed information to help
 * diagnose Out of Memory (OOM) errors on Render's free tier (512MB RAM limit)
 * 
 * Usage: Run this alongside your Next.js server to track memory consumption
 */

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

const getMemoryUsage = () => {
  const usage = process.memoryUsage();
  return {
    rss: usage.rss, // Resident Set Size - total memory allocated
    heapTotal: usage.heapTotal, // Total heap allocated
    heapUsed: usage.heapUsed, // Actual heap used
    external: usage.external, // C++ objects bound to JS
    arrayBuffers: usage.arrayBuffers, // ArrayBuffers and SharedArrayBuffers
  };
};

const logMemoryStats = (label = 'Memory Usage') => {
  const usage = getMemoryUsage();
  const timestamp = new Date().toISOString();
  
  console.log('\n' + '='.repeat(80));
  console.log(`🔍 ${label} - ${timestamp}`);
  console.log('='.repeat(80));
  console.log(`📊 RSS (Total Memory):        ${formatBytes(usage.rss)} (${Math.round(usage.rss / 1024 / 1024)}MB)`);
  console.log(`📦 Heap Total:                ${formatBytes(usage.heapTotal)}`);
  console.log(`💾 Heap Used:                 ${formatBytes(usage.heapUsed)}`);
  console.log(`🔗 External:                  ${formatBytes(usage.external)}`);
  console.log(`📋 Array Buffers:             ${formatBytes(usage.arrayBuffers)}`);
  
  // Calculate percentages for Render free tier (512MB limit)
  const RENDER_FREE_TIER_LIMIT_MB = 512;
  const RENDER_FREE_TIER_LIMIT_BYTES = RENDER_FREE_TIER_LIMIT_MB * 1024 * 1024;
  const usagePercentage = (usage.rss / RENDER_FREE_TIER_LIMIT_BYTES) * 100;
  
  console.log('\n📍 Render Free Tier Analysis:');
  console.log(`   Limit: ${RENDER_FREE_TIER_LIMIT_MB}MB`);
  console.log(`   Used: ${Math.round(usage.rss / 1024 / 1024)}MB (${usagePercentage.toFixed(2)}%)`);
  console.log(`   Free: ${Math.round((RENDER_FREE_TIER_LIMIT_BYTES - usage.rss) / 1024 / 1024)}MB`);
  
  // Warning levels
  if (usagePercentage >= 90) {
    console.log(`\n⚠️  CRITICAL: Memory usage at ${usagePercentage.toFixed(2)}% - OOM ERROR IMMINENT!`);
  } else if (usagePercentage >= 75) {
    console.log(`\n⚠️  WARNING: Memory usage at ${usagePercentage.toFixed(2)}% - Approaching limit!`);
  } else if (usagePercentage >= 50) {
    console.log(`\n⚡ CAUTION: Memory usage at ${usagePercentage.toFixed(2)}% - Monitor closely`);
  } else {
    console.log(`\n✅ HEALTHY: Memory usage at ${usagePercentage.toFixed(2)}% - Within safe limits`);
  }
  
  console.log('='.repeat(80) + '\n');
  
  return { usage, usagePercentage };
};

// Track memory over time
let memoryHistory = [];
const MAX_HISTORY = 100; // Keep last 100 readings

const recordMemorySnapshot = () => {
  const { usage, usagePercentage } = logMemoryStats('Periodic Memory Check');
  
  memoryHistory.push({
    timestamp: Date.now(),
    rss: usage.rss,
    heapUsed: usage.heapUsed,
    percentage: usagePercentage,
  });
  
  // Keep only recent history
  if (memoryHistory.length > MAX_HISTORY) {
    memoryHistory.shift();
  }
  
  // Check for memory leaks (continuous growth)
  if (memoryHistory.length >= 10) {
    const recent10 = memoryHistory.slice(-10);
    const isGrowing = recent10.every((item, i) => {
      if (i === 0) return true;
      return item.rss >= recent10[i - 1].rss;
    });
    
    if (isGrowing) {
      console.log('🚨 MEMORY LEAK DETECTED: Memory has been continuously growing for last 10 checks!');
      console.log('   This may indicate a memory leak in your application.');
    }
  }
};

// Log memory on process events
process.on('warning', (warning) => {
  console.warn('⚠️  Node.js Warning:', warning.name);
  console.warn('   Message:', warning.message);
  console.warn('   Stack:', warning.stack);
  logMemoryStats('After Warning Event');
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error.message);
  console.error('   Stack:', error.stack);
  logMemoryStats('After Uncaught Exception');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Promise Rejection:', reason);
  logMemoryStats('After Unhandled Rejection');
});

// Monitor garbage collection if available
if (global.gc) {
  console.log('♻️  Manual garbage collection is enabled (--expose-gc flag detected)');
  setInterval(() => {
    const before = process.memoryUsage().heapUsed;
    global.gc();
    const after = process.memoryUsage().heapUsed;
    const freed = before - after;
    
    if (freed > 0) {
      console.log(`♻️  Garbage Collection: Freed ${formatBytes(freed)}`);
    }
  }, 60000); // Run GC every minute
}

// Start monitoring
console.log('\n🚀 Memory Monitoring Started');
console.log('📊 Monitoring for Render Free Tier (512MB RAM limit)');
console.log('🔄 Checks will run every 30 seconds\n');

// Initial memory log
logMemoryStats('Server Startup');

// Periodic monitoring (every 30 seconds)
setInterval(recordMemorySnapshot, 30000);

// Log memory every 5 minutes with summary
setInterval(() => {
  console.log('\n' + '█'.repeat(80));
  console.log('📈 5-MINUTE MEMORY SUMMARY');
  console.log('█'.repeat(80));
  
  if (memoryHistory.length > 0) {
    const recent = memoryHistory.slice(-10); // Last 10 readings (5 minutes)
    const avgRss = recent.reduce((sum, item) => sum + item.rss, 0) / recent.length;
    const maxRss = Math.max(...recent.map(item => item.rss));
    const minRss = Math.min(...recent.map(item => item.rss));
    
    console.log(`Average Memory: ${formatBytes(avgRss)} (${Math.round(avgRss / 1024 / 1024)}MB)`);
    console.log(`Peak Memory:    ${formatBytes(maxRss)} (${Math.round(maxRss / 1024 / 1024)}MB)`);
    console.log(`Lowest Memory:  ${formatBytes(minRss)} (${Math.round(minRss / 1024 / 1024)}MB)`);
    console.log(`Memory Range:   ${formatBytes(maxRss - minRss)}`);
    
    const growth = maxRss - minRss;
    if (growth > 50 * 1024 * 1024) { // 50MB growth
      console.log('⚠️  Significant memory growth detected in last 5 minutes!');
    }
  }
  
  console.log('█'.repeat(80) + '\n');
}, 300000); // Every 5 minutes

// Export functions for use in Next.js
module.exports = {
  logMemoryStats,
  getMemoryUsage,
  formatBytes,
};
