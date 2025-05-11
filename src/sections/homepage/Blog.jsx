import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { blogList } from "../../assets/assets";
import BlogCard from "../../component/reusable/BlogCard";

const HomepageBlog = () => {
  const filteredBlogs = blogList.filter((blog) => blog.isFeatured);

  return (
    <>
      <div className="home-blogs">
        <div className="container">
          <div className="content">
            <div className="sec-title">
              <div>
                <h1>News, Tips & Guides</h1>
                <p>Get the latest insights and updates</p>
              </div>
              <div>
                <Link to={"/blogs"}>
                  <span>View More</span>
                  <span>
                    <FaArrowRightLong />
                  </span>
                </Link>
              </div>
            </div>

            <div className="boxes">
              {filteredBlogs.length < 1 ? (
                <div className="no-result">
                  <p>No blogs available for moment.</p>
                </div>
              ) : (
                filteredBlogs
                  .slice(0, 3)
                  .map((blog, index) => <BlogCard key={index} blog={blog} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomepageBlog;
