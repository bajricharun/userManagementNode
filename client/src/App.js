import './App.css';
import { Routes, Route } from 'react-router-dom';
import  UsersPage  from "./Screens/UsersPage";
import EditUser from './Screens/EditUser';
import AssignPermissions from './Screens/AssignPermissions';
import AddUser from './Screens/AddUser';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UsersPage/>}/>
        <Route path="/edit-user/:id" element={<EditUser/>}/>
        <Route path="/assign-permissions/:id" element={<AssignPermissions/>}/>
        <Route path="/add-user" element={<AddUser/>}/>

      </Routes>
    </>
  );
}

export default App;