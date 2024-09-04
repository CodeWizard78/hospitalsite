import express from "express";
import { Inventory } from "../../models/hospitalmodel/inventory.models.js";
import { Hospital } from "../../models/hospitalmodel/hospital.models.js";

const manageInventory = async (req, res) => {
    try {
        const { itemName, quantity, threshold } = req.body;
        const { id } = req.params; 

        const hospital = await Hospital.findOne({ user: req.user._id });
        if (!hospital) {
            return res.status(403).json({ error: "Access denied. Only hospitals can perform this action." });
        }

        if (req.method === 'POST') {
            
            const inventoryItem = new Inventory({
                hospital: hospital._id,
                itemName,
                quantity,
                threshold
            });

            const savedInventoryItem = await inventoryItem.save();

            return res.status(201).json({
                message: "Inventory item details saved successfully",
                inventory: savedInventoryItem
            });
        }

        if (req.method === 'PUT') {
            
            if (!id) {
                return res.status(400).json({ error: "Inventory item ID is required for update" });
            }

            const updatedItem = await Inventory.findByIdAndUpdate(
                id,
                { $set: { quantity, threshold } }, 
                { new: true, runValidators: true } 
            );

            if (!updatedItem) {
                return res.status(404).json({ error: "Inventory item not found" });
            }

            return res.status(200).json({
                message: "Inventory item updated successfully",
                inventory: updatedItem
            });
        }

        if (req.method === 'GET') {
            
            const items = await Inventory.find({ hospital: hospital._id });

            return res.status(200).json({
                message: "Inventory items fetched successfully",
                items
            });
        }

        return res.status(405).json({ error: "Method Not Allowed" }); 
    } catch (error) {
        console.error("Error while managing inventory details", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export{manageInventory}
