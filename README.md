# 🌌 CricZone Arena — Premium Sports & Turf Booking Web App

CricZone Arena is a state-of-the-art, premium single-turf box cricket and sports booking application. The user interface has been redesigned to reflect a dark-themed, cosmic, glassmorphic layout inspired by modern portfolio design trends.

## 🚀 Key Features

- **🌌 Twinkling Canvas Starfield**: The hero background features a dynamic HTML5 Canvas particle system that renders starry constellations and deep space purple gradients.
- **🧱 Bento Grid Showcase**: Displays turf facilities, location details, spectator galleries, and features in a 12-column masonry grid.
- **🔁 Service Marquee Slider**: An infinite horizontal auto-scrolling marquee showcasing premium turf amenities.
- **📅 Dynamic Slots Scheduler**: Users can select dates and choose hourly booking slots. Status displays update to "Booked" immediately upon reservation.
- **💾 Local-Storage & Supabase Persistence**: Bookings persist automatically in browser storage (`localStorage` fallback) or write directly to a Cloud Database (Supabase) if credentials are added.
- **💬 Direct Notifications**: Triggers formatted pre-filled reservation receipts which redirect to WhatsApp or launch direct phone calls.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [Supabase](https://supabase.com/) & Web LocalStorage

---

## 🏃‍♂️ How to Run Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Start the development server**:
   ```bash
   npm run dev
   ```
3. **Open the browser**:
   Navigate to `http://localhost:5173/`

---

## 🌐 How to Share Your Local Server (Without Deploying)

### Option A: Local Network Sharing (Same Wi-Fi)
If you want someone on the same network to view your page, expose the Vite host:
1. Run:
   ```bash
   npm run dev -- --host
   ```
2. Open the page using the private network IP:
   `http://10.49.14.250:5173/`

### Option B: Share Worldwide via a Public Tunnel (localtunnel)
To let external GitHub viewers access your local server from anywhere in the world, use a free secure tunnel:
1. Run:
   ```bash
   npx localtunnel --port 5173
   ```
2. It will generate a public URL (e.g. `https://XXXX.localthrust.me`). Anyone on the internet can click this link to view your live, running local website!
