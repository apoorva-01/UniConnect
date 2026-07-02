# uniconnect-campus-platform

A campus platform that combines student profiles, a swipe-to-connect way to find
people, and a live IoT environment dashboard — built with Next.js, Material UI,
and MongoDB.

## Features

- **Student profiles** — bio cards and interests for each user.
- **Swipe to connect** — a Tinder-style card deck (`react-tinder-card`) for
  discovering and matching with other students.
- **Live IoT dashboard** — real-time temperature and humidity gauges fed from
  LoRaWAN sensors via [ChirpStack](https://www.chirpstack.io/), plus charts.
- **Auth** — JWT-based login with hashed passwords (`jsonwebtoken` + `bcryptjs`).
- **Notifications and a responsive dashboard layout.**

## Tech stack

| Layer | Tools |
|-------|-------|
| Framework | Next.js, React |
| UI | Material UI (MUI), Emotion, styled-components |
| Data | MongoDB + Mongoose |
| Auth | JWT, bcryptjs |
| Charts | Chart.js, Recharts, react-gauge-capacity |
| IoT | ChirpStack (LoRaWAN) |

## Getting started

```bash
git clone https://github.com/apoorva-01/uniconnect-campus-platform.git
cd uniconnect-campus-platform
npm install
```

Copy the env template and fill in your own values:

```bash
cp .env.example .env.local
```

| Variable | What it is |
|----------|-----------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for signing auth tokens |
| `NEXT_PUBLIC_DEV_URL` | App base URL |
| `NEXT_PUBLIC_Chart_API_Python_Link` | Endpoint serving chart data |
| `NEXT_PUBLIC_CHIRPSTACK_URL` / `NEXT_PUBLIC_CHIRPSTACK_API_KEY_SECRET` | ChirpStack API access |
| `NEXT_PUBLIC_CHIRPSTACK_APPLICATION_ID` / `NEXT_PUBLIC_CHIRPSTACK_ORGANISATION_ID` | ChirpStack IDs |

> Never commit `.env` or `.env.local`. Only `.env.example` (keys, no values)
> belongs in the repo.

Run it:

```bash
npm run dev
```

## License

MIT © Apoorva Verma