import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    disease: { type: String, required: true }, 
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
    admittedDate: { type: Date, default: Date.now }
});

export const AdmitPatient = mongoose.model('AdmitPatient', patientSchema);
