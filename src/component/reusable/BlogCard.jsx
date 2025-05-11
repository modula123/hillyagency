import React from "react";
import { IoStar, IoStarHalfOutline, IoStarOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { assets, userList } from "../../assets/assets";

import "./../../style/component.scss";

const BlogCard = ({ blog }) => {
  const {
    title,
    content,
    authorId,
    thumbnail,
    tags = [],
    reviews = [],
    comments = [],
    datePublished,
  } = blog;

  // 🔍 Find author from userList
  const author = userList.find((user) => user.userId === authorId);
  const authorName = author
    ? author.fullName || author.username
    : "Unknown Author";

  // ⭐ Average rating calculation
  const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
  const avgRating = reviews.length
    ? (totalRating / reviews.length).toFixed(1)
    : null;

  // 🧠 Generate a slug from title
  const generateSlug = (title) =>
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const slug = generateSlug(title);

  const getStars = (avg) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (avg >= i) stars.push(<IoStar key={i} />);
      else if (avg >= i - 0.5) stars.push(<IoStarHalfOutline key={i} />);
      else stars.push(<IoStarOutline key={i} />);
    }
    return stars;
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="blog-card">
      <div className="img">
        <img src={thumbnail || assets.blogPlaceholder} alt={title} />
        <div className="badge">{tags[0] || "Featured"}</div>
      </div>

      <div className="text">
        <div className="rating">{comments.length} comments</div>

        <h4 className="blog-title">{title}</h4>

        <div className="blog-meta">
          <span className="author">By: {authorName}</span>
          <span className="date">{formatDate(datePublished)}</span>
        </div>

        <Link to={`/blogs/${slug}`} className="read-more">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
