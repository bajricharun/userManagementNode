import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
    return (
        <>
            <div className="flexNavbar">
                <div className="flexelem">
                    <Button variant="outlined">
                        <Link to="/" className="links">Home</Link>
                    </Button>
                </div>
            </div>
        </>
    );

}

export default Navbar;