import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import cakeLogo from "./cakeLogo.png";
import styles from "./MainNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { isAdmin } from "../../services/UserHelper";

export default function MainNav() {
  const user = useContext(UserContext);

  return (
    <div className={styles.navBox} id="nav-box">
      <img src={cakeLogo} alt="logo" className={styles.logo} />
      <h2 className={styles.logoText}>Bams Cakery </h2>
      <nav id="main-nav" className={styles.navList}>
        <div className={styles.navLink}>
          <NavLink to="/">Home</NavLink>
        </div>
        <div className={styles.navLink}>
          <NavLink to="/cakes">Cakes</NavLink>
        </div>
        <div className={styles.navLink}>
          <div>
            <NavLink to="/inprocessOrders">Orders</NavLink>
          </div>
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
      <div className={styles.navIcons}>
        <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
        <NavLink to="/cart" className={styles.cartLink}>
          <FontAwesomeIcon icon={faShoppingCart} />
        </NavLink>
      </div>
    </div>
  );
}
