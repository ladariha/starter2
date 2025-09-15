import React from "react";
import type { DateRecord, UserRecord } from "../types";

export type VotingTableProps = {
  dates: DateRecord[];
};

export const VotingTable: React.FC<VotingTableProps> = ({ dates }) => {
  // Get all unique participants
  const allParticipants = React.useMemo(() => {
    const participants = new Set<string>();
    dates.forEach((date) => {
      date.records.forEach((record) => {
        participants.add(record.name);
      });
    });
    return Array.from(participants).sort();
  }, [dates]);

  // Helper function to find vote for a participant on a specific date
  const getVoteForParticipant = (participantName: string, dateRecord: DateRecord): UserRecord | undefined => {
    return dateRecord.records.find((record) => record.name === participantName);
  };

  // Helper function to format timestamp to readable date
  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString();
  };

  // Helper function to get vote display
  const getVoteDisplay = (answer: UserRecord["answer"]): string => {
    switch (answer) {
      case "yes": return "✓";
      case "no": return "✗";
      case "if-needed": return "?";
      default: return "";
    }
  };

  // Helper function to get vote CSS class
  const getVoteClass = (answer?: UserRecord["answer"]): string => {
    if (!answer) return "vote-cell vote-empty";
    return `vote-cell vote-${answer}`;
  };

  return (
    <div className="voting-table">
      <table className="voting-table-element">
        <thead>
          <tr>
            <th className="participant-header">Participant</th>
            {dates.map((date) => (
              <th key={date.timestamp} className="date-header">
                {formatDate(date.timestamp)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allParticipants.map((participantName) => (
            <tr key={participantName} className="participant-row">
              <td className="participant-name">{participantName}</td>
              {dates.map((date) => {
                const vote = getVoteForParticipant(participantName, date);
                return (
                  <td key={`${participantName}-${date.timestamp}`} className={getVoteClass(vote?.answer)}>
                    {vote ? getVoteDisplay(vote.answer) : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
