
import { Patient } from "../../models/patientmodel/patient.models.js";

import { Doctor } from "../../models/hospitalmodel/doctor.models.js";

const submitPatientFormAndFindHospital = async (req, res) => {
    try {
        const { name, disease, contact } = req.body;

        
        const doctor = await Doctor.findOne({ specialty: new RegExp(disease, 'i'), availability: true }).populate('hospital');

        if (!doctor || !doctor.hospital) {
            return res.status(404).json({ message: "No suitable hospital found for the given disease." });
        }

       
        const patient = new Patient({
            user: req.user._id,
            name,
            disease,
            hospital: doctor.hospital._id,
            contact,
            status: 'requested'
        });

        const savedPatient = await patient.save();

        res.status(201).json({
            message: "Patient form submitted successfully. Suitable hospital found.",
            patient: savedPatient,
            hospital: doctor.hospital,
        });
    } catch (error) {
        console.error("Error while submitting patient form and finding hospital", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export { submitPatientFormAndFindHospital };
