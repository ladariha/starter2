import React from "react";
import { EventProps } from "./types";
import { EventHeader } from "./EventHeader";
import { EventTable } from "./EventTable";
import "./styles.css";

export const Event: React.FC<EventProps> = ({ title, location, dates }) => {
  return (
    <div className="event">
      <EventHeader title={title} location={location} />
      <EventTable dates={dates} />
    </div>
  );
};
