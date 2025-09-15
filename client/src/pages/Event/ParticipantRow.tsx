import React from "react";
import { DateRecord, UserRecord } from "./types";
import { VoteCell } from "./VoteCell";

export type ParticipantRowProps = {
  participantName: string;
  dates: DateRecord[];
};

export const ParticipantRow: React.FC<ParticipantRowProps> = ({ participantName, dates }) => {
  const getUserRecordForDate = (dateRecord: DateRecord): UserRecord | undefined => {
    return dateRecord.records.find((record) => record.name === participantName);
  };

  return (
    <tr className="participant-row" data-testid={`participant-${participantName}`}>
      <td className="participant-name">{participantName}</td>
      {dates.map((dateRecord, index) => (
        <VoteCell
          key={`${participantName}-${dateRecord.timestamp}-${index}`}
          userRecord={getUserRecordForDate(dateRecord)}
        />
      ))}
    </tr>
  );
};
