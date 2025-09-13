import React, { useMemo } from "react";
import { EventTableProps } from "./types";
import { DateColumn } from "./DateColumn";
import { ParticipantRow } from "./ParticipantRow";

export const EventTable: React.FC<EventTableProps> = ({ dates }) => {
  const participants = useMemo(() => {
    const participantSet = new Set<string>();
    dates.forEach((dateRecord) => {
      dateRecord.records.forEach((userRecord) => {
        participantSet.add(userRecord.name);
      });
    });
    return Array.from(participantSet).sort();
  }, [dates]);

  if (dates.length === 0) {
    return <div className="event-table-empty">No dates available</div>;
  }

  return (
    <div className="event-table" style={{ "--date-columns": dates.length } as React.CSSProperties}>
      <div className="event-table-header">
        <div className="participant-column-header">Participant</div>
        {dates.map((dateRecord) => (
          <DateColumn key={dateRecord.timestamp} timestamp={dateRecord.timestamp} />
        ))}
      </div>
      <div className="event-table-body">
        {participants.map((participantName) => (
          <ParticipantRow
            key={participantName}
            participantName={participantName}
            dates={dates}
          />
        ))}
      </div>
    </div>
  );
};
