import React from 'react'
import styles from './StandardCakeView.module.css'
import axios from 'axios'

return (
    <div className='StandardCakeView'>
      <div className={styles.cakeTypes}>
        <h2>Standard Cakes</h2>
        <div className={styles.cakeContainer}>
          <div className={styles.flavorBox}>
            <img src={flavor1} alt="Bams Cakery" className={styles.flavor} />
            <h2>Red Velvet</h2>
            <p>This is a lovely red velvet cake</p>
          </div>
          <div className={styles.flavorBox}>
            <img src={flavor2} alt="Bams Cakery" className={styles.flavor} />
            <h2>Carrot Cake</h2>
            <p>This is a lovely Carrot cake</p>
          </div>
          <div className={styles.flavorBox}>
            <img src={flavor3} alt="Bams Cakery" className={styles.flavor} />
            <h2>Butter Cream</h2>
            <p>This is a lovely Butter Cream cake</p>
          </div>
          <div className={styles.flavorBox}>
            <img src={flavor4} alt="Bams Cakery" className={styles.flavor} />
            <h2>Chocolate</h2>
            <p>This is a lovely Chocolate cake</p>
          </div>
          <div className={styles.flavorBox}>
            <img src={flavor5} alt="Bams Cakery" className={styles.flavor} />
            <h2>Vanilla</h2>
            <p>This is a lovely Vanilla cake</p>
          </div>
          <div className={styles.flavorBox}>
            <img src={flavor6} alt="Bams Cakery" className={styles.flavor} />
            <h2>Strawberry</h2>
            <p>This is a lovely Strawberry Cake</p>
          </div>
        </div>
      </div>
    </div>
  );