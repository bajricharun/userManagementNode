import * as React from 'react';
import axios from "axios";
import { 
    Button,
    FormControl, 
    MenuItem, 
    Select, 
    TextField,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import { deleteUser, filterUsers, viewUsers } from "../Routes/routes";
import Navbar from "../Components/Navbar";
import { useNavigate } from 'react-router-dom';

const UserPage = () => {

    const [data, setData] = React.useState([]);
    const [searchBy, setSearchBy] = React.useState("firstName");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchTerm, setSearchTerm] = React.useState("");

    const columns = [
        {id: 'id', label: 'uid', minWidth: 15},
        {id: 'firstName', label: 'first name', minWidth: 60},
        {id: 'lastName', label: 'last name', minWidth: 60},
        {id: 'username', label: 'username', minWidth: 50},
        {id: 'status', label: 'status', minWidth: 40},
        {id: 'editUser', label: 'Edit user', link: "/edit-user", minWidth: 75},
        {id: 'assignPermissions', label: 'Assign Permissions', link: "/assign-permissions", minWidth: 75},
        {id: 'deleteUser', label: 'Delete user', minWidth: 75},
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    
    const handleChange = (event) => {
        setSearchBy(event.target.value);
      };

    const navigate = useNavigate();
      
    const fetchUsers = async () => {
        try {
            let response = await axios.get(viewUsers);
            let json = await response;

            return { success: true, data: json.data };
        } catch (err) {
            return { success: false, data: err };
        }
    }

    const filterData = async () => {
        try {
            let response = await axios.get(filterUsers(searchBy, searchTerm));
            let json = await response;

            setData(json.data.payload);
            return { success: true, data: json.data };
        } catch (err) {
            return { success: false, data: err };
        }
    }

    const deleteUserFromDatabase = async (id) => {
        try {
            let response = await axios.post(deleteUser(id));
            let json = await response;
            console.log(json);

            let index = data.findIndex(el => el.id === id);
            data.splice(index, 1);
            setPage(page);
        } catch (err) {
            return {success: false, data: err};
        }
    }

    React.useEffect(() => {
        (async () => {
            let res = await fetchUsers();
            if (res.success) {
                setData(res.data.payload);
            } else {
                console.log(res.data);
            }
        })();
    }, []);

  return (
    <>
        <Navbar/>
        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '5%' }}>
            <FormControl 
                variant="standard" 
                className="form-control"
                style={{
                    display: "flex", 
                    flexDirection: "row",
                    width: "50%",
                    justifyContent: "space-between",
                    marginLeft: "10%"
                }}
            >
                <Select
                    value={searchBy} 
                    onChange={handleChange}
                    label="Search by"
                >
                    <MenuItem value="firstName">First name</MenuItem>
                    <MenuItem value="lastName">Last name</MenuItem>
                    <MenuItem value="username">username</MenuItem>
                    <MenuItem value="email">Email</MenuItem>
                    <MenuItem value="status">Status</MenuItem>

                </Select>
                <TextField
                    id="search-term" 
                    label="Search term"
                    variant="standard"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="contained" onClick={filterData}>Filter</Button>
                <Button variant="contained" onClick={() => navigate(`/add-user`)}>Add new user</Button>
            </FormControl>
            <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader aria-label="paginated table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            {columns.map((column) => {
                            const value = row[column.id];

                            if (column.id === 'deleteUser') {
                                return <TableCell key={column.id}>
                                    <Button variant="outlined" onClick={() => deleteUserFromDatabase(row.id) }>{column.label}</Button>
                                </TableCell>
                            }

                            if (column.id === 'assignPermissions' || column.id === 'editUser') {
                                return (
                                    <TableCell key={column.id}>
                                        <Button variant="outlined" onClick={() => navigate(`${column.link}/${row.id}`)}>{column.label}</Button>
                                    </TableCell>
                                )
                            }
                            return (
                                <TableCell key={column.id}>
                                    {value}
                                </TableCell>
                            );
                            })}
                        </TableRow>
                        );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    </>
  );
}

export default UserPage;