import { Button, FormControl, Paper, TextField } from "@mui/material";
import * as React from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { addUser } from "../Routes/routes";

const AddUser = () => {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordSecond, setPasswordSecond] = React.useState("");
    const [username, setUsername] = React.useState("");

    const addNewUser = async () => {
        try {
            let response = await axios.post(addUser, {
                firstName: firstName,
                lastName: lastName, 
                email: email,
                status: status,
                username: username,
                password: password,
                passwordSecond: passwordSecond
            });
            let json = await response;

            window.location.reload();
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
                    <TextField
                        id="password" 
                        label="Password"
                        variant="standard"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        id="password" 
                        label="Repeat the password"
                        variant="standard"
                        type="password"
                        value={passwordSecond}
                        onChange={(e) => setPasswordSecond(e.target.value)}
                    />
                    <TextField
                        id="username" 
                        label="Username"
                        variant="standard"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Button variant="contained" onClick={addNewUser}>
                        Save user data
                    </Button>
                </FormControl>
            </Paper>
        </>
    )
}

export default AddUser;