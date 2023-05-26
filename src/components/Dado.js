import React from "react";

export default function Dado(props) {
  return (
    // Div que representa o dado
    <div onClick={props.handleClick} className={`dado ${props.segurando ? 'dado-segurado' : ''}`}>
      {/* Número do dado */}
      <h2 className="dado-numero">{props.value}</h2>
    </div>
  );
}
