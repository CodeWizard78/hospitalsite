
import { Bed } from "../../models/hospitalmodel/bed.models.js";
import { Hospital } from "../../models/hospitalmodel/hospital.models.js";


const manageBeds = async (req, res) => {
    try {
        const { type, status, patientId } = req.body;

        const hospital = await Hospital.findOne({ user: req.user._id });
        if (!hospital) {
            return res.status(403).json({ error: "Access denied. Only hospitals can perform this action." });
        }

        const bed = new Bed({
            hospital: hospital._id,
            type,
            status,
            patient: patientId || null
        });

        const savedBed = await bed.save();

        res.status(201).json({
            message: "Bed details saved successfully",
            bed: savedBed
        });
    } catch (error) {
        console.error("Error while managing bed details", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

const updateBed = async (req, res) => {
    try {
        const { bedId } = req.params;
        const { type, status, patientId } = req.body;

        const hospital = await Hospital.findOne({ user: req.user._id });
        if (!hospital) {
            return res.status(403).json({ error: "Access denied. Only hospitals can perform this action." });
        }

        const bed = await Bed.findById(bedId);
        if (!bed || bed.hospital.toString() !== hospital._id.toString()) {
            return res.status(404).json({ error: "Bed not found or not associated with this hospital" });
        }

        bed.type = type || bed.type;
        bed.status = status || bed.status;
        bed.patient = patientId || bed.patient;

        const updatedBed = await bed.save();

        res.status(200).json({
            message: "Bed details updated successfully",
            bed: updatedBed
        });
    } catch (error) {
        console.error("Error while updating bed details", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

const getBeds = async (req, res) => {
    try {
        const hospital = await Hospital.findOne({ user: req.user._id });
        if (!hospital) {
            return res.status(403).json({ error: "Access denied. Only hospitals can perform this action." });
        }

        const { status } = req.query;
        const filter = { hospital: hospital._id };
        if (status) {
            filter.status = status;
        }

        const beds = await Bed.find(filter);

        res.status(200).json({
            message: "Beds fetched successfully",
            beds
        });
    } catch (error) {
        console.error("Error while fetching bed details", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export { manageBeds, updateBed, getBeds };

