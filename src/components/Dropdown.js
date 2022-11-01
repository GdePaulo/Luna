import React, { useEffect, useState } from 'react';

import s from "../css/dropdown.module.css";
import { getConditionalclass } from "./Utils"

function Dropdown({ label, value, options, onChange }) {
  return (
    <div className={s.dropdown}>
      <label className={s.dropdown__label}>
        {label}
        <select className={s.dropdown__options} value={value} onChange={onChange}>
          {options.map((option) => (
            <option className={s.dropdown__option} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
export default Dropdown;