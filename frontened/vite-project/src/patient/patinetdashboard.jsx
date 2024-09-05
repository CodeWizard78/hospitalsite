import React from 'react';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="patient-dashboard">
      <h2>Welcome to the Patient Dashboard</h2>
      <p>Select an option below to search:</p>

      <div className="search-options">
        <button onClick={() => navigate('/search-hospital')}>Search by Hospital</button>
        <button onClick={() => navigate('/search-disease')}>Search by Disease</button>
      </div>

      <style>
        {`
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 0;
          background: linear-gradient(to right, #2980b9, #6dd5fa, #ffffff);
          color: #2c3e50;
        }
        .patient-dashboard {
          text-align: center;
          padding: 40px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 15px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          max-width: 600px;
          margin: 40px auto;
        }
        h2 {
          font-size: 28px;
          margin-bottom: 20px;
          color: #2980b9;
        }
        p {
          font-size: 18px;
          color: #34495e;
          margin-bottom: 30px;
        }
        .search-options {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .search-options button {
          width: 80%;
          max-width: 300px;
          padding: 15px;
          margin: 10px 0;
          border: none;
          border-radius: 25px;
          background-color: #3498db;
          color: #fff;
          font-size: 18px;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .search-options button:hover {
          background-color: #2980b9;
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
        }
        .search-options button:active {
          background-color: #1f6fa1;
        }
        `}
      </style>
    </div>
  );
};

export default PatientDashboard;
