import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/PageUtils";
import PageHero from "@/components/ui/PageHero";
import BlogCard from "@/components/cards/BlogCard";
import { blogList, userList } from "@/lib/data";

export const metadata: Metadata = {
  title: "Travel Blog — Rwanda & East Africa Guides",
  description: "Expert travel guides, tips, and insights for Rwanda and East Africa. Gorilla trekking tips, Kigali city guides, safari planning, and more.",
  alternates: { canonical: "https://hillyagency.vercel.app/blog" },
};

export default function BlogPage() {
  const sorted = [...blogList].sort((a, b) => b.datePublished - a.datePublished);
  const [hero, ...rest] = sorted;

  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="bg-[var(--bg)] min-h-screen">
        <PageHero
          eyebrow="Guides & Insights"
          title="Travel Blog"
          subtitle="Expert knowledge on Rwanda and East Africa travel — written by local guides and verified travelers."
          backgroundImage="/images/destination/kigali.jpg"
        />

        <div className="container mx-auto px-5 xl:px-0 max-w-[1200px] py-14">
          {hero && (
            <div className="mb-12">
              <p className="text-xs font-bold tracking-widest uppercase text-[var(--subtext)] mb-5">Latest Post</p>
              <div className="w-full max-w-2xl">
                <BlogCard blog={hero} author={userList.find((u) => u.userId === hero.authorId)} />
              </div>
            </div>
          )}
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--subtext)] mb-5">All Posts</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((blog) => (
              <BlogCard key={blog.id} blog={blog} author={userList.find((u) => u.userId === blog.authorId)} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
