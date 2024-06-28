import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Card as BootstrapCard, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useSelector } from 'react-redux';

function Shownow() {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [currentPostId, setCurrentPostId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const user = useSelector((state) => state.auth.user);
  const admin = useSelector((state) => state.authAdmin.admin);
  const [comments, setComments] = useState([]); // Object to store comments by postId
  const [userData, setUserData] = useState([]);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:8025/api/viewPost');
        const posts = res.data.map(post => ({ ...post, liked: false, saved: false, comments: [] }));
        setData(posts);
        setOriginalData(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = admin?.token;
        const response = await axios.get('http://localhost:8025/api/getalluser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        console.log('User data fetched:', response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (admin) {
      fetchUserProfile();
    }
  }, [admin]);

  const toggleLike = (index) => {
    setData(prevData => {
      const newData = [...prevData];
      newData[index].liked = !newData[index].liked;
      newData[index].likes = newData[index].liked ? (newData[index].likes || 0) + 1 : (newData[index].likes || 0) - 1;
      return newData;
    });
  };

  const toggleSave = (index) => {
    setData(prevData => {
      const newData = [...prevData];
      newData[index].saved = !newData[index].saved;
      const updatedSavedItems = newData[index].saved
        ? [...savedItems, newData[index]]
        : savedItems.filter(item => item._id !== newData[index]._id);
      setSavedItems(updatedSavedItems);
      return newData;
    });
  };

  const handleShowSavedItems = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    const token = user?.token || admin?.token;
    if (!token) {
      console.error('No token found.');
      return;
    }

    try {
      const userComment = { comment: commentText };
      await axios.put(`http://localhost:8025/api/createComment/${postId}`, userComment, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Comment submitted successfully.');
      setCommentText('');
      fetchComments(postId);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const res = await axios.get(`http://localhost:8025/api/getCommentById/${postId}`);
      setComments(res.data)
      console.log('====================================');
        console.log(setComments);
        console.log('====================================');
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const deletePost = async (usersid) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      const token = admin?.token;
      if (token) {
        try {
          await axios.delete(`http://localhost:8025/api/deletePostById/${usersid}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setData(data.filter(post => post._id !== usersid));
        } catch (error) {
          console.error('Error deleting post:', error);
        }
      }
    }
  };

  const handleSearch = () => {
    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Filter data based on searchTerm
    const filteredData = originalData.filter(post => post.Title.toLowerCase().includes(searchTerm.toLowerCase()));
    setData(filteredData);

    // Set a timeout to reset the data after 1 hour (3600000 milliseconds)
    searchTimeoutRef.current = setTimeout(() => {
      setData(originalData);
    }, 36000);
  };

  return (
    <>
      <Form className="mb-3">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSearch} type="button" variant="primary" className="mt-2">
          Search
        </Button>
      </Form>
      <Button variant="primary" onClick={handleShowSavedItems} className="mb-3">
        Show Saved Items
      </Button>
      {data.map((d, i) => (
        <BootstrapCard key={d._id} className="mb-3">
          <BootstrapCard.Header className="d-flex justify-content-between align-items-center">
            <Button variant="link" className="text-muted">
              <i className="bi bi-three-dots"></i>
            </Button>
          </BootstrapCard.Header>
          <BootstrapCard.Body>
            <BootstrapCard.Text>
              <p>{d.Title}</p>
              {d.description}
              <p>{d.references}</p>
            </BootstrapCard.Text>
            {d.posterUrl && (
              <img
                src={d.posterUrl}
                alt="Post"
                className="img-fluid rounded"
              />
            )}
            {comments[d._id] && comments[d._id].length > 0 && (
              <div>
                {comments[d._id].map((comment, index) => (
                  <p key={index}>{comment.comment}</p>
                ))}
              </div>
            )}
            <div>
              {currentPostId === d._id && (
                <Form onSubmit={(e) => handleCommentSubmit(e, d._id)}>
                  <Form.Group controlId="comment">
                    <Form.Control
                      type="text"
                      value={commentText}
                      onChange={handleCommentChange}
                      placeholder="Write a comment..."
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary" className="mt-2">
                    Post Comment
                  </Button>
                </Form>
              )}
            </div>
          </BootstrapCard.Body>
          <BootstrapCard.Footer className="d-flex justify-content-between align-items-center">
            <Button variant="link" className="text-muted" onClick={() => toggleLike(i)}>
              {d.liked ? (
                <>
                  <i className="bi bi-hand-thumbs-up-fill"></i> Liked
                </>
              ) : (
                <>
                  <i className="bi bi-hand-thumbs-up"></i> Like
                </>
              )}
            </Button>
            <Button variant="link" className="text-muted" onClick={() => setCurrentPostId(d._id)}>
              <i className="bi bi-chat"></i> Comment
            </Button>
            <Button variant="link" className="text-muted" onClick={() => toggleSave(i)}>
              {d.saved ? (
                <>
                  <i className="bi bi-save-fill"></i> Saved
                </>
              ) : (
                <>
                  <i className="bi bi-save"></i> Save
                </>
              )}
            </Button>
            {admin && (
              <Button variant="link" className="text-muted" onClick={() => deletePost(d._id)}>
                <i className="bi bi-trash"></i> Delete
              </Button>
            )}
          </BootstrapCard.Footer>
        </BootstrapCard>
      ))}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Saved Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {savedItems.length > 0 ? (
            savedItems.map((item, index) => (
              <BootstrapCard key={index} className="mb-3">
                <BootstrapCard.Body>
                  <BootstrapCard.Text>
                    <p>{item.Title}</p>
                    {item.description}
                  </BootstrapCard.Text>
                  {item.posterUrl && (
                    <img
                      src={item.posterUrl}
                      alt="Post"
                      className="img-fluid rounded"
                    />
                  )}
                </BootstrapCard.Body>
              </BootstrapCard>
            ))
          ) : (
            <p>No saved items.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Shownow;
