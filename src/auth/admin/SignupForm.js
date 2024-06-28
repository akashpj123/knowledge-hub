import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MDBInput,  MDBBtn } from 'mdb-react-ui-kit';

function SignupForm() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPass, setConfirmPassword] = useState('');
    axios.defaults.withCredentials = true;

    const submit = (e) => {
        e.preventDefault();
        const user = {
            name: name,
            email: email,
            password: password,
            conform_password: conPass // Corrected variable name
        };

        axios.post('http://localhost:8025/api/admin/signup', user)
            .then(response => {
                navigate('/logingust');
            })
            .catch(error => {
                console.log(error);
            });
    };

    const back = () => {
        navigate('/');
    };

    const log = () => {
        navigate('/loginadmin');
    };

    return (
        <section className="text-center bg-dark">
            {/* Background image */}
            <div className="p-5 bg-image" style={{
                backgroundImage: 'url("https://mdbootstrap.com/img/new/textures/full/171.jpg")',
                height: '350px',
            }}></div>
            {/* Background image */}

            <div className="card mx-auto  shadow-5-strong bg-light" style={{
                marginTop: '-250px',
                backdropFilter: 'blur(90px)',
                width: '50%',
            }}>
                <div className="card-body py-5 px-md-1">
                    <div className="row d-flex justify-content-center">
                        <div className='pb-3'>
                            <button type="button" class="btn btn-primary" onClick={back}>back</button>
                        </div>

                        <button className="btn btn-primary btn-lg" onClick={log}><small>Already signed up?</small><span>&nbsp;Log in</span></button>

                        <div className="col-lg-8">
                            <h2 className="fw-bold mb-5">Sign up now</h2>
                            <form onSubmit={submit}>
                                {/* 2 column grid layout with text inputs for the first and last names */}
                                <div className=" mb-4">
                                    <MDBInput label="First name" id="form3Example1" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                {/* Email input */}
                                <div className="form-outline mb-4">
                                    <MDBInput label="Email address" id="form3Example3" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="row">
                                    {/* Password input */}
                                    <div className="form-outline col-md-6 mb-4">
                                        <MDBInput label="Password" id="form3Example4" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>

                                    {/* Confirm Password input */}
                                    <div className="form-outline col-md-6 mb-4">
                                        <MDBInput label="Confirm Password" id="form3Example5" type="password" value={conPass} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </div>
                                </div>
                                {/* Submit button */}
                                <MDBBtn type="submit" className="btn-block mb-4">Sign up</MDBBtn>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignupForm;
