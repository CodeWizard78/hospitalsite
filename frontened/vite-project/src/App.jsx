import React from "react";
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Register from "./frontenedvalidation/signup";
import Login from './frontenedvalidation/login';
import SaveHospitalDetails from "./hospital/hospitaldetails";
import HospitalManagement from "./hospital/hospitaldashboard";
import ManageBeds from "./hospital/managebed";
import ManageDoctors from "./hospital/managedoctor";
import ManageInventory from "./hospital/manageinventory";
import SearchHospital from "./patient/searchbyhospital"; // Import SearchHospital
import SearchDisease from "./patient/searchbydisease";   // Import SearchDisease
import PatientDashboard from "./patient/patinetdashboard";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path='/register' element={<Register />} />
          <Route path='/login/patient' element={<Login userType="patient" />} />
          <Route path='/login/hospital' element={<Login userType="hospital" />} />
          
          {/* Patient routes */}
          <Route path='/patient-dashboard' element={<PatientDashboard />} /> {/* New dashboard with both search options */}
          <Route path='/search-hospital' element={<SearchHospital />} /> {/* Search by hospital name */}
          <Route path='/search-disease' element={<SearchDisease />} />   {/* Search by disease */}

          {/* Hospital-specific routes */}
          <Route path='/hospital-details' element={<SaveHospitalDetails />} />

          {/* Protected hospital management routes */}
          <Route path="/hospital-management" element={<HospitalManagement />}>
            <Route path="manage-doctors" element={<ManageDoctors />} />
            <Route path="manage-inventory" element={<ManageInventory />} />
            <Route path="manage-bed" element={<ManageBeds />} />
          </Route>
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
