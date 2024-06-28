import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/authSlice';

function Logingust() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://knowledge-back.vercel.app/api/login', {
                
                email: email,
                password: password,
             
            })
            console.log(response.data); // Check what fields are available in the response
            
            const user ={
                // Assuming userId is returned from API
            email: email,
            token: response.data.token,
            };
            
            console.log(user); // Check the user object before dispatching
            
           
            dispatch(setUser(user));
            navigate('/');
            console.log(response.data.token);
        } catch (error) {
            if (error.response.data.errors) {
                setErrorMessage(Object.values(error.response.data.errors).join(' '));
            } else if (error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Failed to login user. Please contact admin');
            }
        }
    
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
            <div
                className="p-5 bg-image"
                style={{
                    backgroundImage: 'url("https://mdbootstrap.com/img/new/textures/full/171.jpg")',
                    height: '400px',
                }}
            ></div>
            {/* Background image */}

            <div
                className="card mx-auto shadow-5-strong bg-light"
                style={{
                    marginTop: '-250px',
                    backdropFilter: 'blur(90px)',
                    width: '50%',
                }}
            >
                <div className="card-body py-5 px-md-1">
                    <div className="row d-flex justify-content-center">
                        <div className='pb-3'>
                            <button type="button" className="btn btn-primary" onClick={back}>back</button>
                        </div>

                        <button className="btn btn-primary btn-lg" onClick={log}><small>Are u Signup up?</small><span>&nbsp;Signup</span></button>

                        <div className="col-lg-8">
                            <h2 className="fw-bold mb-5">Login now</h2>
                            <form onSubmit={submit}>


                                {/* Email input */}
                                <div className="form-outline mb-4">
                                    <MDBInput label="Email address" id="form3Example3" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>


                                {/* Password input */}
                                <div className="form-outline  mb-4">
                                    <MDBInput label="Password" id="form3Example4" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                {/* Submit button */}
                                <MDBBtn type="submit" className="btn-block mb-4">Login</MDBBtn>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Logingust;
