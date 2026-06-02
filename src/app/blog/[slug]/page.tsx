import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/PageUtils";
import BlogCard from "@/components/cards/BlogCard";
import { blogList, userList } from "@/lib/data";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

function titleToSlug(title: string) {
  return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export async function generateStaticParams() {
  return blogList.map((b) => ({ slug: titleToSlug(b.title) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogList.find((b) => titleToSlug(b.title) === slug);
  if (!blog) return {};
  return {
    title: blog.title,
    description: blog.intro,
    openGraph: {
      title: `${blog.title} — Hilly Agency Blog`,
      description: blog.intro,
      images: [{ url: blog.thumbnail }],
      type: "article",
    },
    alternates: { canonical: `https://hillyagency.vercel.app/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = blogList.find((b) => titleToSlug(b.title) === slug);
  if (!blog) notFound();

  const author = userList.find((u) => u.userId === blog.authorId);
  const related = blog.relatedPosts
    .map((id) => blogList.find((b) => b.id === id))
    .filter(Boolean) as typeof blogList;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.intro,
    image: blog.thumbnail,
    datePublished: new Date(blog.datePublished).toISOString(),
    author: { "@type": "Person", name: author?.fullName || "Hilly Agency" },
    publisher: {
      "@type": "Organization",
      name: "Hilly Agency",
      logo: { "@type": "ImageObject", url: "https://hillyagency.vercel.app/images/brand/wlogo.svg" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ScrollProgress />
      <Header />
      <main className="bg-[var(--bg)] min-h-screen">
        {/* Cover */}
        <div className="relative h-72 lg:h-96 overflow-hidden">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        <div className="container mx-auto px-5 xl:px-0 max-w-[800px] py-12">
          {/* Back */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[var(--subtext)] hover:text-[var(--accent)] mb-6 transition-colors">
            <ArrowLeft size={14} />
            Back to Blog
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 text-xs font-semibold bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1 rounded-full">
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-black text-[var(--text)] leading-tight mb-5">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-5 pb-6 border-b border-[var(--border)] mb-8">
            <div className="flex items-center gap-2">
              {author?.profilePicture && (
                <Image
                  src={author.profilePicture}
                  alt={author.fullName}
                  width={36}
                  height={36}
                  className="rounded-full object-cover w-9 h-9"
                />
              )}
              <div>
                <p className="text-sm font-bold text-[var(--text)]">{author?.fullName || "Hilly Team"}</p>
                <p className="text-xs text-[var(--subtext)] capitalize">{author?.role || "Author"}</p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-xs text-[var(--subtext)]">
              <Calendar size={12} />
              {new Date(blog.datePublished).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span className="flex items-center gap-1 text-xs text-[var(--subtext)]">
              <Clock size={12} />
              {blog.readingTime} read
            </span>
          </div>

          {/* Intro */}
          <p className="text-lg text-[var(--subtext)] leading-relaxed italic border-l-4 border-[var(--accent)] pl-5 mb-8">
            {blog.intro}
          </p>

          {/* Body */}
          <div
            className="prose prose-base max-w-none text-[var(--subtext)] [&_h2]:text-[var(--text)] [&_h3]:text-[var(--text)] [&_h4]:text-[var(--text)] [&_strong]:text-[var(--text)]"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />

          {/* CTA */}
          <div className="mt-12 p-8 rounded-2xl bg-[var(--dark)] text-white text-center">
            <h3 className="text-2xl font-black mb-2">Ready to Experience Rwanda?</h3>
            <p className="text-white/60 mb-6">Let Hilly Agency plan every detail of your journey.</p>
            <Link href="/contact" className="btn-primary inline-flex">
              Plan My Trip
            </Link>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-black text-[var(--text)] mb-5">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {related.map((b) => (
                  <BlogCard key={b.id} blog={b} author={userList.find((u) => u.userId === b.authorId)} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
