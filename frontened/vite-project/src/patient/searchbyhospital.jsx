import React, { useState } from 'react';
import { Search, Phone, MapPin, Clock } from 'lucide-react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const SearchHospital = () => {
  const [name, setName] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      const response = await fetch('http://localhost:8000/api/v1/user/search-hospital-by-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      const contentType = response.headers.get('Content-Type');
      if (!response.ok) {
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          throw new Error(data.message || 'Failed to fetch hospitals');
        } else {
          const text = await response.text();
          throw new Error(`Failed to fetch hospitals. The server returned a non-JSON response. Response: ${text}`);
        }
      }

      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setHospitals(data.hospitals || []);
      } else {
        throw new Error('Unexpected response format. The server did not return JSON.');
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
      setHospitals([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-hospital">
      <h2 className="title">Find Hospitals by Name</h2>
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Enter hospital name"
            value={name}
            onChange={handleChange}
            required
            className="search-input"
          />
        </div>
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="hospital-list">
        {hospitals.length > 0 ? (
          hospitals.map((hospital) => (
            <div key={hospital._id} className="hospital-card">
              <h3 className="hospital-name">{hospital.name}</h3>
              <div className="hospital-details">
                <p>
                  <MapPin size={16} data-tip={hospital.location} /> {hospital.location}
                </p>
                <p>
                  <Phone size={16} data-tip={hospital.contact} /> {hospital.contact}
                </p>
                <p>
                  <Clock size={16} /> Operating Hours: 9 AM - 5 PM
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No hospitals found. Try a different search term.</p>
        )}
      </div>
      <ReactTooltip place="top" type="dark" effect="solid" />
      <style jsx>{`
        .search-hospital {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          font-family: 'Arial', sans-serif;
          overflow: hidden; /* Ensure no overflow */
        }

        .title {
          font-size: 32px;
          font-weight: 600;
          text-align: center;
          margin-bottom: 30px;
          color: #2c3e50;
        }

        .search-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: stretch; /* Allow items to stretch */
        }

        .search-input-wrapper {
          position: relative;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          top: 50%;
          left: 15px;
          transform: translateY(-50%);
          color: #3498db;
        }

        .search-input {
          width: 100%;
          padding: 15px 45px;
          border: 2px solid #3498db;
          border-radius: 8px;
          font-size: 18px;
          color: #34495e;
          transition: border-color 0.3s;
          box-sizing: border-box; /* Ensure padding is included in width */
        }

        .search-input:focus {
          border-color: #2980b9;
          outline: none;
          box-shadow: 0 0 5px rgba(41, 128, 185, 0.5);
        }

        .search-button {
          padding: 15px 35px;
          background-color: #3498db;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
        }

        .search-button:hover {
          background-color: #2980b9;
          transform: translateY(-2px);
        }

        .search-button:disabled {
          background-color: #bdc3c7;
          cursor: not-allowed;
        }

        .hospital-list {
          margin-top: 40px;
        }

        .hospital-card {
          padding: 25px;
          border: 1px solid #ddd;
          border-radius: 10px;
          margin-bottom: 25px;
          background-color: #f7f9fc;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .hospital-name {
          font-size: 24px;
          font-weight: 500;
          color: #2980b9;
          margin-bottom: 10px;
        }

        .hospital-details p {
          margin: 8px 0;
          color: #555;
        }

        .error {
          color: red;
          text-align: center;
          margin-top: 20px;
        }

        .no-results {
          text-align: center;
          color: #999;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

export default SearchHospital;