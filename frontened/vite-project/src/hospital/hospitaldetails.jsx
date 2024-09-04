import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { usernameState } from './atom';

const SaveHospitalDetails = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    contact: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const username = useRecoilValue(usernameState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const token = localStorage.getItem("token");

    console.log("Token:", token);  

    try {
      const response = await fetch("http://localhost:8000/api/v1/user/hospital/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => {
          throw new Error('Unexpected server response. Please try again.');
        });
        throw new Error(errorData.error || "Failed to save hospital details");
      }

      const data = await response.json();
      setSuccess(data.message || "Hospital details saved successfully");
      navigate("/hospital-management");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="hospital-details-container">
      <div className="hospital-details-panel">
        <h2>Hello, {username}!</h2>
        <h3>Save Hospital Details</h3>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Hospital Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div>
            <input
              type="text"
              name="contact"
              placeholder="Contact Information"
              value={formData.contact}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-button">Save Details</button>
        </form>
      </div>
      <style jsx>{`
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 0;
          background: linear-gradient(to right, #f7f8f9, #eaeaea);
          color: #2c3e50;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .hospital-details-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 90%;
          max-width: 600px;
          background-color: #ffffff;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          border-radius: 15px;
          overflow: hidden;
        }
        .hospital-details-panel {
          width: 100%;
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          border: 2px solid #f9a825;
          background: linear-gradient(to right, #87ceeb, #00bfff);
          color: #333;
        }
        .hospital-details-panel h2 {
          margin-bottom: 10px;
          font-size: 28px;
          letter-spacing: 1px;
        }
        .hospital-details-panel h3 {
          margin-bottom: 20px;
          font-size: 24px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .hospital-details-panel form {
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
          background: rgba(255, 255, 255, 0.9);
          color: #333;
          min-height: 50px;
        }
        .submit-button {
          width: 60%;
          padding: 15px;
          border: none;
          border-radius: 25px;
          background-color: #87ceeb;
          color: #fff;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
          font-size: 20px;
          margin-top: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .submit-button:hover {
          background-color: #00bfff;
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
        }
        .error {
          color: #e74c3c;
          margin-top: 10px;
          font-size: 16px;
        }
        .success {
          color: #2ecc71;
          margin-top: 10px;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

export default SaveHospitalDetails;