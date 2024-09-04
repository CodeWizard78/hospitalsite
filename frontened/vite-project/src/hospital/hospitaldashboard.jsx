import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const HospitalManagement = () => {
  return (
    <div className="hospital-management-container">
      <div className="hospital-management-panel">
        <h2>Hospital Management Dashboard</h2>
        <div className="management-links">
          <Link to="manage-bed" className="management-link">Manage Beds</Link>
          <Link to="manage-doctors" className="management-link">Manage Doctors</Link>
          <Link to="manage-inventory" className="management-link">Manage Inventory</Link>
        </div>
        <div className="management-content">
          <Outlet />
        </div>
      </div>
      <style jsx>{`
        /* Ensure the entire viewport is used */
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }

        .hospital-management-container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(to right, #f7f8f9, #eaeaea);
          color: #2c3e50;
          padding: 20px;
        }

        .hospital-management-panel {
          width: 100%;
          max-width: 900px; /* Maintain a maximum width */
          background-color: #ffffff;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          border-radius: 15px;
          overflow: hidden;
          padding: 40px;
        }

        .hospital-management-panel h2 {
          text-align: center;
          margin-bottom: 20px;
          font-size: 32px; /* Increased font size */
          letter-spacing: 1px;
          color: #333;
        }

        .management-links {
          display: flex;
          justify-content: space-between; /* Adjusted for better spacing */
          margin-bottom: 30px;
        }

        .management-link {
          text-decoration: none;
          color: #fff;
          background-color: #007bff; /* Changed to a vibrant blue */
          padding: 12px 24px; /* Increased padding */
          border-radius: 25px;
          font-size: 18px;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }

        .management-link:hover {
          background-color: #0056b3; /* Darker blue on hover */
          transform: translateY(-2px);
        }

        .management-content {
          background-color: #f9f9f9;
          border-radius: 10px;
          padding: 20px;
          width: 100%; /* Ensure full width */
        }
      `}</style>
    </div>
  );
};

export default HospitalManagement;