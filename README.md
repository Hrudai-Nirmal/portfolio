# Hrudai Nirmal — Portfolio

A modern, scroll-interactive personal portfolio website built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

## Features

- 🎨 **Light & dark theme** with custom color palettes and smooth toggle transitions
- 📱 **Fully responsive** — optimized for mobile, tablet, and desktop
- ⚡ **Full-page scroll snap** — each section takes up the full viewport
- 🧩 **Modular sections** — Home (quote), About Me, My Work, Why Work With Me, Contact
- 🍔 **Smart navigation** — full header at top, collapses to dropdown button on scroll & mobile
- 🌐 **Contact icons** — LinkedIn, GitHub, Instagram, CV download, Email, Phone

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Customization

- **About text**: Edit `src/components/About.tsx` to update your bio.
- **Profile photo**: Replace the placeholder in `src/components/About.tsx` with your image.
- **Projects**: Update the `projects` array in `src/components/Projects.tsx`.
- **Why Work With Me**: Edit `src/components/WhyWorkWithMe.tsx` to adjust bullet points.
- **Contact links**: Update URLs in `src/components/Contact.tsx`.
- **CV download**: Upload your CV to `/public/` and update the href in `Contact.tsx`.
- **Quote**: Change the hero quote in `src/components/Hero.tsx`.
- **Colors**: Modify the palette in `src/app/globals.css` (`:root`, `.light`, `.dark`).

## Tech Stack

- [Next.js](https://nextjs.org/) — React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
