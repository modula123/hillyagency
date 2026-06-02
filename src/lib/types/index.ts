export type Review = {
  userId: string;
  message: string;
  rating: number;
};

export type Tour = {
  id: string;
  slug: string;
  destination_id?: string;
  title: string;
  bio: string;
  type: string;
  category: string;
  thumbnail?: string;
  images: string[];
  description: string;
  duration: string;
  price: number;
  is_featured: boolean;
  location?: string;
  currency?: string;
  reviews: Review[];
  includes?: string[];
  excludes?: string[];
  max_group_size?: number;
};

export type Activity = {
  id: string;
  slug: string;
  title: string;
  bio: string;
  category: string;
  type: string;
  images: string[];
  description: string;
  is_featured?: boolean;
  reviews: Review[];
  location?: string;
  currency?: string;
};

export type Hotel = {
  id: string;
  slug: string;
  title: string;
  bio: string;
  type: string;
  location: string;
  price: number;
  images: string[];
  description: string;
  is_featured: boolean;
  reviews: Review[];
  currency?: string;
  thumbnail?: string;
};

export type Restaurant = {
  id: string;
  slug: string;
  title: string;
  bio: string;
  cuisine: string;
  location: string;
  images: string[];
  description: string;
  is_featured?: boolean;
  reviews: Review[];
};

export type Transport = {
  carId: string;
  brand: string;
  model: string;
  year: number;
  body: string;
  color: string;
  transmission: string;
  fuel: string;
  price: number;
  duration: string;
  status: string;
  images?: string[];
  gallery?: string[];
  reviews: Review[];
  is_featured?: boolean;
  location?: string;
  currency?: string;
};

export type Destination = {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  is_featured: boolean;
  bio: string;
  thumbnail: string;
  currency: string;
  description: string;
  tours: Tour[];
  activities: Activity[];
  hotels: Hotel[];
  restaurants: Restaurant[];
  transport: Transport[];
  rentals?: unknown[];
};

export type Testimonial = {
  userId: string;
  message: string;
  rating: number;
  is_featured: boolean;
};

export type BlogPost = {
  id: string;
  title: string;
  thumbnail: string;
  authorId: string;
  datePublished: number;
  readingTime: string;
  intro: string;
  description: string;
  tags: string[];
  comments: { userId: string; comment: string; timestamp: number }[];
  is_featured: boolean;
  relatedPosts: string[];
};

export type Brand = {
  title: string;
  image: string;
};

export type UserProfile = {
  userId: string;
  username: string;
  fullName: string;
  email: string;
  role?: string;
  profilePicture?: string;
};

export type InquiryType = "custom" | "group" | "corporate" | "general";

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";
