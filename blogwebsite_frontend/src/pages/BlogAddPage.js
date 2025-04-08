// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const BlogAddPage = () => {
//   const navigate = useNavigate();
//   const email = sessionStorage.getItem('userEmail');
//   const name = sessionStorage.getItem('userName');

//   const [title, setTitle] = useState('');    
//   const [content, setContent] = useState('');
//   const [words, setWords] = useState('');
//   const [blogs, setBlogs] = useState([]);
//   const [editMode, setEditMode] = useState(false);
//   const [originalTitle, setOriginalTitle] = useState('');

//    useEffect(() => {
//     const loadBlogs = async () => {
//       try {
//         const res = await fetch(`http://localhost:9090/getblogsbyemail/${email}`);
//         const data = await res.json();
//         if (data && data.blog) {
//           setBlogs(data.blog);
//         } else {
//           setBlogs([]);
//         }
//       } catch (err) {
//         console.error("Failed to fetch blogs", err);
//       }
//     };
  
//     if (!email) {
//       alert("Unauthorized. Please login.");
//       navigate('/login');
//     } else {
//       loadBlogs();
//     }
//   }, [email, navigate]);

//   const loadBlogs = async () => {
//     try {
//       const res = await fetch(`http://localhost:9090/getblogsbyemail/${email}`);
//       const data = await res.json();
//       if (data && data.blog) {
//         setBlogs(data.blog);
//       } else {
//         setBlogs([]);
//       }
//     } catch (err) {
//       console.error("Failed to fetch blogs", err);
//     }
//   };

//   const handleSubmit = async () => {
//     const blog = { title, content, blog_words: words, email, name };
//     const url = editMode
//       ? `http://localhost:9090/updateblog/${email}/${originalTitle}`
//       : "http://localhost:9090/addblog";

//     const method = editMode ? "PUT" : "POST";

//     try {
//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(blog)
//       });

