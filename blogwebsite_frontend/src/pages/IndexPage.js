import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './css/IndexPage.css';

const IndexPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8;
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchBlogs = async () => { 
      try {
        const res = await fetch("http://localhost:9090/getallblogs");
        const data = await res.json();
        console.log(data);

        // Reverse the order to show newest blogs first
        const reversedData = data.slice().reverse();

        setBlogs(reversedData);
        setFilteredBlogs(reversedData);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      }
    };

    fetchBlogs();
  }, []);

  const filterBlogs = (event) => {
    const input = event.target.value.toLowerCase();
    const filtered = blogs.filter(blog =>
      blog.title.toLowerCase().includes(input)
    );
    setFilteredBlogs(filtered);
    setCurrentPage(1);
  };

  const renderBlogs = () => {
    const start = (currentPage - 1) * blogsPerPage;
    const end = start + blogsPerPage;
    const paginatedBlogs = filteredBlogs.slice(start, end);

    return paginatedBlogs.map((blog, index) => (
      <div className="card" key={index} onClick={() => navigate(`/blog_view?title=${encodeURIComponent(blog.title)}`)}>
        <h3><b>{blog.title}</b></h3>
        <p>{blog.content.slice(0, 60)}...</p>
        <p style={{ color: 'gray' }}>{blog.blog_words}</p>
        <small>blog by {blog.name}</small>
      </div>
    ));
  };

  const renderPagination = () => {
    const pageCount = Math.ceil(filteredBlogs.length / blogsPerPage);
    const buttons = [];

    buttons.push(
      <button key="prev" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
        Prev
      </button>
    );

    for (let i = 1; i <= pageCount; i++) {
      buttons.push(
        <button
          key={i}
          className={i === currentPage ? "active" : ""}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }

    buttons.push(
      <button key="next" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pageCount}>
        Next
      </button>
    );

    return buttons;
  };

  const renderActionBox = () => {
    const email = sessionStorage.getItem("userEmail");
    if (email) {
      return (
        <div className="action-box">
          <p>Welcome, <b>{email}</b></p>
          <button onClick={() => navigate("/blog_add")}>Create Blog</button>
        </div>
      );
    } else {
      return (
        <div className="action-box">
          <p>To create your own blogs</p>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      );
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>All Blogs</h1>
      <div className="main-container">
        <div className="left-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by title..."
              onChange={filterBlogs}
            />
          </div>

          <div className="blog-grid">
            {renderBlogs()}
          </div>

          <div className="pagination">
            {renderPagination()}
          </div>
        </div>

        <div className="right-section">
          {renderActionBox()}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;