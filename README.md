# RashTrips — Book Your Next Flight, Bus or Train ✈️🚌🚆

[![Render Deploy](https://img.shields.io/badge/Deploy%20to-Render-46E3B7?logo=render&logoColor=white)](https://dashboard.render.com/)
[![Firebase](https://img.shields.io/badge/Database-Firebase%20Firestore-FFA611?logo=firebase&logoColor=white)](https://firebase.google.com/)
[![React](https://img.shields.io/badge/Frontend-React%2019-61DAFB?logo=react&logoColor=black)](https://react.dev/)

An ultra-modern, interactive **3D Animated Bus Reservation Platform tailored for Indian Highways**, built with **React**, **Three.js**, **Vite**, **Firebase Cloud Firestore**, and custom **Glassmorphism CSS Design System**.

---

## 🇮🇳 Tailored for Indian Bus Travel

- **Default Currency**: Indian Rupee (**₹ INR**) with authentic fares (₹750 to ₹1,850).
- **Major Indian Intercity Routes**:
  - Bengaluru ⇄ Hyderabad (NH 44 corridor)
  - Mumbai ⇄ Goa (Coastal Highway)
  - Delhi ⇄ Manali / Jaipur / Agra
  - Pune ⇄ Mumbai (Mumbai-Pune Expressway)
  - Chennai ⇄ Bengaluru
  - Ahmedabad ⇄ Mumbai
- **Top Indian Bus Operators & Fleets**:
  - **VRL Travels Multi-Axle I-Shift** (Volvo B11R AC Sleeper 2+1)
  - **IntrCity SmartBus Lounge** (Mercedes-Benz Luxury Multi-Axle with passenger boarding lounge access)
  - **Zingbus Electric Superfast** (Zero-emission green highway coach)
  - **Orange Tours & Travels** (BharatBenz Glider AC Sleeper)
  - **KSRTC Airavat Club Class** (Govt. Guaranteed Punctuality Volvo 9600s)
- **Authentic Indian Boarding & Dropping Points**:
  - Bengaluru: *Majestic (KBS) Anand Rao Circle*, *Madiwala Silk Board Junction*, *Hebbal Outer Ring Road*
  - Hyderabad: *Ameerpet Metro Interchange*, *Gachibowli Outer Ring Road*, *Secunderabad Station*, *Lakdikapul*
  - Mumbai: *Dadar TT Circle*, *Borivali West*, *Vashi Toll Plaza*
  - Pune: *Wakad Hinjewadi Bridge*, *Swargate Bus Stand*
  - Delhi: *Kashmiri Gate ISBT*, *Dhaula Kuan Metro*
- **Indian Payment Methods**:
  - **UPI (Instant)**: Google Pay, PhonePe, Paytm, BHIM UPI with live scannable QR code & VPA ID support.
  - **RuPay & Debit/Credit Cards**: RBI 2FA Verified Secure Gateway.
  - **Net Banking**: HDFC, State Bank of India (SBI), ICICI, Axis, Kotak Mahindra Bank.
  - **Promo Codes**: `INDIA15` (15% off), `FIRSTBUS` (₹150 off), `VOLVO100` (₹100 off).
  - **GST Breakdown**: 5% standard GST on bus transport.

---

## 🌌 3D Animated Landing Page (Powered by Three.js)

- **Interactive 3D Night Express Highway**:
  - Continuous animated road markers simulating 80 km/h cruising speed.
  - Dual glowing neon highway guard rails (Cyan on left, Amber on right).
  - Atmospheric depth fog and twinkling particle night starfield.
- **Detailed 3D Multi-Axle Luxury Coach**:
  - Aerodynamic chassis with metallic royal navy coat and saffron accent strip.
  - Dual high-beam LED projector headlights casting real illuminated light cones onto the highway surface.
  - Warm glowing amber passenger sleeper cabin windows.
  - Vibrant neon underglow lighting up the asphalt.
  - 6 realistic rotating wheels (Indian 2-front, 4-rear Multi-Axle layout) with alloy rims and rubber tires.
  - Realistic suspension bounce and gentle road sway.
- **True 360-Degree Interactive Rotation (Inside & Outside)**:
  - 🔄 **360° Inside Cabin (Sleeper)**: Full 360-degree panoramic first-person look-around! Click and drag anywhere to look all the way around inside: turn 180° behind to see the rear berths & emergency exit, turn left to watch the highway through the panoramic window, look right across the illuminated carpeted aisle, look up at the ambient starry sky roof, and down at the memory foam bed!
  - 🌐 **360° Exterior Orbital Drag**: Click and drag to orbit 360 degrees horizontally and vertically around the exterior of the luxury coach.
  - 🔍 **Mouse Wheel Zoom**: Zoom in to inspect the chrome alloy wheels and projector headlights or zoom out for a wide highway view.
  - 🌀 **360° Auto-Spin Toggle**: Switch on continuous smooth cinematic 360° rotation with a single click.
  - 🎥 **Quick Camera Presets**: *360° Inside Cabin*, *Cinematic 3/4*, *Chaser Cam*, *Side Cruiser*, and *Highway Front*.
- **3D Floating Telemetry & Cabin HUD**:
  - Real-time highway speed telemetry (80 km/h) in exterior mode.
  - Berth #L4, 21.5°C auto AC climate, and 5G WiFi indicator in interior mode.

---

## 📻 90s Bollywood Highway Radio (सफ़र के सदाबहार नगमे)

- **Landing Page Songs Section**:
  - Search Hindi 90s songs in real-time by title, singer (Kumar Sanu, Alka Yagnik, Udit Narayan, Sonu Nigam), movie (*DDLJ*, *Dil Se*, *Aashiqui*, *Mohra*, *Baazigar*), or composer (*Jatin-Lalit*, *A.R. Rahman*, *Nadeem-Shravan*).
  - Mood Filter Chips: *Romantic*, *Highway Beats*, *Soulful*, *Nostalgia*, *Rain Melodies*.
  - Cassette tape & spinning vinyl aesthetic with live equalizer bars.
- **Continuous Background Playback (Never Stops)**:
  - **Does NOT stop** when switching 3D bus camera angles (Exterior 360°, Inside Cabin 360°, Chaser, etc.).
  - **Does NOT stop** when selecting seats, opening checkout modals, or navigating to My Bookings and Live Radar!
  - **Global Persistent Music Bar**: Floating glassmorphic dock with track info, spinning vinyl disc, play/pause, next/previous tracks, timeline scrub bar, live audio spectrum visualizer, and volume control with mute toggle.
- **Synthesized Melodic Audio Engine**:
  - Powered by the Web Audio API with harmonium/synth-flute lead, analog bass accompaniment, and live frequency analysis.

---

## 💺 Complete Booking & Management Flow

1. **Interactive Multi-Deck Seat Layout**: Lower Deck & Upper Deck sleeper berths, seater chairs, and female-reserved berths with pink indicators.
2. **Dynamic Live GPS Radar**: Track active coaches on NH-44 with waypoint milestones (Kurnool Toll, Jadcherla Food Plaza), NavIC GPS telemetry, and driver credentials (Captain R. Murugesan).
3. **Confirmed E-Ticket / Boarding Pass**:
   - Unique Indian PNR: `IND-OB-XXXXXX-EXP`.
   - Real-time scannable QR code with encoded manifest.
   - Dedicated print-ready layout (`window.print()`).
4. **"My Bookings" with LocalStorage**: Saved locally across browser sessions with instant cancellation & refund processing.
5. **Fleet Operator Portal**: Track gross INR ticket revenue, add custom interstate routes, and view AIS-140 GPS status.

---

## 🚀 How to Run Locally

### Start Development Server:
```powershell
npm run dev
```
Open your browser and navigate to: **`http://localhost:5173/`**

### Build Production Bundle:
```powershell
npm run build
```

---

## 🌐 Deploy to Render (Free Static Site Hosting)

This repository includes a [`render.yaml`](file:///c:/Users/HP/Desktop/bus-ticketing/render.yaml) blueprint ready for zero-configuration static deployment on Render.

### Quick Setup on Render:
1. Push this repository to your GitHub account: `https://github.com/RashidBhat-code/bus`
2. Log in to [Render](https://dashboard.render.com/) and click **New +** > **Static Site**.
3. Select your repository **bus**.
4. Configure with:
   - **Name**: `omnibus-india-express`
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. Under **Advanced** > **Redirects / Rewrites**:
   - **Type**: `Rewrite`
   - **Source**: `/*`
   - **Destination**: `/index.html`
6. Click **Create Static Site** — your live site will be deployed and assigned a free `*.onrender.com` SSL domain!

