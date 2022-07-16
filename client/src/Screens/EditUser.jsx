import { Button, FormControl, Paper, TextField } from "@mui/material";
import * as React from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { editUser } from "../Routes/routes";
import { useParams } from "react-router-dom";

const EditUser = () => {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [email, setEmail] = React.useState("");

    const { id } = useParams();

    const updateUser = async () => {
        try {
            let response = await axios.post(editUser(id), {
                firstName: firstName,
                lastName: lastName, 
                email: email,
                status: status
            });
            let json = await response;

            return { success: true, data: json.data };
        } catch (err) {
            return { success: false, data: err };
        }
    }

    return (
        <>
            <Navbar/>
            <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '5%' }}>
                <FormControl 
                    className="form-control-edit" 
                    style={{
                        position: "absolute",
                        left: "50%", 
                        transform: "translateX(-50%)"
                    }}
                >
                    <TextField
                        id="first-name" 
                        label="First name"
                        variant="standard"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        id="last-name" 
                        label="Last name"
                        variant="standard"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        id="status" 
                        label="Status"
                        variant="standard"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                    <TextField
                        id="email" 
                        label="Email"
                        variant="standard"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button variant="contained" onClick={updateUser}>
                        Save user data
                    </Button>
                </FormControl>
            </Paper>
        </>
    );
}

export default EditUser;