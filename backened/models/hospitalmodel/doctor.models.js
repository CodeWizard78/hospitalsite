// models/hospitalmodel/doctor.models.js
import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
    availability: { type: Boolean, default: true } // Ensure this is a Boolean
});

export const Doctor = mongoose.model('Doctor', doctorSchema);