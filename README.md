# CalSnap AI 🥗

AI-powered food calorie tracker. Snap a photo, get instant nutrition analysis.

## Setup & Deploy

### 1. Clone & Install
```bash
npm install
```

### 2. Add your API key
Create `.env.local` in the root:
```
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```

### 3. Run locally
```bash
npm run dev
# → http://localhost:3000
```

### 4. Deploy to Vercel (free)

**Option A — Vercel CLI:**
```bash
npm install -g vercel
vercel
# Follow prompts, add ANTHROPIC_API_KEY as environment variable
```

**Option B — GitHub + Vercel Dashboard:**
1. Push to GitHub: `git init && git add . && git commit -m "init" && git remote add origin YOUR_REPO && git push`
2. Go to vercel.com → New Project → Import your repo
3. Add environment variable: `ANTHROPIC_API_KEY` = your key
4. Deploy → done!

### 5. PWA Install (phone)
After deploying, open the URL on your phone:
- **iPhone:** Safari → Share → "Add to Home Screen"
- **Android:** Chrome → menu → "Add to Home Screen"

The app will work like a native app — full screen, no browser bar.

## Features
- 📸 Food photo analysis (Claude Vision AI)
- 📊 Daily calorie + macro tracking
- 🎯 Customizable goals
- 📋 Full meal history
- 🌍 15 languages
- 📱 PWA — installable on iPhone & Android

## Stack
- Next.js 14 (App Router)
- React 18
- Vercel (hosting)
- Anthropic Claude API (vision)
