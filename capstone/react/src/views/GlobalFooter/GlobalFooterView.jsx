import React from "react";
import styles from "./GlobalFooterView.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";


export default function GlobalFooterView() {
  return (
    <div className={styles.globalFooter}>
      <div className={styles.contactUs}>
        <div className={styles.email}>
          <p>
        <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
          bamscakery@cake.com</p>
        </div>
        <div className={styles.socailMedia}>
                       <p>@BamsCakery</p>
        </div>
      </div>
      <div className={styles.locationOne}>
        <p>Columbus 
          <br></br>
          123 Main St  
          <br></br>         
           614-416-2834 
          </p>
      </div>
      <div className={styles.locationTwo}>
        <p>Cleveland 
          <br></br>456 Main St 
          <br></br>
          216-612-8732</p>
      </div>
      <div className={styles.operatingHours}>
        <p>
          Hours of Operations:
          <br></br> Monday - Friday: 9am - 5pm
          <br></br>  
          Saturday: 10am - 2pm
          <br></br>
          Sunday: Closed
        </p>
      </div>
    </div>
  );
}
