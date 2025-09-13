import { render } from "@testing-library/react";
import { Event } from "./Event";
import { EventProps, DateRecord } from "./types";
import { EventPageObject } from "./Event.pageObject";

describe("Event component", () => {
  const mockDates: DateRecord[] = [
    {
      timestamp: new Date("2024-01-15T10:00:00Z").getTime(),
      records: [
        { name: "Alice", answer: "yes" },
        { name: "Bob", answer: "no" },
        { name: "Charlie", answer: "if-needed" }
      ]
    },
    {
      timestamp: new Date("2024-01-16T14:30:00Z").getTime(),
      records: [
        { name: "Alice", answer: "no" },
        { name: "Bob", answer: "yes" },
      ]
    },
    {
      timestamp: new Date("2024-01-17T09:15:00Z").getTime(),
      records: [
        { name: "Charlie", answer: "yes" },
        { name: "David", answer: "if-needed" }
      ]
    }
  ];

  const baseProps: EventProps = {
    id: "event-1",
    title: "Team Meeting",
    location: "Conference Room A",
    dates: mockDates
  };

  const renderComponent = (props = baseProps) => {
    return new EventPageObject(render(<Event {...props} />));
  };

  it("should render event title", async () => {
    const eventPage = renderComponent();
    await eventPage.assertTitle("Team Meeting");
  });

  it("should render event location when provided", async () => {
    const eventPage = renderComponent();
    await eventPage.assertLocation("Conference Room A");
  });

  it("should not render location when not provided", async () => {
    const propsWithoutLocation = { ...baseProps, location: undefined };
    const eventPage = renderComponent(propsWithoutLocation);
    await eventPage.assertLocationNotPresent();
  });

  it("should render all date columns", async () => {
    const eventPage = renderComponent();
    await eventPage.assertDateColumnsCount(3);
    await eventPage.assertDateColumnPresent("Jan 15, 2024");
    await eventPage.assertDateColumnPresent("Jan 16, 2024");
    await eventPage.assertDateColumnPresent("Jan 17, 2024");
  });

  it("should render all participants", async () => {
    const eventPage = renderComponent();
    await eventPage.assertParticipantPresent("Alice");
    await eventPage.assertParticipantPresent("Bob");
    await eventPage.assertParticipantPresent("Charlie");
    await eventPage.assertParticipantPresent("David");
  });

  it("should render votes correctly", async () => {
    const eventPage = renderComponent();

    // Alice's votes: yes, no, empty
    await eventPage.assertVote("Alice", 0, "✓");
    await eventPage.assertVote("Alice", 1, "✗");
    await eventPage.assertVote("Alice", 2, "");

    // Bob's votes: no, yes, empty
    await eventPage.assertVote("Bob", 0, "✗");
    await eventPage.assertVote("Bob", 1, "✓");
    await eventPage.assertVote("Bob", 2, "");

    // Charlie's votes: if-needed, empty, yes
    await eventPage.assertVote("Charlie", 0, "?");
    await eventPage.assertVote("Charlie", 1, "");
    await eventPage.assertVote("Charlie", 2, "✓");

    // David's votes: empty, empty, if-needed
    await eventPage.assertVote("David", 0, "");
    await eventPage.assertVote("David", 1, "");
    await eventPage.assertVote("David", 2, "?");
  });

  it("should handle empty dates array", async () => {
    const propsWithNoDates = { ...baseProps, dates: [] };
    const eventPage = renderComponent(propsWithNoDates);
    await eventPage.assertEmptyTable();
  });

  it("should apply correct CSS classes for vote types", async () => {
    const eventPage = renderComponent();

    await eventPage.assertVoteCellClass("Alice", 0, "vote-yes");
    await eventPage.assertVoteCellClass("Alice", 1, "vote-no");
    await eventPage.assertVoteCellClass("Alice", 2, "vote-empty");
    await eventPage.assertVoteCellClass("Charlie", 0, "vote-if-needed");
  });

  it("should sort participants alphabetically", async () => {
    const eventPage = renderComponent();
    await eventPage.assertParticipantsOrder(["Alice", "Bob", "Charlie", "David"]);
  });
});
