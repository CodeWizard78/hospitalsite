import React, { useState } from 'react';

const ManageBeds = () => {
  const [form, setForm] = useState({
    type: '',
    status: 'available',
    patientId: '',
  });
  const [patients, setPatients] = useState([]); // assuming this will be populated later

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/v1/user/beds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Failed to add bed.');
      }

      // Optionally refresh the beds list here
      setForm({ type: '', status: 'available', patientId: '' });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="manage-container">
      <h3>Manage Beds</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="type"
          value={form.type}
          onChange={handleChange}
          placeholder="Bed Type"
          required
          className="input-field"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="input-field"
        >
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
        </select>
        {form.status === 'occupied' && (
          <select
            name="patientId"
            value={form.patientId}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Select Patient</option>
            {patients.map(patient => (
              <option key={patient._id} value={patient._id}>
                {patient.name}
              </option>
            ))}
          </select>
        )}
        <button type="submit" className="submit-button">Add Bed</button>
      </form>
      <style>
        {`
          .manage-container {
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 100%; /* Set to 100% to take full width */
            max-width: 600px; /* Set a max-width for better layout */
            margin: auto; /* Center the container */
            overflow: hidden; /* Prevent overflow */
            position: relative; /* Positioning context for children */
          }
          .manage-container h3 {
            margin-bottom: 20px;
            font-size: 24px;
            color: #333;
            text-align: center; /* Center the header */
          }
          .input-field {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 16px;
            box-sizing: border-box;
          }
          .submit-button {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 4px;
            background-color: #007bff;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s ease;
            font-size: 16px;
          }
          .submit-button:hover {
            background-color: #0056b3;
          }
        `}
      </style>
    </div>
  );
};

export default ManageBeds;