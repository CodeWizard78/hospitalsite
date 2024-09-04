import express from "express";
import { Doctor } from "../../models/hospitalmodel/doctor.models.js";
import { Bed } from "../../models/hospitalmodel/bed.models.js";
import { Patient } from "../../models/patientmodel/patient.models.js";

const bookDoctorAndBed = async (req, res) => {
    try {
        const { disease, patientId, hospitalId } = req.body;
        
        console.log("Searching for doctor with:", { disease, hospitalId });

        const doctorsInHospital = await Doctor.find({ hospital: hospitalId });
        console.log(`Found ${doctorsInHospital.length} doctors in hospital ${hospitalId}`);

        const doctorsWithSpecialty = await Doctor.find({ hospital: hospitalId, specialty: disease });
        console.log(`Found ${doctorsWithSpecialty.length} doctors with specialty ${disease} in hospital ${hospitalId}`);

        const doctor = await Doctor.findOne({
            specialty: disease,
            hospital: hospitalId,
            availability: true,
        });
        
        if (!doctor) {
            console.log(`No available doctors found for specialty ${disease} in hospital ${hospitalId}.`);
            return res.status(404).json({ message: "No available doctor found for this disease in the specified hospital." });
        }
        
        console.log("Doctor found:", doctor);

        // Debug bed search
        console.log("Searching for bed with:", { disease, hospitalId });
        
        const allBeds = await Bed.find({ hospital: hospitalId });
        console.log(`Found ${allBeds.length} total beds in hospital ${hospitalId}`);

        const bedsWithType = await Bed.find({ hospital: hospitalId, type: disease });
        console.log(`Found ${bedsWithType.length} beds of type ${disease} in hospital ${hospitalId}`);

        const bed = await Bed.findOne({
            hospital: hospitalId,
            type: disease,
            status: "available",
        });
        
        if (!bed) {
            console.log(`No available beds found for type ${disease} in hospital ${hospitalId}.`);
            return res.status(404).json({ message: "No available bed found for this disease in the specified hospital." });
        }
        
        console.log("Bed found:", bed);

        bed.status = "occupied";
        bed.patient = patientId;
        await bed.save();
        
        doctor.availability = false;
        await doctor.save();
        
        await Patient.findByIdAndUpdate(patientId, {
            hospital: hospitalId,
            status: "under treatment",
        });
        
        res.status(200).json({
            message: "Doctor and bed booked successfully",
            doctor,
            bed,
        });
    } catch (error) {
        console.error("Error while booking doctor and bed:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export { bookDoctorAndBed };