import { useContext } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import styles from "./GlobalHeaderView.module.css";
import MainNav from "../../components/MainNav/MainNav";
import LoginView from "../LoginView/LoginView";
import LogoutView from "../LogoutView";
import RegisterView from "../RegisterView/RegisterView";
import UserProfileView from "../UserProfileView/UserProfileView";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function GlobalHeaderView() {
  return (
    <div>
      <header>
        {/*<img src={cakeLogo} alt="logo" id="logo" />*/}
        <h2>Bam's Cakery</h2>
        <nav>
          <button>Home</button>
          <button>Cakes</button>
          <button>Custom Cakes</button>
          <button>Log In</button>
        </nav>
        {/* <i className="bi bi-person-circle"></i>
        <i className="bi bi-cart"></i> */}
      </header>
    </div>
  );
}
