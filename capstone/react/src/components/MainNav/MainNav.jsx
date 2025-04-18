import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import cakeLogo from "./cakeLogo.png";
import styles from "./MainNav.module.css";

export default function MainNav() {
  const user = useContext(UserContext);

  return (
    <div className={styles.navBox} id="nav-box">
      <img src={cakeLogo} alt="logo" className={styles.logo} />
      <h2>Bam's Cakery </h2>
      <nav id="main-nav" className={styles.navList}>
        <div className={styles.navLink}>
          <NavLink to="/">Home</NavLink>
        </div>
        {user ? (
          <>
            <div className={styles.navLink}>
              <NavLink to="/userProfile">Profile</NavLink>
            </div>
            <div className={styles.navLink}>
              <Link to="/logout">Logout</Link>
            </div>
          </>
        ) : (
          <div className={styles.navLink}>
            <NavLink to="/login">Login</NavLink>
          </div>
        )}
      </nav>
    </div>
  );
}
