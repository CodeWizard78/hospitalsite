import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true }, 
    disease: { type: String, required: true }, 
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true }, 
    contact: { type: String, required: true }, 
    numberOfBedsNeeded: { type: Number, default: 1 }, 
    isEmergency: { type: Boolean, default: false }, 
    status: { type: String, enum: ['requested', 'under treatment', 'discharged'], default: 'requested' } 
});

export const Patient = mongoose.model('Patient', patientSchema);
