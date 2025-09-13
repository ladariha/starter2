import React from "react";
import { Event } from "../../components/Event/Event";
import "./styles.css";

export type Props = {
  name: string;
};

export const Demo: React.FC<Props> = ({ name }) => {
  const eventData = {
    id: "demo-event-123",
    title: "Team Meeting",
    location: "Conference Room A",
    dates: [
      {
        timestamp: 1705334400000, // January 15, 2024
        records: [
          { name: "Alice", answer: "yes" as const },
          { name: "Bob", answer: "no" as const },
          { name: "Charlie", answer: "if-needed" as const }
        ]
      },
      {
        timestamp: 1705420800000, // January 16, 2024
        records: [
          { name: "Alice", answer: "if-needed" as const },
          { name: "Bob", answer: "yes" as const },
        ]
      }
    ]
  };

  return (
    <div className="moje-trida">
      <h1>Zmena</h1>
      <span className="name"> {name}</span>
      <Event {...eventData} />
    </div>
  );
};
