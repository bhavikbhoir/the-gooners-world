# The Gooners World

Your home for all things Arsenal F.C. ❤️

**Live:** https://the-gooners-world.web.app

## Features

### Home
- **Live News Ticker** — scrolling Arsenal headlines from NewsData.io
- **Live Match Score** — real-time score banner during active matches (30s polling)
- **Match Countdown** — live countdown timer to next Arsenal match
- **Match Prediction** — AI-generated pre-match prediction powered by AWS Bedrock (Amazon Nova Micro), weighs recent form by competition
- **Fixtures & Results** — last 2 results + next 2 upcoming matches with team crests
- **AI Match Summaries** — auto-generated post-match recaps with competition-aware context (no hallucinated details)
- **Latest News** — top 5 Arsenal news cards with images, descriptions, and share buttons
- **Social Links** — Twitter/X and Instagram follow cards

### Match Center
- **Live Score** — real-time score during active matches
- **Fixtures & Results** — upcoming matches + recent results in 2-column grid
- **AI Match Summaries** — contextual summaries on each finished match
- **Season Stats Dashboard** — wins, draws, losses, goals for/against, goal difference, win rate
- **Premier League Table** — full 20-team standings with Arsenal highlighted

### News Center
- **Full News Feed** — up to 20 deduplicated Arsenal articles
- **Search & Filter** — filter articles by keyword or source
- **Share Buttons** — share to Twitter/X, WhatsApp, or copy link
- **Image Fallbacks** — SVG placeholder for articles without images

### Squad
- **Full Arsenal Squad** — grouped by Goalkeepers, Defenders, Midfielders, Forwards
- **Player Details** — name, position, nationality, age
- **Live Data** — pulled from football-data.org, cached 24 hours

### About
- Data partners and contact information

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 5, React-Bootstrap, React Router v5 |
| Styling | SCSS (BEM naming), Bootstrap 4 |
| Hosting | Firebase Hosting |
| Backend | AWS Lambda (Node.js 22), API Gateway, Serverless Framework v3 |
| AI | AWS Bedrock (Amazon Nova Micro) |
| Football Data | football-data.org API (Premier League + Champions League) |
| News Data | NewsData.io API |
| Secrets | AWS SSM Parameter Store |
| CI/CD | GitHub Actions (auto-deploy backend on push to main) |
| Analytics | Google Tag Manager |

## Architecture

```
Browser → Firebase Hosting (React SPA)
            ↓
        API Gateway (API key + rate limiting)
            ↓
        AWS Lambda (3 proxy functions)
            ↓
    ┌───────┼───────────┐
    ↓       ↓           ↓
football  newsdata   AWS Bedrock
-data.org   .io     (Nova Micro)
```

## Caching Strategy

| Data | Client Cache (localStorage) | Server Cache (Cache-Control) |
|---|---|---|
| Matches | 15 min | 15 min |
| Standings | 30 min | 15 min |
| Squad | 24 hours | 24 hours |
| News | 30 min | 30 min |
| AI Predictions | 1 hour | 1 hour |
| AI Summaries | 24 hours | 24 hours |
| Live Score | No cache | 30 sec |

## Security
- API keys stored in AWS SSM Parameter Store (never in client bundle for production)
- API Gateway enforces API key + rate limiting (500 req/day, 5 req/sec)
- Lambda validates Origin header against allowed domain
- Firebase security headers (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
- Firebase config and API keys in `.env.local` (gitignored)
- All third-party calls proxied through Lambda in production

## Competition Coverage
- **Premier League** — full fixtures, results, standings
- **Champions League** — fixtures and results
- **FA Cup / Carabao Cup** — not available on free tier (football-data.org paid plan required)

## Project Structure

```
├── src/
│   ├── api/                    # API abstraction layers
│   │   ├── football.js         # Matches, standings, squad, live
│   │   ├── news.js             # Arsenal news feed
│   │   └── ai.js               # AI predictions & summaries
│   ├── hooks/
│   │   └── useNews.js          # News data hook
│   ├── components/
│   │   ├── Countdown.jsx       # Match countdown timer
│   │   ├── LiveScore.jsx       # Live match score banner
│   │   ├── MatchPrediction.jsx # AI match prediction
│   │   ├── Fixtures.jsx        # Fixtures & results with AI summaries
│   │   ├── Standings.jsx       # Premier League table
│   │   ├── SeasonStats.jsx     # Season stats dashboard
│   │   ├── Squad.jsx           # Player squad page
│   │   ├── NewsTicker.jsx      # Scrolling news ticker
│   │   ├── ShareButtons.jsx    # Social share buttons
│   │   ├── News/NewsFeed.jsx   # News cards with search
│   │   ├── styles.css          # Legacy styles
│   │   └── styles.scss         # Component styles (BEM)
│   └── App.jsx                 # Routes and layout
├── index.html                  # Entry point
├── vite.config.js              # Vite config with dev proxies
├── firebase.json               # Hosting config + security headers
└── package.json
```

## Local Development

```bash
npm install
npm start
# Runs on http://localhost:5174
# Vite proxy handles API calls + injects auth headers
```

## Deploy

```bash
npm run build
firebase deploy
```

## Pages

| Route | Description |
|---|---|
| `/` | Home — ticker, countdown, prediction, fixtures, news, social |
| `/MatchCenter` | Live scores, fixtures, season stats, league table |
| `/NewsCenter` | Full news feed with search and share |
| `/Squad` | Arsenal squad grouped by position |
| `/About` | About and contact |

## Author

**Bhavik Bhoir** — Full Stack Developer
- GitHub: [@bhavikbhoir](https://github.com/bhavikbhoir)
- LinkedIn: [bhavikbhoir](https://www.linkedin.com/in/bhavikbhoir/)
