import React from "react";
import { DateColumnProps } from "./types";

export const DateColumn: React.FC<DateColumnProps> = ({ timestamp }) => {
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };

  return (
    <div className="date-column">
      <div className="date-value">{formatDate(timestamp)}</div>
      <div className="time-value">{formatTime(timestamp)}</div>
    </div>
  );
};
