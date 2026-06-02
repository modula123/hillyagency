import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogList, userList } from "@/lib/data";
import BlogCard from "@/components/cards/BlogCard";

export default function BlogSection() {
  const featured = blogList.filter((b) => b.is_featured).slice(0, 3);

  return (
    <section className="py-16 bg-[var(--bg2)]">
      <div className="container mx-auto px-5 xl:px-0 max-w-[1200px]">
        <div className="sec-title">
          <div>
            <h2>News, Tips & Guides</h2>
            <p>Expert insights for planning your East Africa journey</p>
          </div>
          <Link href="/blog" className="view-more-btn">
            View More <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.length === 0 ? (
            <p className="no-result">No blog posts available.</p>
          ) : (
            featured.map((blog) => {
              const author = userList.find((u) => u.userId === blog.authorId);
              return <BlogCard key={blog.id} blog={blog} author={author} />;
            })
          )}
        </div>
      </div>
    </section>
  );
}
