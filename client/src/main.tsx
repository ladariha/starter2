import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Event } from "./components/Event/Event";
import type { EventProps } from "./components/Event/Event";

// Sample data for demonstration
const sampleEventData: EventProps = {
  id: "team-planning-2024",
  title: "Q1 Team Planning Session",
  location: "Conference Room B / Zoom",
  dates: [
    {
      timestamp: Date.parse("2024-03-15T14:00:00"),
      records: [
        { name: "Alice Johnson", answer: "yes" },
        { name: "Bob Smith", answer: "yes" },
        { name: "Charlie Brown", answer: "if-needed" },
        { name: "Diana Prince", answer: "no" }
      ]
    },
    {
      timestamp: Date.parse("2024-03-16T10:00:00"),
      records: [
        { name: "Alice Johnson", answer: "no" },
        { name: "Bob Smith", answer: "yes" },
        { name: "Charlie Brown", answer: "yes" },
        { name: "Diana Prince", answer: "if-needed" }
      ]
    },
    {
      timestamp: Date.parse("2024-03-17T15:30:00"),
      records: [
        { name: "Alice Johnson", answer: "yes" },
        { name: "Bob Smith", answer: "no" },
        { name: "Diana Prince", answer: "yes" }
      ]
    }
  ]
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Event {...sampleEventData} />
  </StrictMode>,
);
