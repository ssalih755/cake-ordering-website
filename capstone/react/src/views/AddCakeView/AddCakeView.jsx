import React from 'react'
import styles from "./AddCakeView.module.css";
import { useState } from 'react';

export default function AddCakeView() {

const[flavor, setFlavor] = useState('');
const[filling, setFilling] = useState('');
const[frosting, setFrosting] = useState('');
const[size, setSize] = useState('');
const[style, setStyle] = useState('');


//handles submission to Database
function handleSubmit(event) {}


  return (
    <div>
      {/* //5 dropdowns forms that connect with each option
          // 1 textbox for the cakename
          //1 tetxbox that accepts image URL */}

      <form onSubmit={handleSubmit}>
        <div className={styles.formContainer}>
          <select className="flavors" value={flavor} onChange={(event) => setFlavor(event.target.value)}></select>
          <select className="fillings" value={filling} onChange={(event) => setFilling(event.target.value)}></select>
          <select className="frostings" value={frosting} onChange={(event) => setFrosting(event.target.value)}></select>
          <select className="sizes" value={size} onChange={(event) => setSize(event.target.value)}></select>
          <select className="styles" value={style} onChange={(event) => setStyle(event.target.value)}></select>

          <input className='cakeName' type="text" />
          <input className='imgURL' type="text" />
        </div>
      </form>
    </div>
  )
}
