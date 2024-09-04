
import { Doctor } from "../../models/hospitalmodel/doctor.models.js";




const searchHospitalByDisease = async (req, res) => {
    try {
        console.log("called")
        const { disease } = req.body;

        if (!disease) {
            return res.status(400).json({ error: "Disease is required" });
        }

        const doctors = await Doctor.find({ specialty: new RegExp(disease, 'i') }).populate('hospital');

        const hospitals = doctors.map(doctor => doctor.hospital);

        res.status(200).json({
            message: "Hospitals with matching specialty fetched successfully",
            hospitals: [...new Set(hospitals)],
        });
    } catch (error) {
        console.error("Error while searching for hospitals by disease", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export { searchHospitalByDisease };
