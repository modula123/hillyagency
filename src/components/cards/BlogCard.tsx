import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, MessageSquare } from "lucide-react";
import type { BlogPost, UserProfile } from "@/lib/types";

interface BlogCardProps {
  blog: BlogPost;
  author?: UserProfile;
}

function generateSlug(title: string) {
  return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function BlogCard({ blog, author }: BlogCardProps) {
  const slug = generateSlug(blog.title);

  return (
    <Link href={`/blog/${slug}`} className="hilly-card group flex flex-col h-full hover:no-underline">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <Image
          src={blog.thumbnail || "/images/img/placeholder.jpg"}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {blog.tags[0] && (
          <div className="absolute top-3 left-3 bg-[var(--accent)] text-white text-xs font-bold px-2.5 py-1 rounded-lg">
            {blog.tags[0]}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex items-center gap-3 text-xs text-[var(--subtext)]">
          <span className="flex items-center gap-1">
            <MessageSquare size={11} />
            {blog.comments.length} comments
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {blog.readingTime}
          </span>
        </div>

        <h3 className="font-bold text-[var(--text)] line-clamp-2 leading-snug group-hover:text-[var(--accent)] transition-colors">
          {blog.title}
        </h3>

        <p className="text-sm text-[var(--subtext)] line-clamp-2 flex-1">{blog.intro}</p>

        <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
          {author && (
            <span className="text-xs text-[var(--subtext)]">By {author.fullName}</span>
          )}
          <span className="text-xs text-[var(--subtext)] flex items-center gap-1 ml-auto">
            <Calendar size={11} />
            {formatDate(blog.datePublished)}
          </span>
        </div>
      </div>
    </Link>
  );
}
