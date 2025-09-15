import { render } from "@testing-library/react";
import { Event } from "./Event";
import { EventProps, DateRecord } from "./types";
import { EventPageObject } from "./Event.pageObject";
import { BrowserRouter } from "react-router";

describe("Event component", () => {
  const mockDateRecords: DateRecord[] = [
    {
      timestamp: new Date("2024-01-15").getTime(),
      records: [
        { name: "Alice", answer: "yes" },
        { name: "Bob", answer: "no" },
      ],
    },
    {
      timestamp: new Date("2024-01-16").getTime(),
      records: [
        { name: "Alice", answer: "if-needed" },
        { name: "Charlie", answer: "yes" },
      ],
    },
  ];

  const renderComponent = (props: Partial<EventProps> = {}) => {
    const finalProps = {
      id: "test-event",
      title: "Team Meeting",
      dates: mockDateRecords,
      ...props
    };
    // Only include location if explicitly provided, otherwise don't set it at all
    if (props.location !== undefined) {
      finalProps.location = props.location;
    } else if (!("location" in props)) {
      finalProps.location = "Conference Room A";
    }

    return new EventPageObject(
      render(
        <BrowserRouter>
          <Event {...finalProps} />
        </BrowserRouter>
      )
    );
  };

  describe("Basic rendering", () => {
    it("should render event title", async () => {
      const event = renderComponent();
      await event.assertTitle("Team Meeting");
    });

    it("should render location when provided", async () => {
      const event = renderComponent();
      await event.assertLocation("📍 Conference Room A");
    });

    it("should not render location when not provided", async () => {
      const event = renderComponent({ location: undefined });
      await event.assertLocationNotPresent();
    });

    it("should render voting table when dates and participants exist", async () => {
      const event = renderComponent();
      await event.assertVotingTablePresent();
    });
  });

  describe("Empty states", () => {
    it("should show no dates message when dates array is empty", async () => {
      const event = renderComponent({ dates: [] });
      await event.assertNoDatesMessage();
      await event.assertVotingTableNotPresent();
    });

    it("should show no participants message when dates have no records", async () => {
      const event = renderComponent({
        dates: [
          {
            timestamp: new Date("2024-01-15").getTime(),
            records: [],
          },
        ],
      });
      await event.assertNoParticipantsMessage();
      await event.assertVotingTableNotPresent();
    });
  });

  describe("Participant rendering", () => {
    it("should render all unique participants from all dates", async () => {
      const event = renderComponent();
      await event.assertParticipantPresent("Alice");
      await event.assertParticipantPresent("Bob");
      await event.assertParticipantPresent("Charlie");
    });

    it("should render participants in alphabetical order", async () => {
      const event = renderComponent();
      const participantRows = event.getParticipantRows();

      // Extract participant names from the rows
      const participantNames = Array.from(participantRows).map((row) => {
        const nameCell = row.querySelector(".participant-name");
        return nameCell?.textContent || "";
      });

      expect(participantNames).toEqual(["Alice", "Bob", "Charlie"]);
    });

    it("should not render non-existent participants", async () => {
      const event = renderComponent();
      await event.assertParticipantNotPresent("David");
    });
  });

  describe("Date rendering", () => {
    it("should render date headers for all dates", async () => {
      const event = renderComponent();
      const dateHeaders = event.getDateHeaders();
      expect(dateHeaders).toHaveLength(2);
    });

    it("should format dates correctly", async () => {
      const event = renderComponent();
      // These tests depend on Czech locale formatting
      await event.assertDateHeaderPresent("15");
      await event.assertDateHeaderPresent("16");
    });
  });

  describe("Vote rendering", () => {
    it("should render yes votes correctly", async () => {
      const event = renderComponent();
      await event.assertVoteForParticipant("Alice", "yes");
      await event.assertVoteForParticipant("Charlie", "yes");
    });

    it("should render no votes correctly", async () => {
      const event = renderComponent();
      await event.assertVoteForParticipant("Bob", "no");
    });

    it("should render if-needed votes correctly", async () => {
      const event = renderComponent();
      await event.assertVoteForParticipant("Alice", "if-needed");
    });
  });

  describe("Complex scenarios", () => {
    it("should handle single participant with multiple votes", async () => {
      const singleParticipantDates: DateRecord[] = [
        {
          timestamp: new Date("2024-01-15").getTime(),
          records: [{ name: "Alice", answer: "yes" }],
        },
        {
          timestamp: new Date("2024-01-16").getTime(),
          records: [{ name: "Alice", answer: "no" }],
        },
      ];

      const event = renderComponent({ dates: singleParticipantDates });
      await event.assertParticipantPresent("Alice");
      await event.assertParticipantNotPresent("Bob");
      await event.assertVoteForParticipant("Alice", "yes");
      await event.assertVoteForParticipant("Alice", "no");
    });

    it("should handle participant with missing votes for some dates", async () => {
      const partialVoteDates: DateRecord[] = [
        {
          timestamp: new Date("2024-01-15").getTime(),
          records: [
            { name: "Alice", answer: "yes" },
            { name: "Bob", answer: "no" },
          ],
        },
        {
          timestamp: new Date("2024-01-16").getTime(),
          records: [{ name: "Alice", answer: "if-needed" }],
          // Bob has no vote for this date
        },
      ];

      const event = renderComponent({ dates: partialVoteDates });
      await event.assertParticipantPresent("Alice");
      await event.assertParticipantPresent("Bob");

      // Alice should have votes for both dates
      await event.assertVoteForParticipant("Alice", "yes");
      await event.assertVoteForParticipant("Alice", "if-needed");

      // Bob should have vote only for first date
      await event.assertVoteForParticipant("Bob", "no");
    });

    it("should handle duplicate timestamps correctly", async () => {
      const duplicateDates: DateRecord[] = [
        {
          timestamp: new Date("2024-01-15").getTime(),
          records: [{ name: "Alice", answer: "yes" }],
        },
        {
          timestamp: new Date("2024-01-15").getTime(),
          records: [{ name: "Bob", answer: "no" }],
        },
      ];

      const event = renderComponent({ dates: duplicateDates });
      await event.assertVotingTablePresent();
      await event.assertParticipantPresent("Alice");
      await event.assertParticipantPresent("Bob");
    });
  });

  describe("Props validation", () => {
    it("should handle minimal required props", async () => {
      const event = renderComponent({
        id: "minimal-event",
        title: "Minimal Event",
        dates: [],
        location: undefined,
      });
      await event.assertTitle("Minimal Event");
      await event.assertLocationNotPresent();
      await event.assertNoDatesMessage();
    });

    it("should handle props with empty strings", async () => {
      const event = renderComponent({
        id: "",
        title: "",
        location: "",
        dates: [],
      });
      await event.assertTitle("");
      await event.assertLocationNotPresent();
    });
  });
});
