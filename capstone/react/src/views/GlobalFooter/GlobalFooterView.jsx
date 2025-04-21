import React from "react";
import styles from "./GlobalFooterView.module.css";

export default function GlobalFooterView() {
  return (
    <div className={styles.globalFooter}>
      <div className={styles.contactUs}>
        <div className={styles.email}>
          <p>bamscakery@cake.com</p>
        </div>
        <div className={styles.socailMedia}>
          <p>@BamsCakery</p>
        </div>
      </div>
      <div className={styles.locationOne}>
        <p>Columbus 123 Main St 614-416-2834</p>
      </div>
      <div className={styles.locationTwo}>
        <p>Cleveland 456 Main St 216-612-8732</p>
      </div>
      <div className={styles.operatingHours}>
        <p>
          Hours of Operations Monday - Friday: 9am - 5pm Saturday: 10am - 2pm
          Sunday: Closed
        </p>
      </div>
    </div>
  );
}
