import express from "express";
import { Hospital } from "../../models/hospitalmodel/hospital.models.js";
import { User } from "../../models/common/user.models.js";

const saveHospitalDetails = async (req, res) => {
    try {
        const { name, location, contact } = req.body;

        const user = await User.findById(req.user._id);
        if (user.role !== 'hospital') {
            return res.status(403).json({ error: "Access denied. Only hospitals can perform this action." });
        }

        const existingHospital = await Hospital.findOne({ user: req.user._id });
        if (existingHospital) {
            return res.status(400).json({ error: "Hospital details already exist for this user." });
        }

        const hospital = new Hospital({
            user: req.user._id,  
            name,
            location,
            contact
        });

        const savedHospital = await hospital.save();

        res.status(201).json({
            message: "Hospital details saved successfully",
            hospital: savedHospital
        });
    } catch (error) {
        console.error("Error while saving hospital details", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export { saveHospitalDetails };
