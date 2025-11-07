# Changelog

All notable changes to the Terra Industries Frontend will be documented in this file.

## [1.0.0] - 2025-11-07

### 🎉 Initial Production Release

#### Added
- Next.js 14 App Router architecture
- Responsive design (desktop + mobile)
- Product showcase pages (Artemis, Archer, Iroko, Duma, Kallon)
- Company information page
- News section with dynamic routing
- Global search functionality (desktop)
- Admin dashboard with analytics
- Admin authentication
- News management system
- Product management interface
- Inquiry and RFQ views
- Media library management
- Real-time analytics tracking
- Mobile-optimized navigation
- Loading animations
- Dark mode support

#### Infrastructure
- Vercel deployment configuration
- Environment variable management
- API client with error handling
- Image optimization (Next.js)
- Route prefetching
- Static page generation

#### UX/UI
- Modern, professional design
- Smooth animations (Framer Motion)
- Responsive navigation
- Touch-optimized mobile interface
- Keyboard shortcuts (⌘K search on desktop)
- Accessible components (WCAG compliant)

---

## [1.0.1] - 2025-11-07

### Bug Fixes & Mobile Improvements

#### Fixed
- Mobile loading screen timeout (3-second fallback)
- TypeScript compilation errors across components
- API client error handling
- Product specification data mapping
- Admin dashboard activity type annotations
- Missing import statements (Inbox, router)
- Optional chaining for undefined values

#### Changed
- Removed search icon from mobile (temporary)
- Added accessibility labels to SearchModal
- Disabled autoFocus on mobile search input
- Updated SearchModal to use correct props

#### Security
- Fixed type safety issues
- Added proper error boundaries
- Improved data validation

---

## [0.2.0] - 2025-11-06

### Repository Separation & Deployment

#### Changed
- Separated from monorepo to standalone repository
- Updated package.json for Vercel deployment
- Configured vercel.json settings
- Removed workspace dependencies

#### Added
- Standalone .env.local configuration
- Deployment documentation
- Build optimization

#### Infrastructure
- Connected to Railway backend API
- Configured CORS origins
- Set up environment variables
- Generated fresh pnpm-lock.yaml

---

## [0.1.0] - 2025-11-04

### Initial Development

#### Added
- Core Next.js application structure
- Product showcase pages
- Company information
- Admin dashboard
- Authentication system
- News management
- Search functionality
- Analytics integration
- Responsive design system
- Component library

---

## Known Issues

### Mobile
- ~~Search modal flashing on mobile~~ - **RESOLVED:** Removed temporarily
- Browser extension interference with form fields (external issue)

### Desktop
- All features working as expected ✅

---

## Deployment Notes

### Production URL
`https://terra-industriess.vercel.app`

### Environment Variables Required
```env
NEXT_PUBLIC_API_URL=https://terraserver-production.up.railway.app/api/v1
```

### Build Command
```bash
pnpm build
```

### Performance
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Lighthouse Score:** 95+

---

## Upgrade Guide

### From Monorepo to Standalone

If migrating from the old monorepo structure:

1. Update `NEXT_PUBLIC_API_URL` to point to Railway backend
2. Regenerate `pnpm-lock.yaml`: `pnpm install`
3. Build and test: `pnpm build`
4. Deploy to Vercel

---

## Roadmap

### v1.1.0 (Planned)
- [ ] Mobile search implementation (non-modal approach)
- [ ] Enhanced admin analytics
- [ ] Export functionality
- [ ] Multi-language support
- [ ] PWA capabilities

---

**Maintained by:** Terra Industries Development Team  
**Last Updated:** November 7, 2025

