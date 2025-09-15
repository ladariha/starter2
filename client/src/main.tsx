import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Event, DateRecord } from "./pages/Event";

// Example data for the Event component
const sampleDates: DateRecord[] = [
  {
    timestamp: new Date("2024-01-15T10:00:00").getTime(),
    records: [
      { name: "Alice", answer: "yes" },
      { name: "Bob", answer: "no" },
      { name: "Charlie", answer: "if-needed" },
    ],
  },
  {
    timestamp: new Date("2024-01-16T14:00:00").getTime(),
    records: [
      { name: "Alice", answer: "if-needed" },
      { name: "Bob", answer: "yes" },
      { name: "David", answer: "yes" },
    ],
  },
  {
    timestamp: new Date("2024-01-17T09:00:00").getTime(),
    records: [
      { name: "Charlie", answer: "yes" },
      { name: "David", answer: "no" },
      { name: "Eve", answer: "if-needed" },
    ],
  },
];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Event
      id="team-meeting"
      title="Team Planning Meeting"
      location="Conference Room B"
      dates={sampleDates}
    />
  </StrictMode>,
);
