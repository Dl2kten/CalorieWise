import express from "express";
import path from "path";

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

//routes
app.get("/", (req, res)=> {
    res.send("home");
})

app.listen(3000, ()=>{
    console.log("Listening to port 3000");
})