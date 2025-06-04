import React from "react";
import "./styles.css";

export type Props = {
  name: string;
};

export const Demo: React.FC<Props> = ({ name }) => {
  return (
    <div className="moje-trida">
      <h1>Zmena</h1>
      <span className="name"> {name}</span>
    </div>
  );
};
