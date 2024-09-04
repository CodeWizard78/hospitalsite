import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    contact: { type: Number, required: true },
});

export const Hospital = mongoose.model('Hospital', hospitalSchema);

