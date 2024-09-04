

import mongoose from "mongoose";
import { AdmitPatient } from "../../models/hospitalmodel/admitedpatient.models.js";
import { Hospital } from "../../models/hospitalmodel/hospital.models.js";


const getPatientsByDisease = async (req, res) => {
    try {
        const hospital = await Hospital.findOne({ user: req.user._id });
        if (!hospital) {
            return res.status(403).json({ error: "Access denied. Only hospitals can perform this action." });
        }

        const patientsByDisease = await AdmitPatient.aggregate([
            { $match: { hospital: mongoose.Types.ObjectId(hospital._id) } },
            { $group: { _id: "$disease", count: { $sum: 1 } } }
        ]);

        res.status(200).json({
            message: "Patients by disease fetched successfully",
            patientsByDisease
        });
    } catch (error) {
        console.error("Error while fetching patients by disease", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

const getPatientDetailsByDisease = async (req, res) => {
    try {
        const { disease } = req.params;

        const hospital = await Hospital.findOne({ user: req.user._id });
        if (!hospital) {
            return res.status(403).json({ error: "Access denied. Only hospitals can perform this action." });
        }

        const patients = await AdmitPatient.find({ hospital: mongoose.Types.ObjectId(hospital._id), disease });
        
        res.status(200).json({
            message: "Patient details by disease fetched successfully",
            patients
        });
    } catch (error) {
        console.error("Error while fetching patient details by disease", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

const getAllAdmittedPatients = async (req, res) => {
    try {
        const hospital = await Hospital.findOne({ user: req.user._id });
        if (!hospital) {
            return res.status(403).json({ error: "Access denied. Only hospitals can perform this action." });
        }

        const admittedPatients = await AdmitPatient.find({ hospital: mongoose.Types.ObjectId(hospital._id) });

        res.status(200).json({
            message: "All admitted patients fetched successfully",
            admittedPatients
        });
    } catch (error) {
        console.error("Error while fetching all admitted patients", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export { getPatientsByDisease, getPatientDetailsByDisease, getAllAdmittedPatients };

