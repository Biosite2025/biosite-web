/**
 * Health Check API Route with Memory Monitoring
 * 
 * URL: /api/health
 * 
 * This endpoint provides real-time memory usage information
 * and system health status for monitoring in Render logs
 */

import { NextRequest, NextResponse } from 'next/server';

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();
  
  // Get memory usage
  const usage = process.memoryUsage();
  const RENDER_FREE_TIER_LIMIT_MB = 512;
  const RENDER_FREE_TIER_LIMIT_BYTES = RENDER_FREE_TIER_LIMIT_MB * 1024 * 1024;
  
  const memoryUsedMB = Math.round(usage.rss / 1024 / 1024);
  const memoryUsedPercentage = ((usage.rss / RENDER_FREE_TIER_LIMIT_BYTES) * 100).toFixed(2);
  const memoryFreeMB = RENDER_FREE_TIER_LIMIT_MB - memoryUsedMB;
  
  // Determine health status
  let status: 'healthy' | 'warning' | 'critical';
  let statusCode = 200;
  
  if (parseFloat(memoryUsedPercentage) >= 90) {
    status = 'critical';
    statusCode = 503; // Service Unavailable
  } else if (parseFloat(memoryUsedPercentage) >= 75) {
    status = 'warning';
  } else {
    status = 'healthy';
  }
  
  // Get uptime
  const uptimeSeconds = process.uptime();
  const uptimeFormatted = `${Math.floor(uptimeSeconds / 3600)}h ${Math.floor((uptimeSeconds % 3600) / 60)}m ${Math.floor(uptimeSeconds % 60)}s`;
  
  // Prepare response
  const healthData = {
    status,
    timestamp,
    uptime: uptimeFormatted,
    uptimeSeconds,
    memory: {
      used: `${memoryUsedMB}MB`,
      usedBytes: usage.rss,
      limit: `${RENDER_FREE_TIER_LIMIT_MB}MB`,
      limitBytes: RENDER_FREE_TIER_LIMIT_BYTES,
      free: `${memoryFreeMB}MB`,
      percentage: `${memoryUsedPercentage}%`,
      details: {
        rss: formatBytes(usage.rss),
        heapTotal: formatBytes(usage.heapTotal),
        heapUsed: formatBytes(usage.heapUsed),
        external: formatBytes(usage.external),
        arrayBuffers: formatBytes(usage.arrayBuffers),
      },
    },
    environment: {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      pid: process.pid,
    },
    responseTime: `${Date.now() - startTime}ms`,
  };
  
  // Log to console (will appear in Render logs)
  console.log('\n' + '='.repeat(80));
  console.log(`🏥 HEALTH CHECK - ${timestamp}`);
  console.log('='.repeat(80));
  console.log(`Status: ${status.toUpperCase()}`);
  console.log(`Memory: ${memoryUsedMB}MB / ${RENDER_FREE_TIER_LIMIT_MB}MB (${memoryUsedPercentage}%)`);
  console.log(`Free: ${memoryFreeMB}MB`);
  console.log(`Uptime: ${uptimeFormatted}`);
  
  if (status === 'critical') {
    console.log('\n⚠️⚠️⚠️  CRITICAL: Memory usage at dangerous levels! OOM error likely! ⚠️⚠️⚠️');
  } else if (status === 'warning') {
    console.log('\n⚠️  WARNING: High memory usage detected!');
  } else {
    console.log('\n✅ System healthy');
  }
  
  console.log('='.repeat(80) + '\n');
  
  return NextResponse.json(healthData, { status: statusCode });
}
