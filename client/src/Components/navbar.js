// import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="left-links">
                <a href="/">KinBech</a>
            </div>
            <div className="right-links">
                <button>Sign Up</button>
                <button>Log In</button>
            </div>
        </nav>
    );
}
 
export default NavBar;