import { Hospital } from "../../models/hospitalmodel/hospital.models.js";

const searchHospitalByName = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Hospital name is required" });
        }

        const hospitals = await Hospital.find({ name: new RegExp(name, 'i') });

        res.status(200).json({
            message: "Hospitals fetched successfully",
            hospitals,
        });
    } catch (error) {
        console.error("Error while searching for hospitals by name", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export { searchHospitalByName };
