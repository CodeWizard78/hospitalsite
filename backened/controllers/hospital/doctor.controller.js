// controllers/doctorController.js
import { Doctor } from "../../models/hospitalmodel/doctor.models.js";
import { Hospital } from "../../models/hospitalmodel/hospital.models.js";

const manageDoctors = async (req, res) => {
    try {
        const { name, specialty, availability } = req.body;

        const hospital = await Hospital.findOne({ user: req.user._id });
        if (!hospital) {
            return res.status(403).json({ error: "Access denied. Only hospitals can perform this action." });
        }

        const doctor = new Doctor({
            name,
            specialty,
            hospital: hospital._id,
            availability: availability === 'available' // Convert string to boolean
        });

        const savedDoctor = await doctor.save();

        res.status(201).json({
            message: "Doctor details saved successfully",
            doctor: savedDoctor
        });
    } catch (error) {
        console.error("Error while managing doctor details", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

const updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, specialty, availability } = req.body;

        const hospital = await Hospital.findOne({ user: req.user._id });
        if (!hospital) {
            return res.status(403).json({ error: "Access denied. Only hospitals can perform this action." });
        }

        const updatedDoctor = await Doctor.findOneAndUpdate(
            { _id: id, hospital: hospital._id },
            { name, specialty, availability: availability === 'available' }, // Convert string to boolean
            { new: true }
        );

        if (!updatedDoctor) {
            return res.status(404).json({ error: "Doctor not found or not associated with the hospital" });
        }

        res.status(200).json({
            message: "Doctor details updated successfully",
            doctor: updatedDoctor
        });
    } catch (error) {
        console.error("Error while updating doctor details", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

const getDoctors = async (req, res) => {
    try {
        const hospital = await Hospital.findOne({ user: req.user._id });
        if (!hospital) {
            return res.status(403).json({ error: "Access denied. Only hospitals can perform this action." });
        }

        const doctors = await Doctor.find({ hospital: hospital._id });

        res.status(200).json({
            message: "Doctors fetched successfully",
            doctors
        });
    } catch (error) {
        console.error("Error while fetching doctor details", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export { manageDoctors, updateDoctor, getDoctors };