import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

function Editprofile() {
    const [firstName, setFirstName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [address1, setAddress1] = useState('');
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { admin } = useSelector((state) => state.authAdmin);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = user?.token || admin?.token;
                const response = await axios.get(`http://localhost:8025/api/getProfileById/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const postData = response.data;

                setFirstName(postData.firstName);
                setDateOfBirth(postData.dateOfBirth);
                setMobileNumber(postData.mobileNumber);
                setAddress1(postData.address1);
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };

        if (user || admin) {
            fetchData();
        }
    }, [id, user, admin]);

    const submit = async (e) => {
        e.preventDefault();

        const formData = {
            firstName,
            dateOfBirth,
            mobileNumber,
            address1,
        };

        try {
            const token = user?.token || admin?.token;
            const response = await axios.put(`http://localhost:8025/api/updateProfileById/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Post updated successfully:', response.data);
            navigate('/'); // Redirect to home page after successful update
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };



    if (!user && !admin) {
        return <p>Loading user data...</p>;
    }
function back() {
    navigate('/profile'); // Navigate back to home page
}
    return (
        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="profile" />
                        <span className="text-black-50"><p>{user.email}</p></span>
                        <span className="text-black-50">{user.name}</span>
                    </div>
                </div>
                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile</h4>
                        </div>
                        <form onSubmit={submit}>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label className="labels">Name</label>
                                    <input type="text" className="form-control" placeholder="First Name" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label className="labels">Date of Birth</label>
                                    <input type="date" className="form-control" placeholder="Enter Date of Birth" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label className="labels">Mobile Number</label>
                                    <input type="text" className="form-control" placeholder="Enter Phone Number" name="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Address Line 1</label>
                                    <input type="text" className="form-control" placeholder="Enter Address Line 1" name="address1" value={address1} onChange={(e) => setAddress1(e.target.value)} />
                                </div>
                            </div>
                            <div className="mt-5 text-center">
                                <button className="btn btn-primary profile-button"onClick={back} type="submit">Save Profile</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Editprofile;
