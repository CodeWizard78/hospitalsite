import React, { useState } from 'react';

const ManageInventory = () => {
  const [form, setForm] = useState({
    itemName: '',
    quantity: 0,
    threshold: 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/v1/user/inventory/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Failed to add item.');
      }

      setForm({ itemName: '', quantity: 0, threshold: 0 });
      // Optionally refresh the inventory list here
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="manage-container">
      <h3>Manage Inventory</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="itemName"
          value={form.itemName}
          onChange={handleChange}
          placeholder="Item Name"
          required
          className="input-field"
        />
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
          className="input-field"
        />
        <input
          type="number"
          name="threshold"
          value={form.threshold}
          onChange={handleChange}
          placeholder="Threshold"
          required
          className="input-field"
        />
        <button type="submit" className="submit-button">Add Item</button>
      </form>
      <style>
        {`
          .manage-container {
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: auto;
            display: flex;
            flex-direction: column;
            align-items: center; /* Center align items */
            justify-content: flex-start; /* Align items to the top */
            min-height: 50vh; /* Set a minimum height */
            overflow: hidden; /* Prevent overflow */
          }
          .manage-container h3 {
            margin-bottom: 20px;
            font-size: 24px;
            color: #333;
            text-align: center; /* Center the title */
          }
          .input-field {
            width: 100%; /* Ensure full width */
            padding: 12px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 16px;
            box-sizing: border-box; /* Include padding and border in element's total width */
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
          }
          .submit-button:hover {
            background-color: #0056b3;
          }
        `}
      </style>
    </div>
  );
};

export default ManageInventory;