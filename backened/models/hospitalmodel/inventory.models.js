import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true },
    threshold: { type: Number, required: true }, 
});

 export const Inventory = mongoose.model('Inventory', inventorySchema);

