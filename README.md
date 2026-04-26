# The Gooners World

Your home for all things Arsenal F.C. ❤️

**Live:** https://the-gooners-world.web.app

## Features

### Home
- **Live News Ticker** — scrolling Arsenal headlines
- **Live Match Score** — real-time score banner during active matches
- **Match Countdown** — live countdown timer to next Arsenal match
- **Match Prediction** — AI-generated pre-match prediction (AWS Bedrock / Amazon Nova Micro)
- **Fixtures & Results** — last 2 results + next 2 upcoming with AI match summaries
- **Latest News** — top 5 news cards with share buttons (Twitter/X, WhatsApp, copy link)
- **Social Links** — Twitter/X and Instagram

### Match Center (Tabbed)
- **Fixtures** — upcoming + recent results across all competitions with venue & referee
- **Premier League** — full standings table (Arsenal highlighted) + PL top scorers
- **Champions League** — UCL season stats, upcoming fixtures, results grouped by stage (SF → QF → R16 → League Stage)

### News Center
- **Full News Feed** — deduplicated Arsenal articles with image fallbacks
- **Search & Filter** — filter by keyword or source
- **Share Buttons** — Twitter/X, WhatsApp, copy link
- **Read Full Article** — links to original source

### Squad
- **Full Arsenal Squad** — grouped by Goalkeepers, Defenders, Midfielders, Forwards
- **Player Details** — name, position, nationality, age

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

| Data | Client (localStorage) | Server (Cache-Control) |
|---|---|---|
| Matches | 15 min | 15 min |
| Standings | 30 min | 15 min |
| CL Matches | 15 min | 15 min |
| Top Scorers | 30 min | 30 min |
| Squad | 24 hours | 24 hours |
| News | 30 min | 30 min |
| AI Predictions | 1 hour | 1 hour |
| AI Summaries | 24 hours | 24 hours |
| Live Score | No cache (single poll, stops if no live match) | 30 sec |

## Security
- API keys in AWS SSM Parameter Store (never in production client bundle)
- API Gateway: API key + rate limiting (500 req/day, 5 req/sec)
- Lambda: Origin header validation
- Firebase: CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- `.env.local` gitignored

## Project Structure

```
├── src/
│   ├── api/
│   │   ├── football.js         # Matches, standings, scorers, CL, squad, live
│   │   ├── news.js             # Arsenal news feed
│   │   └── ai.js               # AI predictions & summaries
│   ├── hooks/
│   │   └── useNews.js
│   ├── components/
│   │   ├── Home.jsx            # Home page
│   │   ├── Center.jsx          # Match Center (tabbed)
│   │   ├── Countdown.jsx       # Match countdown
│   │   ├── LiveScore.jsx       # Live score banner
│   │   ├── MatchPrediction.jsx # AI prediction card
│   │   ├── Fixtures.jsx        # Fixtures with AI summaries
│   │   ├── Standings.jsx       # PL table
│   │   ├── TopScorers.jsx      # PL top scorers
│   │   ├── CLStandings.jsx     # CL journey by stage
│   │   ├── SeasonStats.jsx     # Competition-scoped stats
│   │   ├── Squad.jsx           # Player squad
│   │   ├── NewsTicker.jsx      # Scrolling headlines
│   │   ├── ShareButtons.jsx    # Social share
│   │   ├── News/NewsFeed.jsx   # News cards with search
│   │   ├── styles.css          # Legacy styles
│   │   └── styles.scss         # Component styles (BEM)
│   └── App.jsx
├── index.html
├── vite.config.js
├── firebase.json
└── package.json
```

## Local Development

```bash
npm install
npm start
```

## Deploy

```bash
npm run build
firebase deploy
```

## Routes

| Route | Description |
|---|---|
| `/` | Home |
| `/MatchCenter` | Tabbed: Fixtures, Premier League, Champions League |
| `/NewsCenter` | News feed with search |
| `/Squad` | Arsenal squad |
| `/About` | About & contact |

## Author

**Bhavik Bhoir** — Full Stack Developer
- GitHub: [@bhavikbhoir](https://github.com/bhavikbhoir)
- LinkedIn: [bhavikbhoir](https://www.linkedin.com/in/bhavikbhoir/)