//       if (res.ok) {
//         alert(editMode ? "Blog updated!" : "Blog created!");
//         setTitle('');
//         setContent('');
//         setWords('');
//         setEditMode(false);
//         setOriginalTitle('');
//         loadBlogs();
//       } else {
//         alert("Error! This title already exists.");
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleEdit = (e, blogTitle, blogContent, blogWords) => {
//     e.stopPropagation();
//     console.log("Editing blog:", blogTitle, blogContent, blogWords); // ✅ Verify full content
//     setTitle(blogTitle);
//     setContent(blogContent);
//     setWords(blogWords);
//     setEditMode(true);
//     setOriginalTitle(blogTitle);
//   };

//   const handleDelete = async (e, blogTitle) => {
//     e.stopPropagation();
//     if (!window.confirm("Do you want to delete this blog?")) return;

//     try {
//       const res = await fetch(`http://localhost:9090/deleteblog/${email}/${blogTitle}`, {
//         method: "DELETE"
//       });

//       if (res.ok) {
//         alert("Blog deleted.");
//         loadBlogs();
//       } else {
//         alert("Failed to delete blog.");
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const logout = () => {
//     sessionStorage.clear();
//     navigate('/');
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.header}>
//         <h1 style={styles.h1}>{editMode ? "Edit Blog" : "Create New Blog"}</h1>
//         <button onClick={logout} style={styles.logoutButton}>Logout</button>
//       </div>

//       <div style={styles.form}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           style={styles.input}
//         /><br /><br />

//         <textarea
//           placeholder="Content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           rows={6}
//           style={styles.textarea}
//         /><br />

//         <input
//           type="text"
//           placeholder="Words (comma separated)"
//           value={words}
//           onChange={(e) => setWords(e.target.value)}
//           style={styles.input}
//         />
//         <button onClick={handleSubmit} style={styles.submitButton}>
//           {editMode ? "Update" : "Submit"}
//         </button>
//       </div>

//       <h2>Your Blogs</h2>
//       <div style={styles.blogContainer}>
//         {blogs.length === 0 ? (
//           <p>No blogs found for your account.</p>
//         ) : (
//           blogs.map(([title, content, blog_words]) => (
//             <div
//               className="card"
//               key={title}
//               style={styles.card}
//               onClick={() => navigate(`/blog_view?title=${encodeURIComponent(title)}`)}
//             >
//               <button
//                 title="Edit"
//                 onClick={(e) => handleEdit(e, title, content, blog_words)}
//                 style={styles.editIcon}
//               >
//                 ✏️
//               </button>
//               <h3>{title}</h3>
//               <p>{content.slice(0, 50)}...</p>
//               <small>{blog_words}</small>
//               <button
//                 title="Delete"
//                 onClick={(e) => handleDelete(e, title)}
//                 style={styles.deleteIcon}
//               >
//                 🗑️
//               </button>  
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   page: {
//     fontFamily: "Arial",
//     padding: "20px",
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center"
//   },
//   h1: {
//     color: "#4B0082"
//   },
//   logoutButton: {
//     backgroundColor: "#f44336",
//     color: "white",
//     padding: "8px 16px",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer"
//   },
//   form: {
//     marginTop: "20px"
//   },
//   input: {
//     padding: "8px",
//     marginBottom: "10px",
//     width: "300px",
//     borderRadius: "5px",
//     border: "1px solid #ccc"
//   },
//   textarea: {
//     width: "300px",
//     padding: "8px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//     resize: "vertical"
//   },
//   submitButton: {
//     backgroundColor: "#4B0082",
//     color: "white",
//     padding: "8px 16px",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginLeft: "10px"
//   },
//   blogContainer: {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: "20px",
//     marginTop: "30px"
//   },
//   card: {
//     backgroundColor: "#f5f7ff",
//     borderRadius: "15px",
//     padding: "20px",
//     width: "250px",
//     position: "relative",
//     boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//     cursor: "pointer",
//     transition: "transform 0.2s ease, box-shadow 0.2s ease",
//   },
//   editIcon: {
//     background: "none",
//     border: "none",
//     fontSize: "18px",
//     cursor: "pointer",
//     position: "absolute",
//     top: "10px",
//     right: "10px",
//     color: "#1f4f91"
//   },
//   deleteIcon: {
//     background: "none",
//     border: "none",
//     fontSize: "18px",
//     cursor: "pointer",
//     position: "absolute",
//     bottom: "10px",
//     right: "10px",
//     color: "#e53935"
//   }
// };

// export default BlogAddPage;   


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BlogAddPage = () => {
  const navigate = useNavigate();
  const email = sessionStorage.getItem('userEmail');
  const name = sessionStorage.getItem('userName');
console.log(email);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [words, setWords] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [originalTitle, setOriginalTitle] = useState('');

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const res = await fetch(`http://localhost:9090/getblogsbyemail/${email}`);
        const data = await res.json();
        if (data && data.blog) {
          setBlogs(data.blog);
        } else {
          setBlogs([]);
        }
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      }
    };

    if (!email) {
      alert("Unauthorized. Please login.");
      navigate('/login');
    } else {
      loadBlogs();
    }
  }, [email, navigate]);

  const loadBlogs = async () => {
    try {
      const res = await fetch(`http://localhost:9090/getblogsbyemail/${email}`);
      const data = await res.json();
      if (data && data.blog) {
        setBlogs(data.blog);
      } else {
        setBlogs([]);
      }
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    }
  };

  const handleSubmit = async () => {
    const blog = { title, content, blog_words: words, email, name };
    const url = editMode
      ? `http://localhost:9090/updateblog/${email}/${originalTitle}`
      : "http://localhost:9090/addblog";

    const method = editMode ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog)
      });

      if (res.ok) {
        alert(editMode ? "Blog updated!" : "Blog created!");
        setTitle('');
        setContent('');
        setWords('');
        setEditMode(false);
        setOriginalTitle('');
        loadBlogs();
      } else {
        alert("Error! This title already exists.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (e, blogTitle, blogContent, blogWords) => {
    e.stopPropagation();
    setTitle(blogTitle);
    setContent(blogContent);
    setWords(blogWords);
    setEditMode(true);
    setOriginalTitle(blogTitle);
  };

  const handleDelete = async (e, blogTitle) => {
    e.stopPropagation();
    if (!window.confirm("Do you want to delete this blog?")) return;

    try {
      const res = await fetch(`http://localhost:9090/deleteblog/${email}/${blogTitle}`, {
        method: "DELETE"
      });

      if (res.ok) {
        alert("Blog deleted.");
        loadBlogs();
      } else {
        alert("Failed to delete blog.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.h1}>{editMode ? "Edit Blog" : "Create New Blog"}</h1>
        <div>
          <button onClick={() => navigate('/')} style={styles.allBlogsButton}>
            To see all blogs
          </button>
          <button onClick={logout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        /><br /><br />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          style={styles.textarea}
        /><br />

        <input
          type="text"
          placeholder="Words (comma separated)"
          value={words}
          onChange={(e) => setWords(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSubmit} style={styles.submitButton}>
          {editMode ? "Update" : "Submit"}
        </button>
      </div>

      <h2>Your Blogs</h2>
      <div style={styles.blogContainer}>
        {blogs.length === 0 ? (
          <p>No blogs found for your account.</p>
        ) : ( 
          blogs.map(([title, content, blog_words]) => (
            <div
              className="card"
              key={title}
              style={styles.card}
              onClick={() => navigate(`/blog_view?title=${encodeURIComponent(title)}`)}
            >
              <button
                title="Edit"
                onClick={(e) => handleEdit(e, title, content, blog_words)}
                style={styles.editIcon}
              >
                ✏️
              </button>
              <h3>{title}</h3>
              <p>{content.slice(0, 50)}...</p>
              <small>{blog_words}</small>
              <button
                title="Delete"
                onClick={(e) => handleDelete(e, title)}
                style={styles.deleteIcon}
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "Arial",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  h1: {
    color: "#4B0082"
  },
  allBlogsButton: {
    backgroundColor: "#008080",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px"
  },
  logoutButton: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  form: {
    marginTop: "20px"
  },
  input: {
    padding: "8px",
    marginBottom: "10px",
    width: "300px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  textarea: {
    width: "300px",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    resize: "vertical"
  },
  submitButton: {
    backgroundColor: "#4B0082",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px"
  },
  blogContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "30px"
  },
  card: {
    backgroundColor: "#f5f7ff",
    borderRadius: "15px",
    padding: "20px",
    width: "250px",
    position: "relative",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  editIcon: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    position: "absolute",
    top: "10px",
    right: "10px",
    color: "#1f4f91"
  },
  deleteIcon: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    position: "absolute",
    bottom: "10px",
    right: "10px",
    color: "#e53935"
  }
};

export default BlogAddPage;
