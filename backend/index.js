import express from "express";
import path from "path";
import mongoose from "mongoose";
import {Food} from "./models/Food.js";

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

//middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/calorie-wise')
    .then(()=>{console.log("Mongo connection open")})
    .catch((err)=>{console.log("Mongo connection error", err)});

//routes
//index route
app.get("/foods", async(req, res) => {
    try{
    const allFoods = await Food.find();
    res.status(201).json(allFoods);
    } catch(err) {
        console.error(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

//show route
app.get("/foods/:id", async(req, res) => {
    try{
        const food = await Food.findById(req.params.id);
        res.status(201).json(food);
    } catch(err) {
        console.error(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

//new route
app.post("/foods", async(req, res) => {
    try{
        const food = new Food(req.body);
        await food.save();
        res.status(201).json(food);
    } catch(err) {
        console.error(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

//edit route
app.put("/foods/:id", async(req, res) => {
    try {
        const food = await Food.findByIdAndUpdate(req.params.id, {...req.body},
        {runValidators: true, new: true});
        res.status(201).json(food);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

//delete route
app.delete("/foods/:id", async(req, res) => {
    try {
        await Food.findByIdAndDelete(req.params.id);
        res.status(201);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

app.get("/", (req, res)=> {
    res.send("home");
})

app.listen(3000, ()=>{
    console.log("Listening to port 3000");
})