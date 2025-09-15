import React from "react";

export type EventHeaderProps = {
  title: string;
  location?: string;
};

export const EventHeader: React.FC<EventHeaderProps> = ({ title, location }) => {
  return (
    <div className="event-header">
      <h1 className="event-title">{title}</h1>
      {location && <p className="event-location">{location}</p>}
    </div>
  );
};
