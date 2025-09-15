import React from "react";
import { UserRecord } from "./types";

export type VoteCellProps = {
  userRecord?: UserRecord;
};

export const VoteCell: React.FC<VoteCellProps> = ({ userRecord }) => {
  if (!userRecord) {
    return <td className="vote-cell vote-cell--empty">-</td>;
  }

  const getVoteSymbol = (answer: UserRecord["answer"]) => {
    switch (answer) {
      case "yes":
        return "✓";
      case "no":
        return "✗";
      case "if-needed":
        return "?";
      default:
        return "-";
    }
  };

  const getVoteClass = (answer: UserRecord["answer"]) => {
    return `vote-cell vote-cell--${answer}`;
  };

  return (
    <td className={getVoteClass(userRecord.answer)} data-testid={`vote-${userRecord.answer}`}>
      {getVoteSymbol(userRecord.answer)}
    </td>
  );
};
