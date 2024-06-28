import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card as BootstrapCard, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Crud() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const user = useSelector((state) => state.auth.user);
    const admin = useSelector((state) => state.authAdmin.admin);
    const [userId, setUserId] = useState(null); // Initialize userId as null


    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const token = user?.token || admin?.token;
                const response = await axios.get('http://localhost:8025/api/getuser', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserId(response.data._id); // Assuming response.data.userId is your user ID
                console.log('User ID fetched:', response.data._id);
            } catch (error) {
                console.error('Error fetching user ID:', error);
                // Handle error fetching user ID
            }
        };

        if (user || admin) {
            fetchUserId();
        }
    }, [user, admin]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const token = user?.token || admin?.token;
                if (userId) { // Ensure userId is truthy before making the request
                    const response = await axios.get(`http://localhost:8025/api/userviewPost/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    });
                    setData(response.data);
                }
            } catch (error) {
                setError(error.message || 'Error fetching data.');
            } finally {
                setLoading(false);
            }
        };

        if (user || admin) {
            fetchData();
        }
    }, [user, admin, userId]);

    
        const deletePost = (postId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (confirmDelete) {
            const token = user?.token || admin?.token;
            if (token) {
                axios.delete(`http://localhost:8025/api/deletePostById/${postId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
                .then(() => {
                    setData(data.filter(post => post._id !== postId));
                })
                .catch((error) => {
                    console.error('Error deleting post:', error);
                });
            }
        }
    };

    if (loading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            {data.map((post) => (
                <BootstrapCard key={post._id} className="mb-3">
                    <BootstrapCard.Header className="d-flex justify-content-between align-items-center">
                        <Button variant="link" className="text-muted">
                            <i className="bi bi-three-dots"></i>
                        </Button>
                    </BootstrapCard.Header>
                    <BootstrapCard.Body>
                        <BootstrapCard.Text>
                            <p>{post.Title}</p>
                          <p>{post.description}</p>  
                            <p>{post.references}</p>
                        </BootstrapCard.Text>
                        <img
                            src={post.posterUrl}
                            alt="Post"
                            className="img-fluid rounded"
                        />
                    </BootstrapCard.Body>
                    <BootstrapCard.Footer className="d-flex justify-content-between align-items-center">
                        <Link to={`edit/${post._id}`} className="text-muted">
                            <i className="bi bi-pencil-square"></i> Edit
                        </Link>
                        <Button variant="link" className="text-muted" onClick={() => deletePost(post._id)}>
                            <i className="bi bi-trash"></i> Delete
                        </Button>
                    </BootstrapCard.Footer>
                </BootstrapCard>
            ))}
        </>
    );
}

export default Crud;
