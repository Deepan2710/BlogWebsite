import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const BlogViewPage = () => {
  const [blog, setBlog] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const title = params.get("title");

    if (title) {
      fetch(`http://localhost:9090/blogs/${encodeURIComponent(title)}`)
        .then(response => response.json())
        .then(data => setBlog(data))
        .catch(err => console.error("Error:", err));
    }
  }, [location]);

  return (
    <div style={styles.container}>
      {blog ? (
        <>
          <h1 style={styles.title}>{blog.title}</h1>
          <p style={styles.content}>{blog.content}</p>
        </>
      ) : (
        <p>Ready for the blog...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: 'auto',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  },
  title: {
    fontSize: '32px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  content: {
    fontSize: '18px',
    lineHeight: '1.6',
    marginBottom: '20px'
  },
  words: {
    fontStyle: 'italic',
    color: 'gray',
    textAlign: 'right'
  }
};

export default BlogViewPage;
