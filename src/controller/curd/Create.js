import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Create() {
    const navigate = useNavigate();

    // Local state for form inputs and error message
    const [Title, settitle] = useState('');
    const [description, setDescription] = useState('');
    const [references, setReferences] = useState('');
    const [categories, setCategories] = useState('');
    const [posterUrl, setPosterUrl] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // Redux state to retrieve admin token
    const user = useSelector((state) => state.auth.user);
    const admin = useSelector((store) => store.authAdmin.admin);
    // Function to handle form submission

    const submit = (e) => {
        e.preventDefault();

        const formData = {
            Title: Title,
            description: description,
            references: references,
            categories: categories,
            posterUrl: posterUrl,
        };

        // Axios POST request with Authorization header
        axios.post('http://localhost:8025/api/createPost', formData, {
            headers: {
                Authorization: `Bearer ${user.token || admin.token}` // Correctly accessing token here
            },
        })
        .then(response => {
            console.log('Post created:', response.data);
            navigate('/');
        })
        .catch(error => {
            console.error('Error creating post:', error);
            setErrorMsg('Failed to create post. Please try again.');
        });
    };

    // Function to handle navigation back
    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className='bg-dark'>
            <main className="container-fluid">
                <div className='row col'>
                    <section className="vh-100">
                        <div className="container-fluid h-custom">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div>
                                    <Link className="btn btn-warning" type="button" style={{ backgroundColor: 'red' }} onClick={handleBack}>Back</Link>
                                </div>
                                <div className="col-md-9 col-lg-6 col-xl-5">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                        className="img-fluid" alt="Sample image" />
                                    {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                                </div>
                                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                    <form onSubmit={submit}>
                                        <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                            <p className="lead fw-normal mb-0 me-3 text-white pb-3">Upload </p>
                                        </div>
                                        <div className="form-outline mb-2">
                                            <label className='text-white'>Title</label>
                                            <input type="text" className="form-control form-control-lg bg-white" placeholder="Title" value={Title} onChange={e => settitle(e.target.value)} />
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

export default Create;
