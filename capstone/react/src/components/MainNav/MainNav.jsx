import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import cakeLogo from "./cakeLogo.png";

export default function MainNav() {
  const user = useContext(UserContext);

  return (
    <div className="nav-box">
       <img src={cakeLogo} alt="logo" id="logo" />
    <nav id="main-nav" className="nav-list">
       
     
      <div className="nav-link">
        <NavLink to="/">Home</NavLink>
      </div>
      {user ? (
        <>
          <div   className="nav-link">
            <NavLink to="/userProfile">Profile</NavLink>
          </div>
          <div className="nav-link">
            <Link to="/logout">Logout</Link>
          </div>
        </>
      ) : (
        <div className="nav-link">
          <NavLink to="/login">Login</NavLink>
        </div>
      )}
    </nav>
    </div>
  );
}
