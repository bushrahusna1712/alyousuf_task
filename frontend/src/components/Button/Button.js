import React from "react";

import "./style.css";

function Button({ label = "", onClick = () => { }, secondary = false, ternary = false, flex = 1 }) {
  return (
    <div
      className={`common_btn ${secondary ? "common_btn_sec" : ""} ${ternary ? "common_btn_ter" : ""}`}
      onClick={onClick}
      style={{ flex }}
    >
      <p>{label}</p>
    </div>
  );
}

export default Button;
