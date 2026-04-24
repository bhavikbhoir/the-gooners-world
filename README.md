# The Gooners World

Your home for all things Arsenal F.C. ❤️

**Live:** https://the-gooners-world.web.app

## Tech Stack
- React 18 + Vite
- React-Bootstrap
- Firebase Hosting
- Backend: AWS Lambda proxy ([the-gooners-world-api](https://github.com/bhavikbhoir/the-gooners-world-api))

## Data Sources
- **Fixtures & Standings:** football-data.org API
- **News:** NewsData.io API
- **Analytics:** Google Tag Manager

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

## Pages
- `/` — Home (ticker, fixtures, news, social)
- `/MatchCenter` — Live fixtures + Premier League table
- `/NewsCenter` — Full Arsenal news feed
- `/About` — About & contact
