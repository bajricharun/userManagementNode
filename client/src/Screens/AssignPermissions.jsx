import { Button, Checkbox, FormControl, InputLabel, ListItemIcon, ListItemText, MenuItem, Paper, Select } from "@mui/material";
import * as React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { addPermissions, viewPermissions, viewPermissionsForUser } from "../Routes/routes";
import Navbar from "../Components/Navbar";

const AssignPermissions = () => {

    const { id } = useParams();
    const [data, setData] = React.useState([]);
    const [dataForUser, setDataForUser ] = React.useState([]);
    const [selected, setSelected] = React.useState([]);

    
    const fetchPermissionsForUser = async () => {
        try {
            let response = await axios.get(viewPermissionsForUser(id));
            let json = await response;
            console.log(json.data);
            return { success: true, data: json.data };
        } catch (err) {
            return { success: false, data: err };
        }
    }

    const fetchPermissions = async () => {
        try {
            let response = await axios.get(viewPermissions);
            let json = await response;
            return { success: true, data: json.data };
        } catch (err) {
            return { success: false, data: err };
        }
    }


    const assignPermissions = async () => {
        try {
            let response = await axios.post(addPermissions(id), {permissionsId: selected});
            let json = await response;
            window.location.reload();

            return { success: true, data: json.data };
        } catch (err) {
            return { success: false, data: err }
        }
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setSelected(value);
      };
    
    React.useEffect(() => {
        (async () => {
            let res = await fetchPermissionsForUser();
            let resSec = await fetchPermissions();
            console.log(resSec.data.payload);
            if (resSec.success) {
                setData(resSec.data.payload);
            }

            if (res.success) {
                setDataForUser(res.data.payload);
                console.log(res.data.payload);
            } 
        })();
    }, []);

    return (
        <>
            <Navbar/>
            <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '5%' }}>
            This user has following permissions:<br/>
            {dataForUser.permissions ? dataForUser.permissions.map(elem => {
                return <>{elem.description}<br/></>
            }) : <></>}<br/>
            {/* {dataForUser.permissions.map(elem => {
                return <>{elem.code}</>
            })} */}
            <FormControl>
                <InputLabel id="mutiple-select-label">Privilleges</InputLabel>
                <Select
                    labelId="mutiple-select-label"
                    multiple
                    value={selected}
                    onChange={handleChange}
                    renderValue={(selected) => selected.join(", ")}
                >
                    {data.map((el) => (
                    <MenuItem key={el.id} value={el.code}>
                        <ListItemIcon>
                            <Checkbox/>
                        </ListItemIcon>
                        <ListItemText primary={el.description} />
                    </MenuItem>
                    ))}
                </Select>
                <Button onClick={assignPermissions}>Assign permissions</Button>
            </FormControl>
            </Paper>
        </>
    );
}

export default AssignPermissions;