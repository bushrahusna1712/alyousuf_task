import React from "react";

import "./style.css";

function Select({ options = [], value = "", setValue = () => { } }) {
  return (
    <div className="common_select_div">
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Division"
        className="common_select"
      >
        <option value="" disabled>Select Division</option>
        {options.map((opt) => {
          return (
            <option key={opt.value} value={opt.value}>
              {opt.value}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Select;
