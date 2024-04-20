import express from "express";
import path from "path";
import mongoose from "mongoose";
import {Food} from "./models/Food.js";

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

mongoose.connect('mongodb://127.0.0.1:27017/calorie-wise')
    .then(()=>{console.log("Mongo connection open")})
    .catch((err)=>{console.log("Mongo connection error", err)});

//routes
app.get("/addFood", async (req, res) => {
    const food = new Food({name: "Apple", amount: 1, servingSize: "Med-200g", calories: 200});
    await food.save();
    const allFood = await Food.find();
    res.send(allFood);
})

app.get("/", (req, res)=> {
    res.send("home");
})

app.listen(3000, ()=>{
    console.log("Listening to port 3000");
})