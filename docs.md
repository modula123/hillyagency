# Hilly Agency - Multipurpose Tours and Travel Booking Platform

## 🗺️ Project Overview
**Hilly Agency** is a comprehensive, full-stack, multipurpose web platform that connects travelers and clients with trusted service providers offering:

- Guided tours
- Hotel and accommodation bookings (Airbnb-style)
- Car rentals
- Events and experiences
- Transport services

The platform is designed to deliver a clean, modern, and user-friendly interface optimized for both mobile and desktop, with clear functionality tailored for Clients, Service Providers, and Admins.

---

## 🧑‍💼 User Roles
### 1. **Client**
- Can browse listings without logging in
- Must **log in** to:
  - Book services
  - Save/bookmark listings
  - Leave reviews
- Can view saved activities (tours, hotels, events, accommodations) in their dashboard
- Booking status updates (confirmed/cancelled) are visible in the user's profile

### 2. **Service Provider**
- Registers and waits for approval
- Can list:
  - Tours
  - Cars
  - Hotels
  - Events
  - Accommodations
- Can only manage **their own** listings
- Must agree to terms before listing:
  - Confirm payment or acknowledge listing needs admin approval
- Listings remain hidden until **approved by Admin**
- Gets notified of approval status or any feedback from Admin

### 3. **Admin (Hilly Agency Team)**
- Full control over platform operations
- Can:
  - Add/edit/delete any listings
  - Approve/reject/edit listings submitted by providers
  - Set listing statuses (Approved, Rejected, Under Review)
  - Send notes/comments to service providers during review
  - Confirm or cancel client bookings
- Receives notifications when a new listing or booking is created

---

## 🧩 Platform Features

### ✅ Core Functionality
- Responsive and interactive UI
- Search & filter by category, location, price
- Role-based access
- Booking confirmation system
- Multi-step booking forms (available after login)
- Media galleries (images/videos) for all listings
- Admin dashboard with full CRUD
- Service Provider dashboard for managing listings
- Client dashboard with saved items, bookings, and reviews

### 📸 Media Handling
- Each listing supports image and video uploads
- Displayed on the Single Listing Page as a gallery or embedded video

### 💬 Review System
- Only **logged-in users who booked** a service can leave a review
- Ratings and reviews are shown publicly under each listing

### 🔒 Authentication & Authorization
- JWT-based secure login/signup
- Roles: `Client`, `Provider`, `Admin`
- Access protection based on roles

### 📖 Blog & Travel Guide
- SEO-friendly blog with travel tips, news, and local stories
- Accessible via the blog page

### 🔔 Notifications
- Admin receives alerts for:
  - New listings from providers
  - New bookings from clients
- Service Providers are notified of:
  - Admin feedback
  - Listing status updates

### 💳 Booking & Payments
- Booking forms require login
- Bookings are set as **Pending** by default
- Admin reviews and confirms/cancels
- Clients see status in their profile
- Stripe or other payment gateway for secure transactions

---

## 📄 Pages & Routes

### Public Pages
- `/` – Homepage
- `/tours`, `/events`, `/hotels`, `/cars`, `/accommodations` – Listing Pages
- `/listing/:id` – Single Listing Page
- `/blog` – Blog overview
- `/blog/:slug` – Single blog post
- `/contact` – Contact us page
- `/about` – About Hilly Agency
- `/faq` – Help & FAQs
- `/privacy-policy`, `/terms` – Legal pages
- `/404`, `/500` – Error pages

### Auth Pages
- `/login`
- `/register`
- `/forgot-password`

### User Dashboards
- `/dashboard/client` – Saved bookings, saved listings, profile
- `/dashboard/provider` – Add/edit listings, view bookings, earnings
- `/dashboard/admin` – User management, listing moderation, booking approvals

### Special Pages
- `/booking-success` – Confirmation after successful booking

---

## ⚙️ Tech Stack
- **Frontend:** React / Next.js
- **Backend:** Node.js + Express / NestJS
- **Database:** PostgreSQL / MongoDB
- **Auth:** JWT (email/password), role-based access
- **Storage:** Cloudinary / Firebase for media
- **Payments:** Stripe API
- **SEO & Performance:** Clean URLs, meta tags, schema.org, lazy loading, fast APIs

---

## 🧭 Development Phases

### 🔨 Timeline Overview (6 weeks)
- **Week 1–2**: Frontend pages with static data
- **Week 3–4**: Backend setup, booking logic, CRUD APIs, dashboards
- **Week 5**: Feedback from client, optimization, bug fixes
- **Week 6**: Final testing, SEO, deployment

---

## 💬 Booking Workflow
1. Client selects a listing (e.g. tour)
2. Clicks on "Book Now"
3. Prompted to log in if not already
4. After login, accesses the booking form
5. Completes form and submits
6. Admin reviews the booking
7. Admin approves or cancels the booking
8. Client receives status update in dashboard

---

## 💼 Listing Moderation Workflow
1. Provider clicks "Add Listing"
2. Accepts terms ("I have paid" or "I agree listing is under admin review")
3. Fills in media, description, availability, price
4. Submits listing
5. Admin is notified, reviews content
6. Admin:
   - Approves and publishes it
   - Rejects with comment
   - Edits it and then approves
   - Marks as "Under Review"
7. Provider sees the current status in their dashboard

---

## 🛠️ Admin Capabilities
- Full CRUD for:
  - Tours
  - Events
  - Accommodations
  - Hotels
  - Cars
- Manage users and roles
- Booking approval/cancellation
- View platform analytics (optional phase)

---

## 🧪 Testing & QA
- Manual testing for all user roles
- Automated testing for booking logic and role-based access
- Performance & SEO testing using Lighthouse

---

## 📦 Post-Launch Support
- Deployment and live setup
- Transfer of source code and documentation
- Up to 2 months of support (bug fixes, usage assistance)

---

## 🔗 Contact
- Developer: **Victor Munezero (iwmvictor)**
- Portfolio: [https://iwmvictor.vercel.app](https://iwmvictor.vercel.app)
- Email: `iwmvik@gmail.com`

---

**Hilly Agency is designed to become Rwanda’s most reliable, elegant, and user-centric tours and experiences booking platform.**

