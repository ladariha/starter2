import React from "react";
import { EventHeaderProps } from "./types";

export const EventHeader: React.FC<EventHeaderProps> = ({ title, location }) => {
  return (
    <div className="event-header">
      <h1 className="event-title">{title}</h1>
      {location && <p className="event-location">{location}</p>}
    </div>
  );
};
