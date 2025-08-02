# 🚀 Tier-Based Event Showcase

A responsive and elegant Next.js 14 web app that displays events based on a user's tier. Built with Clerk.dev for authentication, Supabase for data, and styled using Tailwind CSS.

---

## 📊 Tech Stack

- **Frontend:** Next.js 14 (App Router)
- **Auth:** Clerk.dev
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS

---

## 📋 Features

- 🔐 Clerk authentication (Sign Up / Sign In)
- 🎟️ Tier-based event filtering (Free, Silver, Gold, Platinum)
- 🖼️ Clean, responsive UI with Tailwind CSS
- ⚙️ Supabase PostgreSQL backend with event data
- ⏫ Simulated tier upgrades via button
- 🧠 Loading states, error handling, and tier restriction messaging

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/punithkumar-ms/tier-event-showcase.git
cd tier-event-showcase

2. Install dependencies

npm install


3. Create .env.local

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key


4. Run the development server

npm run dev

Visit: http://localhost:3000

🔐 Demo Credentials

Tier	      Email	                      Password
Free	      free@demo.com	              demo123
Silver	      silver@demo.com	          demo123
Gold	      gold@demo.com	              demo123
Platinum	  platinum@demo.com	          demo123

✨ we can simulate a tier upgrade within the app using the tier buttons in the header.

🧾 Supabase Schema
Table: events

Column	         Type
id	             UUID
title	         Text
description	     Text
event_date	     Timestamp
image_url	     Text
tier	         Enum ('free', 'silver', 'gold', 'platinum')

Seeded with at least 6 events (2 per tier)

🖥️ Live Deployment

🌐 https://tier-based-event-showcase-cyan.vercel.app



📁 GitHub Repository : https://github.com/punithkumar-ms/tier-based-event-showcase