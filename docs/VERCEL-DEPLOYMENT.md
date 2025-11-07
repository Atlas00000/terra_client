# 🚀 Vercel Deployment Guide - Terra Industries Frontend

**Quick guide to deploy terra_client to Vercel**

---

## ✅ **Step-by-Step Deployment** (10 minutes)

### **Step 1: Get Your Railway Backend URL** (2 min)

Before deploying frontend, you need your backend URL:

1. Go to **Railway Dashboard**: https://railway.app/dashboard
2. Click your **Backend Service** (terra_server)
3. Look for the **domain/URL** at the top or in Settings → Networking
4. Copy the URL (e.g., `https://terra-server-production-xxxx.up.railway.app`)

**Save this URL - you'll need it in Step 4!**

---

### **Step 2: Import Repository to Vercel** (3 min)

1. Go to https://vercel.com/dashboard
2. Click **"Add New"** → **"Project"**
3. Click **"Import Git Repository"**
4. Find **`terra_client`** in your repositories list
5. Click **"Import"**

---

### **Step 3: Configure Build Settings** (1 min)

Vercel auto-detects Next.js. Verify these settings:

| Setting | Value |
|---------|-------|
| **Framework Preset** | Next.js ✅ (auto-detected) |
| **Root Directory** | `./` (default) |
| **Build Command** | `pnpm build` ✅ (auto-detected) |
| **Output Directory** | `.next` ✅ (auto-detected) |
| **Install Command** | `pnpm install` ✅ (auto-detected) |

**Don't add environment variables yet!** Click **"Deploy"** to do first deployment.

---

### **Step 4: Add Environment Variables** (2 min)

**After first deployment completes:**

1. Go to project **Settings** → **Environment Variables**
2. Add these variables:

#### **Required:**

**Variable:** `NEXT_PUBLIC_API_URL`  
**Value:** `https://your-railway-backend.up.railway.app/api/v1`  
**Environments:** ✅ Production, ✅ Preview, ✅ Development

**Variable:** `NEXT_PUBLIC_SITE_URL`  
**Value:** `https://your-vercel-app.vercel.app`  
**Environments:** ✅ Production, ✅ Preview, ✅ Development

**Variable:** `NEXT_TELEMETRY_DISABLED`  
**Value:** `1`  
**Environments:** ✅ Production, ✅ Preview, ✅ Development

#### **Optional:**

**Variable:** `NEXT_PUBLIC_ENABLE_ANALYTICS`  
**Value:** `true`  
**Environments:** ✅ Production

**Variable:** `NEXT_PUBLIC_ENABLE_SEARCH`  
**Value:** `true`  
**Environments:** ✅ Production

---

### **Step 5: Redeploy with Environment Variables** (2 min)

1. Go to **"Deployments"** tab
2. Find the latest deployment
3. Click three dots (⋯) → **"Redeploy"**
4. Click **"Redeploy"** to confirm

Vercel will rebuild with your environment variables.

---

### **Step 6: Test Deployment** (2 min)

Once deployed:

1. **Visit your Vercel URL** (e.g., https://terra-client.vercel.app)
2. **Test these features:**
   - ✅ Home page loads
   - ✅ Products pages (Artemis, Archer, etc.)
   - ✅ Search (press ⌘K)
   - ✅ News section
3. **Open browser console** (F12)
   - Check for API calls to Railway
   - Should see requests to your Railway backend
   - No CORS errors

---

## 🔧 **Troubleshooting**

### **Issue: CORS Error**

If you see CORS errors in browser console:

**Fix in Railway:**
1. Railway → Backend Service → Variables
2. Update `CORS_ORIGIN`:
```bash
CORS_ORIGIN=https://your-vercel-url.vercel.app
```
3. Save (auto-redeploys)

### **Issue: API Not Found (404)**

Check your `NEXT_PUBLIC_API_URL` ends with `/api/v1`:
```bash
# ✅ Correct
https://backend.railway.app/api/v1

# ❌ Wrong
https://backend.railway.app
```

### **Issue: Build Fails**

If build fails with dependency errors:
1. The lockfile should be up to date (we just fixed it)
2. If still fails, try adding custom install command in Vercel:
   - Settings → General → Install Command
   - Set to: `pnpm install --no-frozen-lockfile`

---

## 📋 **Complete Environment Variables**

**Copy-paste ready for Vercel:**

```bash
# Backend API (UPDATE THIS!)
NEXT_PUBLIC_API_URL=https://your-railway-backend.up.railway.app/api/v1

# Site URL (UPDATE AFTER FIRST DEPLOY!)
NEXT_PUBLIC_SITE_URL=https://your-vercel-app.vercel.app

# Features
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_SEARCH=true

# Telemetry
NEXT_TELEMETRY_DISABLED=1
```

---

## ✅ **Deployment Checklist**

- [ ] Get Railway backend URL
- [ ] Import terra_client to Vercel
- [ ] First deployment (without env vars)
- [ ] Add environment variables in Vercel
- [ ] Update NEXT_PUBLIC_API_URL with Railway URL
- [ ] Redeploy with environment variables
- [ ] Test frontend in browser
- [ ] Test API calls in browser console
- [ ] Verify no CORS errors
- [ ] Test search (⌘K)
- [ ] Test product pages
- [ ] Update CORS_ORIGIN in Railway if needed

---

## 🎯 **Expected Result**

After deployment:
- ✅ Frontend on Vercel
- ✅ Backend on Railway
- ✅ Database on Railway PostgreSQL
- ✅ Full stack working together!

**Deployment time:** ~10 minutes total  
**Cost:** Free (Vercel Hobby + Railway free tier)

---

## 📞 **Quick Links**

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Railway Dashboard:** https://railway.app/dashboard
- **Frontend Repo:** https://github.com/Atlas00000/terra_client
- **Backend Repo:** https://github.com/Atlas00000/terra_server

---

**Follow the steps above and your frontend will be live on Vercel!** 🚀

