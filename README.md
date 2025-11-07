# 🌐 Terra Industries - Frontend

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Modern defense technology showcase platform built with Next.js 14**

[🌐 Live Site](https://terra-industriess.vercel.app) • [📚 Documentation](./DEPLOYMENT.md) • [📝 Changelog](./CHANGELOG.md)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Key Features](#-key-features)
- [Deployment](#-deployment)
- [Development](#-development)

---

## 🎯 Overview

Terra Industries Frontend is a modern, responsive web application showcasing advanced defense technology products. Built with Next.js 14 and TypeScript, it provides an immersive user experience across all devices.

**Live Site:** https://terra-industriess.vercel.app  
**Backend API:** https://terraserver-production.up.railway.app  
**Deployment:** Vercel  

---

## ✨ Features

### 🎨 User Interface
- **Modern Design:** Clean, professional aesthetic with smooth animations
- **Responsive:** Optimized for desktop, tablet, and mobile devices
- **Dark Mode:** Full dark mode support
- **Accessibility:** WCAG 2.1 compliant components
- **Performance:** Lighthouse score 95+

### 🚀 Product Showcase
- **Artemis UAV:** Reconnaissance drone specifications
- **Archer UAV:** Advanced tactical drone
- **Iroko APC:** Armored personnel carrier
- **Duma IFV:** Infantry fighting vehicle
- **Kallon MRAP:** Mine-resistant vehicle
- Dynamic product pages with technical specs
- Image galleries and 3D visualizations
- Performance metrics and capabilities

### 🔍 Search & Discovery
- **Global Search:** Search products, news (desktop)
- **Keyboard Shortcuts:** ⌘K to open search
- **Real-time Results:** Instant search feedback
- **Smart Filtering:** Category and date filters

### 📰 Content Management
- **News Section:** Latest updates and announcements
- **Dynamic Routing:** SEO-friendly URLs
- **Category Filtering:** Organized content
- **View Tracking:** Analytics integration

### 👨‍💼 Admin Dashboard
- **Analytics:** Real-time metrics and insights
- **Content Management:** News and product editing
- **Inquiry Management:** Lead tracking and scoring
- **Media Library:** Asset management
- **User Management:** Access control

### 📱 Mobile Experience
- **Touch Optimized:** Smooth gestures and interactions
- **Fast Loading:** 3-second max loading time
- **Adaptive Layout:** Mobile-first design
- **Progressive Web App:** Installable on mobile

---

## 🛠️ Tech Stack

### Core Framework
- **Next.js 14** - App Router, Server Components
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling

### UI & Animation
- **Framer Motion** - Smooth animations
- **Radix UI** - Accessible components
- **Lucide Icons** - Icon library
- **Shadcn/ui** - Component system

### Data & State
- **React Query** - Server state management
- **Zustand** - Client state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **pnpm** (recommended) or npm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Atlas00000/terra_client.git
cd terra_client
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

4. **Run development server**
```bash
pnpm dev
```

5. **Open your browser**
```
http://localhost:3000
```

---

## 📁 Project Structure

```
client/
├── app/                        # Next.js App Router
│   ├── (public)/              # Public pages
│   │   ├── artemis/          # Product page
│   │   ├── archer/           # Product page
│   │   ├── company/          # Company info
│   │   └── page.tsx          # Homepage
│   ├── admin/                # Admin dashboard
│   │   ├── dashboard/        # Analytics
│   │   ├── news/            # News management
│   │   ├── inquiries/       # Lead management
│   │   └── login/           # Auth page
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/               # React components
│   ├── ui/                  # Base UI components
│   ├── search/              # Search components
│   ├── admin/               # Admin components
│   ├── header.tsx           # Desktop header
│   └── mobile-header.tsx    # Mobile header
├── lib/                     # Utilities
│   ├── api-client.ts        # API wrapper
│   ├── utils.ts             # Helpers
│   └── fallback-data/       # Static data
├── hooks/                   # Custom hooks
│   ├── use-auth.ts          # Authentication
│   ├── use-search.ts        # Search logic
│   └── use-mobile.ts        # Mobile detection
├── types/                   # TypeScript types
│   └── api.ts               # API types
├── public/                  # Static assets
│   ├── images/              # Images
│   └── terra-logo.png       # Logo
├── .env.local              # Environment vars
├── next.config.js          # Next.js config
├── tailwind.config.ts      # Tailwind config
└── package.json
```

---

## 🎯 Key Features

### Product Pages

Each product has a dedicated showcase page:

```typescript
// Example: /app/artemis/page.tsx
export default function ArtemisPage() {
  return (
    <>
      <ArtemisHeroSection />
      <ArtemisCapabilitiesSection />
      <ArtemisSpecificationsSection />
      <ArtemisApplicationsSection />
    </>
  );
}
```

### Global Search (Desktop)

```typescript
// Keyboard shortcut
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  };
  window.addEventListener('keydown', handleKeyDown);
}, []);
```

### Admin Authentication

```typescript
// Protected routes
export default function AdminLayout({ children }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <LoadingSpinner />;
  if (!user) redirect('/admin/login');
  
  return <>{children}</>;
}
```

### API Integration

```typescript
// lib/api-client.ts
export const apiClient = {
  get: async (url: string) => {
    const response = await fetch(`${API_URL}${url}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    return response.json();
  }
};
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Go to Vercel Dashboard
   - Import `terra_client` repository
   - Configure build settings

2. **Environment Variables**
   ```env
   NEXT_PUBLIC_API_URL=https://terraserver-production.up.railway.app/api/v1
   ```

3. **Deploy**
   - Push to `main` branch
   - Automatic deployment starts
   - Live in 2-3 minutes

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 💻 Development

### Available Scripts

```bash
# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Type checking
pnpm type-check

# Linting
pnpm lint
```

### Adding New Features

1. **Create Component**
```typescript
// components/my-component.tsx
export function MyComponent() {
  return <div>Hello</div>;
}
```

2. **Add Page**
```typescript
// app/new-page/page.tsx
export default function NewPage() {
  return <MyComponent />;
}
```

3. **Test Locally**
```bash
pnpm dev
# Visit http://localhost:3000/new-page
```

### Code Standards

- Use TypeScript for type safety
- Follow ESLint rules
- Use Tailwind for styling
- Keep components small and focused
- Write meaningful commit messages

---

## 🎨 Design System

### Colors

```typescript
// Primary colors
primary: 'hsl(211, 70%, 56%)'        // Terra Blue
secondary: 'hsl(210, 40%, 35%)'      // Steel Blue
accent: 'hsl(210, 60%, 45%)'         // Ocean Blue
```

### Typography

```typescript
// Font families
display: 'Montserrat, sans-serif'    // Headings
body: 'Inter, sans-serif'            // Body text
mono: 'Fira Code, monospace'        // Code
```

### Spacing

Following Tailwind's spacing scale:
- `space-4`: 1rem (16px)
- `space-8`: 2rem (32px)
- `space-12`: 3rem (48px)

---

## 📱 Responsive Design

### Breakpoints

```typescript
sm: '640px'   // Mobile landscape
md: '768px'   // Tablet
lg: '1024px'  // Desktop
xl: '1280px'  // Large desktop
```

### Mobile-First Approach

```tsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

---

## 🔒 Security

- **XSS Protection:** Content sanitization
- **CSRF:** SameSite cookies
- **Secure Headers:** Next.js security headers
- **API Authentication:** JWT tokens
- **Input Validation:** Zod schemas

---

## ⚡ Performance

### Optimization Techniques

- **Image Optimization:** Next.js Image component
- **Code Splitting:** Automatic route-based splitting
- **Lazy Loading:** Dynamic imports for heavy components
- **Static Generation:** Pre-rendered pages
- **Font Optimization:** Next.js font optimization

### Performance Metrics

- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Cumulative Layout Shift:** < 0.1
- **Lighthouse Score:** 95+

---

## 🤝 Contributing

This is a private repository. For internal contributions:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

## 📝 License

© 2025 Terra Industries. All rights reserved.

---

<div align="center">

**Built with ❤️ for Terra Industries**

[🌐 Live Site](https://terra-industriess.vercel.app) • [📚 Docs](./DEPLOYMENT.md) • [📝 Changelog](./CHANGELOG.md)

</div>
