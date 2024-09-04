import express from 'express';
import { Patient } from '../models/patient.model.js';

const getPatientRequests = async (req, res) => {
    try {
       
        const { role } = req.user; 

        
        let filter = {};

      
        if (role === 'hospital') {
            
            filter.hospital = req.user.hospital; 
        } else if (role === 'patient') {
          
            filter.user = req.user._id; 
        }

        
        const patientRequests = await Patient.find(filter).populate('hospital');

      
        res.status(200).json({
            message: 'Patient requests fetched successfully',
            patientRequests
        });
    } catch (error) {
        console.error('Error while fetching patient requests', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

export { getPatientRequests };
