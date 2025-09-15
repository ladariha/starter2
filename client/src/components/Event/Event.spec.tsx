import { render } from "@testing-library/react";
import { Event, EventProps } from "./Event";
import { EventPageObject } from "./Event.pageObject";
import { BrowserRouter } from "react-router";

describe("Event component", () => {
  const baseProps: EventProps = {
    id: "test-event-1",
    title: "Team Meeting",
    location: "Conference Room A",
    dates: [
      {
        timestamp: Date.parse("2024-01-15"),
        records: [
          { name: "Alice", answer: "yes" },
          { name: "Bob", answer: "no" },
          { name: "Charlie", answer: "if-needed" }
        ]
      },
      {
        timestamp: Date.parse("2024-01-16"),
        records: [
          { name: "Alice", answer: "no" },
          { name: "Bob", answer: "yes" }
        ]
      }
    ]
  };

  const renderComponent = (props: EventProps = baseProps) => {
    return new EventPageObject(render(<BrowserRouter><Event {...props} /></BrowserRouter>));
  };

  describe("Event Header", () => {
    it("should render event title", async () => {
      const event = renderComponent();
      await event.assertTitle("Team Meeting");
    });

    it("should render location when provided", async () => {
      const event = renderComponent();
      await event.assertLocation("Conference Room A");
    });

    it("should not render location when not provided", async () => {
      const propsWithoutLocation = { ...baseProps, location: undefined };
      const event = renderComponent(propsWithoutLocation);
      await event.assertLocationNotVisible();
    });
  });

  describe("Voting Table", () => {
    it("should render voting table", async () => {
      const event = renderComponent();
      await event.assertVotingTableExists();
    });

    it("should render all participants", async () => {
      const event = renderComponent();
      await event.assertParticipantExists("Alice");
      await event.assertParticipantExists("Bob");
      await event.assertParticipantExists("Charlie");
      await event.assertParticipantCount(3);
    });

    it("should render all date columns", async () => {
      const event = renderComponent();
      await event.assertDateColumnExists("1/15/2024");
      await event.assertDateColumnExists("1/16/2024");
      await event.assertDateCount(2);
    });

    it("should display correct votes for each participant and date", async () => {
      const event = renderComponent();

      // Alice's votes
      await event.assertVoteForParticipantAndDate("Alice", 0, "✓"); // yes for first date
      await event.assertVoteForParticipantAndDate("Alice", 1, "✗"); // no for second date

      // Bob's votes
      await event.assertVoteForParticipantAndDate("Bob", 0, "✗"); // no for first date
      await event.assertVoteForParticipantAndDate("Bob", 1, "✓"); // yes for second date

      // Charlie's votes
      await event.assertVoteForParticipantAndDate("Charlie", 0, "?"); // if-needed for first date
      await event.assertVoteForParticipantAndDate("Charlie", 1, ""); // no vote for second date
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty dates array", async () => {
      const propsWithEmptyDates = { ...baseProps, dates: [] };
      const event = renderComponent(propsWithEmptyDates);
      await event.assertTitle("Team Meeting");
      await event.assertVotingTableExists();
      await event.assertDateCount(0);
      await event.assertParticipantCount(0);
    });

    it("should handle dates with no records", async () => {
      const propsWithEmptyRecords = {
        ...baseProps,
        dates: [
          { timestamp: Date.parse("2024-01-15"), records: [] },
          { timestamp: Date.parse("2024-01-16"), records: [] }
        ]
      };
      const event = renderComponent(propsWithEmptyRecords);
      await event.assertDateCount(2);
      await event.assertParticipantCount(0);
    });

    it("should handle single participant with multiple dates", async () => {
      const singleParticipantProps = {
        ...baseProps,
        dates: [
          {
            timestamp: Date.parse("2024-01-15"),
            records: [{ name: "Alice", answer: "yes" as const }]
          },
          {
            timestamp: Date.parse("2024-01-16"),
            records: [{ name: "Alice", answer: "no" as const }]
          }
        ]
      };
      const event = renderComponent(singleParticipantProps);
      await event.assertParticipantCount(1);
      await event.assertParticipantExists("Alice");
      await event.assertVoteForParticipantAndDate("Alice", 0, "✓");
      await event.assertVoteForParticipantAndDate("Alice", 1, "✗");
    });

    it("should sort participants alphabetically", async () => {
      const unsortedProps = {
        ...baseProps,
        dates: [
          {
            timestamp: Date.parse("2024-01-15"),
            records: [
              { name: "Zoe", answer: "yes" as const },
              { name: "Alice", answer: "no" as const },
              { name: "Bob", answer: "if-needed" as const }
            ]
          }
        ]
      };
      const event = renderComponent(unsortedProps);
      await event.assertParticipantCount(3);

      // Check that participants are sorted alphabetically
      const participantElements = event.getAllBySelector(EventPageObject.CSS_SELECTORS.participantName);
      expect(participantElements[0].textContent).toBe("Alice");
      expect(participantElements[1].textContent).toBe("Bob");
      expect(participantElements[2].textContent).toBe("Zoe");
    });
  });
});
