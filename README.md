# Kishan Munjpara - Portfolio

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. This portfolio showcases my work as a Machine Learning Engineer, featuring projects, research, certifications, and professional experience.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Performance Optimized**: 90+ Lighthouse scores, lazy loading, image optimization
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation
- **SEO Optimized**: Meta tags, Open Graph, structured data, sitemap
- **Interactive Components**: Smooth animations with Framer Motion
- **Form Handling**: Contact form with validation using React Hook Form + Zod
- **Testing**: Comprehensive test suite with Jest, React Testing Library, and Playwright

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI + Custom components
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form + Zod validation
- **Testing**: Jest + React Testing Library + Playwright
- **Code Quality**: ESLint + Prettier + Husky
- **Deployment**: Optimized for static export

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   ├── sitemap.ts         # Sitemap generation
│   └── robots.ts          # Robots.txt
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   └── ScrollToTop.tsx
│   └── ui/               # UI components
│       ├── Button.tsx
│       ├── Modal.tsx
│       ├── Card.tsx
│       ├── Carousel.tsx
│       ├── Tabs.tsx
│       ├── Timeline.tsx
│       └── Pagination.tsx
├── sections/              # Page sections
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── QualificationSection.tsx
│   ├── PortfolioSection.tsx
│   ├── ResearchSection.tsx
│   ├── CertificateSection.tsx
│   ├── GoalsSection.tsx
│   └── ContactSection.tsx
├── data/                  # Content data
│   ├── personal.ts
│   ├── experience.ts
│   ├── projects.ts
│   ├── research.ts
│   ├── certifications.ts
│   ├── goals.ts
│   └── navigation.ts
├── lib/                   # Utilities
│   ├── utils.ts
│   ├── constants.ts
│   └── validations.ts
└── types/                 # TypeScript types
    └── index.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KishanMunjpara/portfolio-nextjs.git
   cd portfolio-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run format:check # Check code formatting

# Testing
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run test:e2e     # Run e2e tests
npm run test:e2e:ui  # Run e2e tests with UI
```

## 🎨 Customization

### Content Updates

1. **Personal Information**: Update `src/data/personal.ts`
2. **Experience**: Modify `src/data/experience.ts`
3. **Projects**: Edit `src/data/projects.ts`
4. **Research**: Update `src/data/research.ts`
5. **Certifications**: Modify `src/data/certifications.ts`
6. **Goals**: Edit `src/data/goals.ts`

### Styling

- **Colors**: Update CSS variables in `src/app/globals.css`
- **Components**: Modify components in `src/components/`
- **Sections**: Update sections in `src/sections/`

### Images

- **Profile Images**: Replace images in `public/assets/images/`
- **Project Screenshots**: Update project images
- **Certificates**: Replace certificate images

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Test Coverage
```bash
npm run test:coverage
```

## 🚀 Deployment

### Static Export (Recommended)

1. **Build for static export**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages, Netlify, or Vercel**
   - The `out/` directory contains the static files
   - Upload to your hosting provider

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Deploy automatically** on every push to main branch

### Netlify

1. **Build command**: `npm run build`
2. **Publish directory**: `out`
3. **Deploy**

### GitHub Pages

1. **Enable GitHub Pages** in repository settings
2. **Use GitHub Actions** for automated deployment

## 📊 Performance

- **Lighthouse Score**: 90+ across all categories
- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **Bundle Size**: < 200KB initial JS bundle
- **Image Optimization**: WebP format with responsive sizes
- **Code Splitting**: Automatic route-based splitting

## ♿ Accessibility

- **WCAG 2.1 AA Compliant**
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Optimized for screen readers
- **Focus Management**: Proper focus indicators
- **ARIA Labels**: Comprehensive labeling

## 🔍 SEO

- **Meta Tags**: Comprehensive meta tag implementation
- **Open Graph**: Social media optimization
- **Structured Data**: JSON-LD implementation
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: kishan.students@gmail.com
- **LinkedIn**: [Kishan Munjpara](https://linkedin.com/in/KishanMunjpara)
- **GitHub**: [KishanMunjpara](https://github.com/KishanMunjpara)

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Headless UI** for accessible components
- **React Hook Form** for form handling
- **Zod** for schema validation

---

Made with ❤️ by [Kishan Munjpara](https://github.com/KishanMunjpara)