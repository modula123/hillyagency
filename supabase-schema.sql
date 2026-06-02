-- ============================================================
-- HILLY AGENCY — SUPABASE PRODUCTION SCHEMA
-- Run this in your Supabase project SQL editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── PROFILES (extends auth.users) ─────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role        TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'provider', 'admin')),
  full_name   TEXT,
  avatar_url  TEXT,
  phone       TEXT,
  nationality TEXT,
  bio         TEXT,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'client')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─── DESTINATIONS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.destinations (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug            TEXT UNIQUE NOT NULL,
  title           TEXT NOT NULL,
  subtitle        TEXT,
  bio             TEXT,
  description     TEXT,
  thumbnail_url   TEXT,
  gallery_urls    TEXT[],
  currency        TEXT DEFAULT 'USD',
  region          TEXT,
  is_featured     BOOLEAN DEFAULT FALSE,
  lat             NUMERIC,
  lng             NUMERIC,
  meta_title      TEXT,
  meta_description TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── TOURS ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.tours (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  destination_id  UUID REFERENCES public.destinations(id) ON DELETE SET NULL,
  provider_id     UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  slug            TEXT UNIQUE NOT NULL,
  title           TEXT NOT NULL,
  bio             TEXT,
  description     TEXT,
  duration        TEXT,
  price           NUMERIC,
  type            TEXT,
  category        TEXT,
  is_featured     BOOLEAN DEFAULT FALSE,
  max_group_size  INTEGER,
  min_age         INTEGER,
  includes        TEXT[],
  excludes        TEXT[],
  images          TEXT[],
  status          TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'archived')),
  avg_rating      NUMERIC DEFAULT 0,
  review_count    INTEGER DEFAULT 0,
  meta_title      TEXT,
  meta_description TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── ACTIVITIES ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.activities (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  destination_id  UUID REFERENCES public.destinations(id) ON DELETE SET NULL,
  slug            TEXT UNIQUE NOT NULL,
  title           TEXT NOT NULL,
  bio             TEXT,
  description     TEXT,
  category        TEXT,
  type            TEXT,
  images          TEXT[],
  price           NUMERIC,
  is_featured     BOOLEAN DEFAULT FALSE,
  status          TEXT DEFAULT 'active',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── ACCOMMODATIONS ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.accommodations (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  destination_id  UUID REFERENCES public.destinations(id) ON DELETE SET NULL,
  slug            TEXT UNIQUE NOT NULL,
  title           TEXT NOT NULL,
  bio             TEXT,
  description     TEXT,
  type            TEXT,
  location        TEXT,
  price           NUMERIC,
  images          TEXT[],
  is_featured     BOOLEAN DEFAULT FALSE,
  avg_rating      NUMERIC DEFAULT 0,
  review_count    INTEGER DEFAULT 0,
  status          TEXT DEFAULT 'active',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── RESTAURANTS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.restaurants (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  destination_id  UUID REFERENCES public.destinations(id) ON DELETE SET NULL,
  slug            TEXT UNIQUE NOT NULL,
  title           TEXT NOT NULL,
  bio             TEXT,
  description     TEXT,
  cuisine         TEXT,
  location        TEXT,
  images          TEXT[],
  is_featured     BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── BOOKINGS ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.bookings (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tour_id           UUID REFERENCES public.tours(id) ON DELETE SET NULL,
  client_id         UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  client_name       TEXT,
  client_email      TEXT NOT NULL,
  client_phone      TEXT,
  travel_date       DATE,
  travelers         INTEGER DEFAULT 1,
  special_requests  TEXT,
  total_price       NUMERIC,
  status            TEXT DEFAULT 'pending'
                    CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status    TEXT DEFAULT 'unpaid'
                    CHECK (payment_status IN ('unpaid', 'deposit_paid', 'paid', 'refunded')),
  stripe_session_id TEXT,
  admin_notes       TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ─── REVIEWS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.reviews (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL CHECK (entity_type IN ('tour', 'accommodation', 'restaurant', 'activity')),
  entity_id   UUID NOT NULL,
  author_id   UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  booking_id  UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  rating      INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  message     TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── INQUIRIES ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.inquiries (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type                  TEXT DEFAULT 'general'
                        CHECK (type IN ('booking', 'custom', 'group', 'corporate', 'mice', 'general')),
  full_name             TEXT,
  email                 TEXT NOT NULL,
  phone                 TEXT,
  destination_interest  TEXT,
  travel_date_from      DATE,
  group_size            INTEGER,
  budget_range          TEXT,
  message               TEXT,
  extra_data            JSONB,
  status                TEXT DEFAULT 'new'
                        CHECK (status IN ('new', 'in_review', 'quoted', 'booked', 'closed')),
  assigned_to           UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- ─── BLOG POSTS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug             TEXT UNIQUE NOT NULL,
  title            TEXT NOT NULL,
  excerpt          TEXT,
  body             TEXT,
  cover_image_url  TEXT,
  author_id        UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  category         TEXT,
  tags             TEXT[],
  is_published     BOOLEAN DEFAULT FALSE,
  is_featured      BOOLEAN DEFAULT FALSE,
  published_at     TIMESTAMPTZ,
  reading_time     TEXT,
  meta_title       TEXT,
  meta_description TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ─── TESTIMONIALS ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.testimonials (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_name TEXT NOT NULL,
  author_role TEXT,
  avatar_url  TEXT,
  message     TEXT NOT NULL,
  rating      INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── SAVED ITEMS (wishlist) ─────────────────────────────────
CREATE TABLE IF NOT EXISTS public.saved_items (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL,
  entity_id   UUID NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, entity_type, entity_id)
);

-- ─── ROW LEVEL SECURITY ─────────────────────────────────────

ALTER TABLE public.profiles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tours           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accommodations  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_items     ENABLE ROW LEVEL SECURITY;

-- profiles
CREATE POLICY "Public profiles are viewable by all" ON public.profiles FOR SELECT USING (TRUE);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- destinations (public read)
CREATE POLICY "Destinations are publicly readable" ON public.destinations FOR SELECT USING (TRUE);
CREATE POLICY "Admins can manage destinations" ON public.destinations FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- tours (public read for active)
CREATE POLICY "Active tours are publicly readable" ON public.tours FOR SELECT USING (status = 'active');
CREATE POLICY "Providers can manage own tours" ON public.tours FOR ALL
  USING (auth.uid() = provider_id OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- activities, accommodations, restaurants (public read)
CREATE POLICY "Activities publicly readable" ON public.activities FOR SELECT USING (TRUE);
CREATE POLICY "Accommodations publicly readable" ON public.accommodations FOR SELECT USING (TRUE);
CREATE POLICY "Restaurants publicly readable" ON public.restaurants FOR SELECT USING (TRUE);

-- bookings (own rows only)
CREATE POLICY "Clients see own bookings" ON public.bookings FOR SELECT USING (auth.uid() = client_id);
CREATE POLICY "Clients can create bookings" ON public.bookings FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Admins see all bookings" ON public.bookings FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- reviews (public read)
CREATE POLICY "Reviews are publicly readable" ON public.reviews FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Authenticated users can post reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- inquiries (anyone can submit, only admin can read)
CREATE POLICY "Anyone can submit inquiries" ON public.inquiries FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Admins can read all inquiries" ON public.inquiries FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Users can read own inquiries" ON public.inquiries FOR SELECT
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- blog posts (public read for published)
CREATE POLICY "Published blog posts are public" ON public.blog_posts FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Admins manage blog" ON public.blog_posts FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- testimonials (public read)
CREATE POLICY "Published testimonials are public" ON public.testimonials FOR SELECT USING (is_published = TRUE);

-- saved items (own rows only)
CREATE POLICY "Users manage own saved items" ON public.saved_items FOR ALL USING (auth.uid() = user_id);

-- ─── INDEXES ─────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_tours_destination   ON public.tours(destination_id);
CREATE INDEX IF NOT EXISTS idx_tours_status        ON public.tours(status);
CREATE INDEX IF NOT EXISTS idx_tours_featured      ON public.tours(is_featured);
CREATE INDEX IF NOT EXISTS idx_bookings_client     ON public.bookings(client_id);
CREATE INDEX IF NOT EXISTS idx_bookings_tour       ON public.bookings(tour_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_email     ON public.inquiries(email);
CREATE INDEX IF NOT EXISTS idx_inquiries_status    ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_blog_slug           ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_destinations_slug   ON public.destinations(slug);
CREATE INDEX IF NOT EXISTS idx_saved_user          ON public.saved_items(user_id);

-- ─── STORAGE BUCKETS ─────────────────────────────────────────
-- Run these in Supabase Dashboard → Storage, or via API:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', TRUE);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', TRUE);

SELECT 'Hilly Agency schema installed successfully.' AS status;
