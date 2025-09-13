import React from "react";
import { VoteCellProps } from "./types";

export const VoteCell: React.FC<VoteCellProps> = ({ vote }) => {
  const getVoteDisplay = () => {
    switch (vote) {
      case "yes":
        return "✓";
      case "no":
        return "✗";
      case "if-needed":
        return "?";
      default:
        return "";
    }
  };

  const getVoteClassName = () => {
    const baseClass = "vote-cell";
    if (!vote) return `${baseClass} vote-empty`;
    return `${baseClass} vote-${vote}`;
  };

  return (
    <div className={getVoteClassName()}>
      <span className="vote-symbol">{getVoteDisplay()}</span>
    </div>
  );
};
