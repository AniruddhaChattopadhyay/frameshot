# 📸 FrameShot

Beautiful browser screenshots in seconds. Capture any website with a sleek macOS-style browser mockup.

![FrameShot](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- 🖼️ **Browser Mockup** - Beautiful macOS-style window frame
- 📐 **Custom Dimensions** - Choose from presets or set your own
- 📱 **Device Presets** - Desktop, tablet, mobile, and social media sizes
- 🎨 **Aspect Ratios** - Quick aspect ratio adjustments
- ⬇️ **Easy Download** - One-click PNG download
- ⚡ **Fast** - Powered by Puppeteer for reliable captures

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/AniruddhaChattopadhyay/frameshot.git
cd frameshot

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📐 Available Presets

### Desktop
- Desktop HD (1920×1080)
- Desktop (1440×900)
- Laptop (1366×768)

### Tablet
- Tablet Portrait (768×1024)
- Tablet Landscape (1024×768)

### Mobile
- iPhone 14 Pro (393×852)
- iPhone SE (375×667)
- Android (412×915)

### Social Media
- Twitter Post (1200×675)
- Instagram Post (1080×1080)
- LinkedIn Post (1200×627)
- OG Image (1200×630)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Screenshots**: Puppeteer
- **Deployment**: Vercel-ready

## 📝 API

### POST `/api/screenshot`

Captures a screenshot of the specified URL.

**Request Body:**
```json
{
  "url": "https://example.com",
  "width": 1440,
  "height": 900
}
```

**Response:**
```json
{
  "screenshot": "data:image/png;base64,..."
}
```

## 🚢 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AniruddhaChattopadhyay/frameshot)

**Note:** For Vercel deployment, you may need to use `@sparticuz/chromium` instead of the full Puppeteer for serverless compatibility.

### Self-hosted

```bash
npm run build
npm start
```

## 📄 License

MIT © [Ani](https://github.com/AniruddhaChattopadhyay)

---

Built with ❤️ and ☕
