import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Createedit() {
    const navigate = useNavigate();
    const { id } = useParams(); // Extracting id from route params
    const [Title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [references, setReferences] = useState('');
    const [categories, setCategories] = useState('');
    const [posterUrl, setPosterUrl] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.auth.user);
    const admin = useSelector((state) => state.authAdmin.admin);

    const fetchData = async () => {
        try {
            const token = user?.token || admin?.token;
            const response = await axios.get(`https://knowledge-back.vercel.app/api/getPostById/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const postData = response.data;
            setTitle(postData.Title);
            setDescription(postData.description);
            setReferences(postData.references);
            setCategories(postData.categories);
            setPosterUrl(postData.posterUrl);
        } catch (error) {
            console.error('Error fetching post data:', error);
            setErrorMsg('Error fetching post data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user || admin) {
            fetchData();
        }
    }, [id, user, admin]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!Title || !description || !references || !categories || !posterUrl) {
            setErrorMsg('All fields are required.');
            return;
        }

        const formData = {
            Title,
            description,
            references,
            categories,
            posterUrl,
        };

        try {
            const token = user?.token || admin?.token;
            await axios.put(`https://knowledge-back.vercel.app/api/updatePostById/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/'); // Redirect to home page after successful update
        } catch (error) {
            console.error('Error updating post:', error);
            setErrorMsg('Error updating post.');
        }
    };

    const handleBack = () => {
        navigate('/'); // Navigate back to home page
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='bg-dark'>
            <main className="container-fluid">
                <div className='row col'>
                    <section className="vh-100">
                        <div className="container-fluid h-custom">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div>
                                    <button className="btn btn-warning" type="button" style={{ backgroundColor: 'red' }} onClick={handleBack}>Back</button>
                                </div>
                                <div className="col-md-9 col-lg-6 col-xl-5">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                        className="img-fluid" alt="Sample image" />
                                    {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                                </div>
                                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                    <form onSubmit={handleSubmit}>
                                        <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                            <p className="lead fw-normal mb-0 me-3 text-white pb-3">Upload</p>
                                        </div>
                                        <div className="form-outline mb-2">
                                            <label className='text-white'>Title</label>
                                            <input type="text" className="form-control form-control-lg bg-white" placeholder="Title" value={Title} onChange={e => setTitle(e.target.value)} />
                                        </div>
                                        <div className="form-outline mb-2">
                                            <label className='text-white'>Description</label>
                                            <textarea className="form-control bg-white text-dark" rows="2" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description"></textarea>
                                        </div>
                                        <div className="form-outline mb-2">
                                            <label className='text-white'>References</label>
                                            <input type="text" className="form-control bg-white text-dark" value={references} onChange={e => setReferences(e.target.value)} placeholder="References" />
                                        </div>
                                        <div className="form-outline mb-2">
                                            <label className='text-white'>Categories</label>
                                            <input type="text" className="form-control bg-white text-dark" value={categories} onChange={e => setCategories(e.target.value)} placeholder="Categories" />
                                        </div>
                                        <div className="form-outline mb-2">
                                            <label className='text-white'>Poster URL</label>
                                            <input type="text" className="form-control bg-white text-dark" value={posterUrl} onChange={e => setPosterUrl(e.target.value)} placeholder="Poster URL" />
                                        </div>
                                        <div className="text-center text-lg-start mt-4 pt-2">
                                            <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Upload</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Createedit;
