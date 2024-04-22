import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    servingSize: String,
    nutrition: {
        energy: Number,
        fat: Number,
        cholesterol: Number,
        sodium: Number,
        carbs: Number,
        fibre: Number,
        protein: Number,
        vitaminD: Number,
        calcium: Number,
        iron: Number,
        potassium: Number,
    },
    calories: Number,
    category: String,
    time: Number,
})

export const Food = mongoose.model("Food", FoodSchema);