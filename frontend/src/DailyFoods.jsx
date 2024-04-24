import { useState, useEffect } from 'react';
import axios from "axios";
import {List, ListItem, ListItemButton, Button} from "@mui/material";
import AddFoodForm from './AddFoodForm';
import EditFoodForm from './EditFoodForm';

export default function DailyFoods() {
    const [foodItems, setFoodItems] = useState([]);

    const fetchFoods = async () => {
      try {
        const response = await axios.get("/api/foods");
        setFoodItems(response.data);
      } catch(err) {
        console.error(err);
      }
    };

    useEffect(()=> {
      fetchFoods();
    }, []);

    const handleDelete = async (id) => {
      try {
        await axios.delete(`/api/foods/${id}`);
        fetchFoods();
      } catch (err) {
        console.error(err);
      }
    }

    return (
        <div>
            <h1>All Foods</h1>
            <ul>
                {foodItems.map((food) => {
                    return <li key={food._id}>{food.name} - {food.calories} kCal
                    <Button onClick={()=>handleDelete(food._id)}>Delete</Button></li>
                })}
            </ul>
            <AddFoodForm updateFoods={fetchFoods}/>
            {foodItems.length && <EditFoodForm food={foodItems[0]} updateFoods={fetchFoods}/>}    
        </div>
    )
}