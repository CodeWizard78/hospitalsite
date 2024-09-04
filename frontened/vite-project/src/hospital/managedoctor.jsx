import React, { useState } from 'react';

const ManageDoctors = () => {
  const [form, setForm] = useState({
    name: '',
    specialty: '',
    availability: 'available', // Keep it as a string for the dropdown
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Authorization token is missing. Please log in again.');
      return; 
    }

    try {
      const response = await fetch('http://localhost:8000/api/v1/user/doctors/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          availability: form.availability === 'available' // Convert to boolean before sending
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add doctor.');
      }

      setForm({ name: '', specialty: '', availability: 'available' });
      // Optionally refresh the doctors list here
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="manage-container">
      <h2 className="manage-title">Manage Doctors</h2>
      <form className="manage-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Doctor Name"
          required
          className="manage-input"
        />
        <input
          type="text"
          name="specialty"
          value={form.specialty}
          onChange={handleChange}
          placeholder="Specialty"
          required
          className="manage-input"
        />
        <select
          name="availability"
          value={form.availability}
          onChange={handleChange}
          className="manage-input"
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
        <button type="submit" className="manage-button">
          Add Doctor
        </button>
      </form>
      <style jsx>{`
        .manage-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          min-height: 100vh;
          background-color: #f0f0f0;
          padding: 20px;
        }

        .manage-title {
          font-size: 2rem;
          margin-bottom: 2rem;
          color: #333;
        }

        .manage-form {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 600px;
          padding: 2rem;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-height: 80vh; /* Set a maximum height */
          overflow-y: auto; /* Enable vertical scrolling if needed */
        }

        .manage-input {
          padding: 1rem;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }

        .manage-button {
          padding: 1rem;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .manage-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default ManageDoctors;