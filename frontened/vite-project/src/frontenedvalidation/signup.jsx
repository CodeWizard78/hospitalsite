import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'patient'
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/v1/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            const data = await response.json();
            console.log('Registration successful:', data);

            // Navigate based on role
            if (formData.role === 'patient') {
                navigate('/login/patient');
            } else if (formData.role === 'hospital') {
                navigate('/login/hospital');
            }
        } catch (error) {
            console.error('Registration failed:', error.message);
            setError(error.message);
        }
    };

    return (
        <div className="register-container">
            <div className={`register-panel ${formData.role}-panel`}>
                <h2>Register as {formData.role}</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                    <div className="role-selector">
                        <label>
                            <input
                                type="radio"
                                name="role"
                                value="patient"
                                checked={formData.role === 'patient'}
                                onChange={handleChange}
                            />
                            Patient
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="role"
                                value="hospital"
                                checked={formData.role === 'hospital'}
                                onChange={handleChange}
                            />
                            Hospital
                        </label>
                    </div>
                    <button type="submit" className="submit-button">Register</button>
                </form>
            </div>
            <style jsx>{`
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    margin: 0;
                    padding: 0;
                    background: linear-gradient(to right, #2980b9, #6dd5fa, #ffffff);
                    color: #2c3e50;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                .register-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 90%;
                    max-width: 500px;
                    background-color: #ecf0f1;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
                    border-radius: 15px;
                    overflow: hidden;
                }
                .register-panel {
                    width: 100%;
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    border: 2px solid ${formData.role === 'patient' ? '#4caf50' : '#2196f3'};
                }
                .patient-panel {
                    background: linear-gradient(to right, #3498db, #8e44ad);
                    color: #fff;
                }
                .hospital-panel {
                    background: linear-gradient(to right, #e67e22, #f39c12);
                    color: #fff;
                }
                .register-panel h2 {
                    margin-bottom: 20px;
                    font-size: 28px;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                }
                .register-panel form {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .input-field {
                    width: 90%;
                    padding: 15px;
                    margin: 12px 0;
                    border: 1px solid #ddd;
                    border-radius: 25px;
                    outline: none;
                    font-size: 18px;
                    background: rgba(255, 255, 255, 0.8);
                    color: #333;
                }
                .role-selector {
                    display: flex;
                    justify-content: center;
                    margin: 15px 0;
                }
                .role-selector label {
                    margin: 0 15px;
                    font-size: 18px;
                    display: flex;
                    align-items: center;
                }
                .role-selector input[type="radio"] {
                    margin-right: 8px;
                    transform: scale(1.2);
                }
                .submit-button {
                    width: 60%;
                    padding: 15px;
                    border: none;
                    border-radius: 25px;
                    background-color: #4caf50;
                    color: #fff;
                    cursor: pointer;
                    transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
                    font-size: 20px;
                    margin-top: 20px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }
                .submit-button:hover {
                    background-color: #45a049;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
                }
                .error {
                    color: #ff0000;
                    margin-top: 10px;
                    font-size: 16px;
                }
            `}</style>
        </div>
    );
};

export default Register;
