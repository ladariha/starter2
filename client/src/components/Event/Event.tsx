import React from "react";
import { EventHeader } from "./EventHeader/EventHeader";
import { VotingTable } from "./VotingTable/VotingTable";
import type { EventProps } from "./types";
import "./styles.css";

export const Event: React.FC<EventProps> = ({ id, title, location, dates }) => {
  return (
    <div className="event-container" data-testid={`event-${id}`}>
      <EventHeader title={title} location={location} />
      <VotingTable dates={dates} />
    </div>
  );
};

export type { EventProps, DateRecord, UserRecord } from "./types";
