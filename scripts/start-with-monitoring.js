/**
 * Enhanced Server Startup with Memory Monitoring
 * 
 * This script starts the Next.js server with memory monitoring enabled
 * Use this as your start command in Render: node scripts/start-with-monitoring.js
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('\n' + '█'.repeat(80));
console.log('🚀 BIOSITE WEB - Starting with Memory Monitoring');
console.log('█'.repeat(80));
console.log(`📅 Start Time: ${new Date().toISOString()}`);
console.log(`🖥️  Node Version: ${process.version}`);
console.log(`📊 Platform: ${process.platform} ${process.arch}`);
console.log(`🔧 Environment: ${process.env.NODE_ENV || 'production'}`);
console.log('█'.repeat(80) + '\n');

// Load memory monitoring script
require('./monitor-memory.js');

// Start Next.js server
console.log('🔄 Starting Next.js Server...\n');

const serverProcess = spawn('node', [
  path.join(__dirname, '..', '.next', 'standalone', 'server.js')
], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_OPTIONS: '--max-old-space-size=460', // Leave 52MB buffer for system
  }
});

serverProcess.on('error', (error) => {
  console.error('❌ Server Error:', error);
  process.exit(1);
});

serverProcess.on('exit', (code, signal) => {
  console.log('\n' + '█'.repeat(80));
  console.log('🛑 Server Process Exited');
  console.log('█'.repeat(80));
  console.log(`Exit Code: ${code}`);
  console.log(`Signal: ${signal}`);
  console.log(`Time: ${new Date().toISOString()}`);
  console.log('█'.repeat(80) + '\n');
  
  process.exit(code || 0);
});

// Handle process signals
process.on('SIGTERM', () => {
  console.log('\n📡 Received SIGTERM signal');
  serverProcess.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('\n📡 Received SIGINT signal');
  serverProcess.kill('SIGINT');
});

// Log startup complete
setTimeout(() => {
  console.log('\n✅ Memory monitoring active - Logs will appear every 30 seconds');
  console.log('📊 Health check available at: /api/health');
  console.log('🔍 Monitor Render logs for memory statistics\n');
}, 3000);
