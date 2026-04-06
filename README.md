# Meal Plan Proxy — Deploy Instructions

## Deploy to Render (free, recommended)

1. Push this folder to a GitHub repo
2. Go to https://render.com → New → Web Service
3. Connect your repo
4. Settings:
   - Build command: `npm install`
   - Start command: `node server.js`
5. Add environment variable:
   - Key: `ANTHROPIC_API_KEY`
   - Value: your Anthropic API key (from https://console.anthropic.com)
6. Deploy → you get a URL like `https://mealplan-proxy.onrender.com`
7. Open `public/index.html`, replace `YOUR_BACKEND_URL` with that URL
8. Re-deploy or just open index.html directly — it now works!

## Local testing

```bash
npm install
ANTHROPIC_API_KEY=sk-ant-... node server.js
```

Then open http://localhost:3000
