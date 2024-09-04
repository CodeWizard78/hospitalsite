import mongoose from 'mongoose';

const bedSchema = new mongoose.Schema({
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
    type: { type: String, required: true }, // e.g., 'heart attack', 'accident'
    status: { type: String, enum: ['available', 'occupied'], default: 'available' },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', default: null }
});

export const Bed = mongoose.model('Bed', bedSchema);

