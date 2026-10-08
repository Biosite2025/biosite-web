# Biosite Medical Instruments

A Next.js-based website for Biosite Medical Instruments, featuring product catalogs, event galleries, career applications, and more. Optimized for Render's free tier deployment.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 📊 Memory Monitoring (NEW!)

This project includes comprehensive memory monitoring for Render's free tier (512MB RAM limit).

### Quick Access
- **Health Check:** `https://your-app.onrender.com/api/health`
- **View Logs:** Render Dashboard → Your Service → Logs tab

### Documentation
- 📖 **[Memory Monitoring Guide](./MEMORY_MONITORING_GUIDE.md)** - Complete usage guide
- 📋 **[Memory Logs Reference](./MEMORY_LOGS_REFERENCE.md)** - Quick log reference
- 🏗️ **[Monitoring Architecture](./MONITORING_ARCHITECTURE.md)** - System overview
- 📝 **[Implementation Summary](./MONITORING_IMPLEMENTATION_SUMMARY.md)** - What was created

### What You Get
- ✅ Real-time memory tracking (every 30 seconds)
- ✅ Health check API endpoint
- ✅ Memory leak detection
- ✅ Per-route memory logging
- ✅ Automatic warnings at 75%, 90% usage
- ✅ Detailed Render logs

## 🎯 Features

- **Product Catalogs** - Interactive product showcases with optimized images
- **Event Gallery** - Responsive image gallery for company events
- **Career Portal** - Job application system with resume upload
- **Contact Forms** - Web3Forms integration for inquiries
- **Admin Dashboard** - Separate admin panel for managing applications

## 🛠️ Tech Stack

- **Framework:** Next.js 15.5.4 (App Router)
- **UI:** React 19.2.0, Tailwind CSS, Framer Motion
- **Database:** PostgreSQL (Neon)
- **Storage:** DigitalOcean Spaces CDN (images, videos, resumes)
- **Deployment:** Render.com (Free Tier)
- **Forms:** Web3Forms
- **Type Safety:** TypeScript

## 🏗️ Project Structure

```
biosite-web/
├── app/
│   ├── api/              # API routes
│   │   ├── health/       # Memory health check (NEW!)
│   │   ├── applicants/   # Career applications
│   │   └── ...
│   ├── user/             # Public pages
│   │   ├── about/        # About page (optimized)
│   │   ├── products/     # Product catalogs
│   │   ├── events/       # Event gallery
│   │   ├── career/       # Careers page
│   │   └── contact/      # Contact page
│   └── globals.css
├── lib/
│   ├── db.ts             # Database connection
│   └── memory-logger.ts  # Memory monitoring (NEW!)
├── scripts/
│   ├── monitor-memory.js          # Memory monitor (NEW!)
│   └── start-with-monitoring.js   # Enhanced startup (NEW!)
└── public/
    └── asset/            # Static assets
```

## 🚀 Deployment

### Render.com (Configured)

The project is pre-configured for Render deployment:

1. **Push to GitHub**
2. **Connect to Render**
3. **Deploy automatically** using `render.yaml`

**Build Command:** `npm install && npm run build`
**Start Command:** `node scripts/start-with-monitoring.js`

### Environment Variables

Required in Render:
```env
NODE_ENV=production
DATABASE_URL=your_postgres_url
DO_SPACES_KEY=your_spaces_key
DO_SPACES_SECRET=your_spaces_secret
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_key
```

## 📊 Performance Optimizations

### Image Optimization (Implemented)
- ✅ Assets pre-optimised to WebP on the Spaces CDN (served as-is, no server-side re-encoding)
- ✅ Lazy loading on all non-critical images
- ✅ Reduced quality to 60-75 (imperceptible difference)
- ✅ ~70-80% bandwidth reduction

### Memory Management
- ✅ 512MB RAM limit monitoring
- ✅ Automatic alerts at 75%, 90% usage
- ✅ Memory leak detection
- ✅ Per-route tracking

### Build Optimization
- Standalone output (smaller Docker-style deployment)
- 1-year image caching
- Optimized package imports

## 🧪 Available Scripts

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm start                # Start production server
npm run start:monitor    # Start with memory monitoring (recommended for Render)

# Utilities
npm run monitor          # Run standalone memory monitor
npm run lint            # Run ESLint
```

## 📈 Monitoring in Production

### Check Memory Status
```bash
curl https://biosite-web.onrender.com/api/health
```

### View Render Logs
1. Go to Render Dashboard
2. Click your service
3. Click "Logs" tab
4. Search for:
   - `🏥 HEALTH CHECK` - Health status
   - `🔍 Periodic` - Regular checks
   - `⚠️` - Warnings
   - `🚨` - Critical alerts

### Memory Thresholds
| Status | Memory | Action |
|--------|--------|--------|
| ✅ Healthy | 0-74% | Normal |
| ⚡ Caution | 50-74% | Monitor |
| ⚠️ Warning | 75-89% | Optimize |
| 🚨 Critical | 90-100% | Urgent |

## 🐛 Troubleshooting

### 503 Service Unavailable
1. Check `/api/health` endpoint
2. Review Render logs for memory warnings
3. See [Memory Monitoring Guide](./MEMORY_MONITORING_GUIDE.md)

### High Memory Usage
1. Verify images are optimized (should have `w_800,q_auto:low` in URL)
2. Check for unclosed database connections
3. Review recent code changes
4. Monitor for memory leaks in logs

### Build Errors
```bash
npm run build  # Test locally first
```

## 📚 Documentation

- **[Memory Monitoring Guide](./MEMORY_MONITORING_GUIDE.md)** - Comprehensive monitoring guide
- **[Performance Optimizations](./PERFORMANCE_OPTIMIZATIONS.md)** - Image optimization details
- **[Deployment Guides](./RENDER_DEPLOYMENT_GUIDE.md)** - Render deployment steps

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Test locally: `npm run build`
4. Check memory impact (if applicable)
5. Submit pull request

## 📝 License

Private - Biosite Medical Instruments

## 🆘 Support

For issues or questions:
1. Check documentation files listed above
2. Review Render logs for error details
3. Check `/api/health` for system status

---

**Built with ❤️ for Biosite Medical Instruments**
