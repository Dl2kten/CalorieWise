import './App.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import {CssBaseline} from "@mui/material";
import {List, ListItem, ListItemButton} from "@mui/material";

function App() {

  const [foodItems, setFoodItems] = useState([]);

  useEffect(()=> {
    const fetchFoods = async () => {
      try {
        const response = await axios.get("/api/foods");
        setFoodItems(response.data);
      } catch(err) {
        console.error(err);
      }
    };
    fetchFoods();
  }, []);

  return (
    <>
      <CssBaseline />
      <h1>All Foods</h1>
      <ul>
        {foodItems.map((food) => {
          return <li key={food._id}>{food.name}</li>
        })}
      </ul>
    </>
  )
}

export default App
