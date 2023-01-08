import React from "react";

import "./style.css";

function Input({
  value = "",
  setValue = () => { },
  type = "text",
  required = false,
  placeholder = "",
}) {
  return (
    <div className="common_input">
      <input
        value={value}
        onChange={(e) => { setValue(e.target.value) }}
        type={type}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
