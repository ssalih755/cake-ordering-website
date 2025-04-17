import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import styles from "./HomeView.module.css";

export default function HomeView() {
  const user = useContext(UserContext);

  return (
    <div className="gridContainer">
      <main>
        <header>
          {/*<img src={cakeLogo} alt="logo" id="logo" />*/}
          <h2>Bam's Cakery</h2>
          <nav>
            <button>Home</button>
            <button>Cakes</button>
            <button>Custom Cakes</button>
            <button>Log In</button>
          </nav>
          <i className="bi bi-person-circle"></i>
          <i className="bi bi-cart"></i>
        </header>
        <section className="about">
          <h1>about us</h1>
        </section>
        <section className="standardCakes">
          <h2>classics</h2>
        </section>
        <section className="customCakes">
          <h2>customs</h2>
        </section>
        <section className="flavors">
          <h2>flavors</h2>
        </section>
        <footer>
          <h2>footer</h2>
        </footer>
      </main>
    </div>
  );
}
