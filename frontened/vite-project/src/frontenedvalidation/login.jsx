import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { usernameState } from '../hospital/atom';

const Login = ({ userType }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const setUsername = useSetRecoilState(usernameState);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, role: userType }),
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            console.log('Login successful:', data);
            localStorage.setItem("token", data.accessToken);
            setUsername(formData.username);

            // Navigate to appropriate dashboard
            if (userType === 'hospital') {
                navigate('/hospital-details');
            } else if (userType === 'patient') {
                navigate('/patient-dashboard'); // Navigate to patient dashboard
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login failed:', error.message);
            setError(error.message);
        }
    };

    return (
        <div className="login-container">
            <div className={`login-panel ${userType}-panel`}>
                <h2>Login as {userType || 'User'}</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
            <style>
                {`
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
                .login-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 80%;
                    max-width: 400px;
                    background-color: #ecf0f1;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
                    border-radius: 15px;
                    overflow: hidden;
                }
                .login-panel {
                    width: 100%;
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }
                .patient-panel {
                    background: linear-gradient(to right, #3498db, #8e44ad);
                    color: #fff;
                }
                .hospital-panel {
                    background: linear-gradient(to right, #e67e22, #f39c12);
                    color: #fff;
                }
                .login-panel h2 {
                    margin-bottom: 20px;
                    font-size: 26px;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                }
                .login-panel form {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .login-panel input {
                    width: 80%;
                    padding: 12px;
                    margin: 10px 0;
                    border: none;
                    border-radius: 25px;
                    outline: none;
                    font-size: 16px;
                    background: rgba(255, 255, 255, 0.7);
                    color: #333;
                }
                .login-panel button {
                    width: 50%;
                    padding: 12px;
                    border: none;
                    border-radius: 25px;
                    background-color: #fff;
                    color: #333;
                    cursor: pointer;
                    transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
                    font-size: 18px;
                    margin-top: 15px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }
                .login-panel button:hover {
                    background-color: #ecf0f1;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
                }
                .error {
                    color: #e74c3c;
                    margin-top: 10px;
                }
                `}
            </style>
        </div>
    );
};

export default Login;
