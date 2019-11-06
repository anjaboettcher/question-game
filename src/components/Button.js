import React, { useState } from "react";

const styles = {
  button: {
    outline: "none",
    position: "relative",
    background: "transparent",
    fontSize: "12px",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "35px",
    padding: "10px 20px",
    margin: "5px",
    textTransform: "uppercase",
    cursor: "pointer"
  }
};

function Button({ onClick, disabled, style, children }) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles.button,
        ...style,
        backgroundColor: hover ? "#eee" : "white"
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </button>
  );
}

export default Button;
