import React from "react";
import { EventProps } from "./types";
import { ParticipantRow } from "./ParticipantRow";
import "./styles.css";

export const Event: React.FC<EventProps> = ({ location, id, title, dates }) => {
  // Get unique list of all participants across all dates
  const getAllParticipants = (): string[] => {
    const participantsSet = new Set<string>();
    dates.forEach((dateRecord) => {
      dateRecord.records.forEach((record) => {
        participantsSet.add(record.name);
      });
    });
    return Array.from(participantsSet).sort();
  };

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString("cs-CZ", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const participants = getAllParticipants();

  return (
    <div className="event" data-testid={`event-${id}`}>
      <div className="event-header">
        <h1 className="event-title">{title}</h1>
        {location && location.trim() !== "" && <p className="event-location">📍 {location}</p>}
      </div>

      {dates.length === 0
        ? (
            <p className="no-dates">No dates available for voting</p>
          )
        : participants.length === 0
          ? (
              <p className="no-participants">No participants have voted yet</p>
            )
          : (
              <div className="voting-table-container">
                <table className="voting-table">
                  <thead>
                    <tr>
                      <th className="participant-header">Participant</th>
                      {dates.map((dateRecord, index) => (
                        <th key={`date-${dateRecord.timestamp}-${index}`} className="date-header">
                          {formatDate(dateRecord.timestamp)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {participants.map((participant) => (
                      <ParticipantRow
                        key={participant}
                        participantName={participant}
                        dates={dates}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
    </div>
  );
};
