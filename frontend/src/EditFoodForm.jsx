import { useState, useEffect } from "react"
import { TextField, Box, Button } from "@mui/material";
import axios from "axios";

export default function EditFoodForm({food, updateFoods}) {
    if(!food) {
        return (
            <h1>No food Item</h1>
        )
    }
    const [data, setData] = useState(food);

    const updateForm = (event) => {
        setData((currData) => {
            return {...currData, [event.target.name]: event.target.value};
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`/api/foods/${food._id}`, data);
            updateFoods();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Box
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off">
            <h1>Edit Food</h1>
            <form onSubmit={handleSubmit}>
                <TextField 
                    name="name" 
                    id="outlined-required" 
                    label="Food Name" 
                    value={data.name} 
                    onChange={updateForm} 
                    required/>
                
                <TextField
                    name="calories"
                    id="outlined-number"
                    label="Calories"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={data.calories}
                    onChange={updateForm}
                />
                <Button color="primary" type="submit">Submit</Button>
            </form>
        </Box>
    )
}