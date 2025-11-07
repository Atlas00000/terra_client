# Deployment Guide

Step-by-step guide for deploying Terra Industries Frontend to Vercel.

---

## Prerequisites

- Vercel account
- GitHub repository connected
- Backend API deployed on Railway

---

## Vercel Deployment

### 1. Import Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..." → Project**
3. Import your GitHub repository: `terra_client`
4. Click **Import**

### 2. Configure Build Settings

**Framework Preset:** Next.js  
**Root Directory:** `./` (leave as root)  
**Build Command:** `pnpm build`  
**Output Directory:** `.next` (default)  
**Install Command:** `pnpm install`

### 3. Environment Variables

Add these in Vercel project settings:

```env
NEXT_PUBLIC_API_URL=https://terraserver-production.up.railway.app/api/v1
```

**Important:** Remove any trailing `/api/v1/api/v1` duplication!

### 4. Deploy

Click **Deploy** and wait 2-3 minutes.

---

## Post-Deployment

### Verify Deployment

1. **Homepage:** `https://your-project.vercel.app`
2. **Health Check:** Open browser console, check API calls
3. **Search:** Test search on desktop (⌘K)
4. **Navigation:** Test all product pages

### Configure Custom Domain (Optional)

1. Go to **Settings → Domains**
2. Add your domain: `terra-industries.com`
3. Update DNS records as instructed
4. Update `CORS_ORIGIN` in Railway backend

---

## Environment Management

### Development
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

### Production (Vercel)
```env
NEXT_PUBLIC_API_URL=https://terraserver-production.up.railway.app/api/v1
```

---

## Continuous Deployment

Vercel automatically deploys when you push to `main`:

```bash
git add .
git commit -m "feat: new feature"
git push origin main
```

**Deployment Status:** Check Vercel dashboard

---

## Troubleshooting

### Build Fails
```bash
# Test build locally first
pnpm build

# Check for TypeScript errors
pnpm tsc --noEmit
```

### API Connection Issues
- Verify `NEXT_PUBLIC_API_URL` doesn't have trailing slashes
- Check CORS settings in backend
- Verify backend is running: `https://terraserver-production.up.railway.app/api/v1/health/liveness`

### Environment Variables Not Working
- Redeploy after changing env vars
- Env vars must start with `NEXT_PUBLIC_` for client-side access

---

## Performance Optimization

Already configured:
- ✅ Image optimization (Next.js)
- ✅ Static page generation
- ✅ Route prefetching
- ✅ Code splitting
- ✅ Compression (Vercel)

---

## Monitoring

- **Analytics:** Vercel Analytics (built-in)
- **Errors:** Check Vercel function logs
- **Performance:** Lighthouse CI in deployments

---

**Need Help?** Check [Vercel Documentation](https://vercel.com/docs)

