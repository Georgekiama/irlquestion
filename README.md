# IRL Terminology Quiz 📄 → 🖨️

A quiz application teaching legal print services terminology: from documents to impressions.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel (3 Easy Steps)

### Option 1: Deploy via Vercel Website (Easiest)

1. **Push to GitHub:**
   - Go to [GitHub](https://github.com) and create a new repository
   - In your terminal, run:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
     git push -u origin main
     ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy" (Vercel auto-detects Next.js!)

3. **Done!** Your quiz is live at `your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow prompts** and your site will be live!

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React** - UI components

## Features

- 20 questions across 4 sections
- Interactive quiz with instant feedback
- Score tracking and section breakdown
- Detailed explanations for each answer
- Responsive design for all devices
- Beautiful gradient UI

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/
│   └── TerminologyQuiz.tsx  # Main quiz component
├── styles/
│   └── globals.css      # Global styles
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind config
└── tsconfig.json        # TypeScript config
```

## License

MIT
