import { useState } from "react"
import { TextField, Box, Button } from "@mui/material";
import axios from "axios";

export default function AddFoodForm({updateFoods}) {
    const initialData = {
        name: "", amount: 0, servingSize: "", nutrition: {}, calories: 0, category: "", time: 0
    };

    const [data, setData] = useState(initialData);

    const updateForm = (event) => {
        setData((currData) => {
            return {...currData, [event.target.name]: event.target.value};
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/api/foods", data);
            updateFoods();
            setData(initialData);
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
            autoComplete="off"
        ><form onSubmit={handleSubmit}>
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