import React, { useState } from 'react';
import './Registration.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';

const Registration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/users/add", formData);
            console.log(response.data);
            navigate('/login');
        } catch (error) {
            setError('There was an error submitting the form. Please try again.');
            console.error('There was an error submitting the form!', error);
        }
    };

    return (
        <div className="back">
            <Header />
            <div className="div-center">
                <div className="content">
                    <h3>Registration</h3>
                    <hr />
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" id="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" id="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobileNumber">Mobile Number</label>
                            <input type="tel" className="form-control" id="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="Mobile Number" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                        <hr />
                        <button type="button" className="btn btn-link" onClick={() => navigate('/login')}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;
