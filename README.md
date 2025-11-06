# 🚀 Terra Industries Frontend

**Modern Next.js 16 defense technology platform with advanced search, analytics, and dynamic content**

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)](https://vercel.com/)

---

## ✨ **Features**

- ✅ **Next.js 16** - Latest with Turbopack for fast development
- ✅ **React 19** - Modern React with concurrent features
- ✅ **TypeScript** - Full type safety
- ✅ **Tailwind CSS v4** - Modern utility-first styling
- ✅ **shadcn/ui** - Beautiful accessible component library
- ✅ **React Query** - Powerful data fetching & caching
- ✅ **Framer Motion** - Smooth animations
- ✅ **Global Search** - ⌘K shortcut with fuzzy search
- ✅ **Analytics Tracking** - User behavior insights
- ✅ **Sentry Integration** - Error tracking & monitoring
- ✅ **Recharts** - Data visualization
- ✅ **100% Test Coverage** - Vitest + Testing Library

---

## 🛠️ **Tech Stack**

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | Radix UI + shadcn/ui |
| **State Management** | React Query (TanStack Query) |
| **Animation** | Framer Motion |
| **Forms** | React Hook Form + Zod |
| **Charts** | Recharts |
| **Testing** | Vitest + Testing Library |
| **Deployment** | Vercel |

---

## 🚀 **Quick Start**

### **Prerequisites**

- Node.js 20+
- pnpm 9+

### **Installation**

```bash
# Clone repository
git clone https://github.com/Atlas00000/terra_client.git
cd terra_client

# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env.local
# Edit .env.local with your backend URL
```

### **Development**

```bash
# Start development server
pnpm dev

# Open http://localhost:3000
```

### **Build for Production**

```bash
# Create production build
pnpm build

# Start production server
pnpm start
```

---

## 🌐 **Vercel Deployment**

### **Step 1: Push to GitHub**

```bash
git init
git add .
git commit -m "Initial commit: Terra Industries Frontend"
git remote add origin https://github.com/Atlas00000/terra_client.git
git push -u origin main
```

### **Step 2: Connect to Vercel**

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Select **"Import Git Repository"**
4. Choose `terra_client` repository
5. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `pnpm build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)

### **Step 3: Add Environment Variables**

In Vercel project settings → Environment Variables:

```bash
# Required
NEXT_PUBLIC_API_URL=https://your-railway-backend.up.railway.app/api/v1
NEXT_PUBLIC_SITE_URL=https://your-vercel-app.vercel.app

# Optional
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_SEARCH=true
NEXT_TELEMETRY_DISABLED=1
```

### **Step 4: Deploy**

Click **"Deploy"** - Vercel will:
1. ✅ Install dependencies
2. ✅ Build Next.js app
3. ✅ Deploy to global CDN
4. ✅ Provide production URL

**Deployment time:** ~2-3 minutes

---

## 🔐 **Environment Variables**

### **Required Variables**

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API endpoint | `https://backend.railway.app/api/v1` |
| `NEXT_PUBLIC_SITE_URL` | Frontend URL | `https://your-app.vercel.app` |

### **Optional Variables**

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | Enable analytics tracking | `true` |
| `NEXT_PUBLIC_ENABLE_SEARCH` | Enable global search | `true` |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry error tracking | - |
| `NEXT_TELEMETRY_DISABLED` | Disable Next.js telemetry | `1` |

**See `.env.example` for complete list.**

---

## 📁 **Project Structure**

```
terra_client/
├── app/                    # Next.js App Router pages
│   ├── (routes)/          # Route groups
│   ├── artemis/           # Product pages
│   ├── archer/
│   ├── iroko/
│   ├── duma/
│   ├── kallon/
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── search/           # Search functionality
│   ├── product/          # Product components
│   └── header.tsx        # Navigation
├── hooks/                # Custom React hooks
│   ├── use-products.ts   # Product data fetching
│   ├── use-search.ts     # Search functionality
│   └── use-track-event.ts # Analytics tracking
├── lib/                  # Utilities & configurations
│   ├── api-client.ts     # Axios instance
│   ├── analytics-tracker.ts # Analytics system
│   └── utils.ts          # Helper functions
├── types/                # TypeScript definitions
├── public/               # Static assets
└── styles/               # Global styles
```

---

## 🧪 **Testing**

```bash
# Run all tests
pnpm test

# Run tests in UI mode
pnpm test:ui

# Run tests with coverage
pnpm test:coverage

# Watch mode
pnpm test:watch

# Type checking
pnpm type-check

# Linting
pnpm lint
```

---

## 🎨 **Features Implemented**

### **Week 1: Foundation**
- ✅ Authentication UI (login, register)
- ✅ Contact form with validation
- ✅ Protected routes
- ✅ JWT token management

### **Week 2: Dynamic Products**
- ✅ Product API integration
- ✅ Dynamic product pages
- ✅ Loading skeletons
- ✅ Fallback data system
- ✅ React Query caching

### **Week 3: Search & Analytics**
- ✅ Global search (⌘K shortcut)
- ✅ Search modal with autocomplete
- ✅ Analytics event tracking
- ✅ Performance charts (Recharts)
- ✅ Product specifications accordion

---

## 📊 **Performance**

- ✅ **Lighthouse Score:** 95+ (Performance, Accessibility, Best Practices, SEO)
- ✅ **First Load:** < 3s
- ✅ **Image Optimization:** WebP/AVIF with responsive sizes
- ✅ **Code Splitting:** Dynamic imports for optimal bundle size
- ✅ **Self-Hosted Fonts:** Zero external font requests

---

## 🔒 **Security**

- ✅ **Security Headers** - HSTS, X-Frame-Options, CSP, etc.
- ✅ **Input Validation** - Zod schemas
- ✅ **XSS Protection** - Sanitized inputs
- ✅ **CSRF Protection** - Token-based
- ✅ **Content Security Policy** - Configured in next.config.mjs

---

## 🎯 **Keyboard Shortcuts**

- `⌘K` or `Ctrl+K` - Open global search
- `Esc` - Close modals/dialogs
- `↑` `↓` - Navigate search results
- `Enter` - Select search result

---

## 📚 **API Integration**

Frontend connects to Terra Industries Backend API:

**Endpoints Used:**
- `GET /api/v1/news` - News articles
- `GET /api/v1/product-specs` - Product specifications
- `GET /api/v1/search/global` - Global search
- `POST /api/v1/auth/login` - Authentication
- `POST /api/v1/inquiries` - Contact form submission

**Backend Repository:** https://github.com/Atlas00000/terra_server

---

## 🛠️ **Development Commands**

```bash
pnpm dev              # Start development server (port 3000)
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix linting errors
pnpm type-check       # Check TypeScript types
pnpm test             # Run tests
pnpm test:coverage    # Generate coverage report
```

---

## 🔧 **Configuration Files**

- `next.config.mjs` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `vitest.config.mts` - Vitest test configuration
- `vercel.json` - Vercel deployment configuration (optional)
- `.env.example` - Environment variables template

---

## 📦 **Dependencies Highlights**

**Core:**
- Next.js 16 (App Router)
- React 19
- TypeScript 5

**UI:**
- Tailwind CSS v4
- Radix UI primitives
- shadcn/ui components
- Lucide React icons

**Data:**
- TanStack Query (React Query)
- Axios
- Zod validation

**Visualization:**
- Recharts (charts)
- Three.js (3D)
- Framer Motion (animations)

---

## 🌐 **Browser Support**

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

---

## 🤝 **Contributing**

1. Create feature branch
2. Make changes
3. Write tests
4. Run `pnpm lint` and `pnpm type-check`
5. Run `pnpm test`
6. Create pull request

---

## 📄 **License**

MIT License - Terra Industries

---

## 📞 **Links**

- **GitHub:** https://github.com/Atlas00000/terra_client
- **Backend:** https://github.com/Atlas00000/terra_server
- **Vercel:** https://vercel.com
- **Railway:** https://railway.app

---

<div align="center">

**Terra Industries Frontend**  
**Production-Ready | Fully Tested | Vercel-Optimized**

Made with ❤️ using Next.js 16

[⬆ Back to Top](#-terra-industries-frontend)

</div>

