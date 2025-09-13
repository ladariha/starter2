import React from "react";
import { ParticipantRowProps } from "./types";
import { VoteCell } from "./VoteCell";

export const ParticipantRow: React.FC<ParticipantRowProps> = ({ participantName, dates }) => {
  const getVoteForDate = (timestamp: number) => {
    const dateRecord = dates.find((date) => date.timestamp === timestamp);
    if (!dateRecord) return undefined;

    const userRecord = dateRecord.records.find((record) => record.name === participantName);
    return userRecord?.answer;
  };

  return (
    <div className="participant-row">
      <div className="participant-name">{participantName}</div>
      {dates.map((dateRecord) => (
        <VoteCell
          key={dateRecord.timestamp}
          vote={getVoteForDate(dateRecord.timestamp)}
        />
      ))}
    </div>
  );
};
