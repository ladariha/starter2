import { BasePageObject } from "../../testutils/BasePageObject";
import { waitFor } from "@testing-library/react";

export class EventPageObject extends BasePageObject {
  async assertTitle(title: string) {
    await waitFor(() => {
      expect(this.getBySelector(EventPageObject.CSS_SELECTORS.title)).toHaveTextContent(title);
    });
  }

  async assertLocation(location: string) {
    await waitFor(() => {
      expect(this.getBySelector(EventPageObject.CSS_SELECTORS.location)).toHaveTextContent(location);
    });
  }

  async assertLocationNotPresent() {
    await waitFor(() => {
      expect(this.queryBySelector(EventPageObject.CSS_SELECTORS.location)).toBeNull();
    });
  }

  async assertParticipantPresent(participantName: string) {
    await waitFor(() => {
      expect(this.getBySelector(`[data-testid="participant-${participantName}"]`)).toBeInTheDocument();
    });
  }

  async assertParticipantNotPresent(participantName: string) {
    await waitFor(() => {
      expect(this.queryBySelector(`[data-testid="participant-${participantName}"]`)).toBeNull();
    });
  }

  async assertVoteForParticipant(participantName: string, answer: "yes" | "no" | "if-needed") {
    await waitFor(() => {
      const participantRow = this.getBySelector(`[data-testid="participant-${participantName}"]`);
      const voteCell = participantRow.querySelector(`[data-testid="vote-${answer}"]`);
      expect(voteCell).toBeInTheDocument();
    });
  }

  async assertDateHeaderPresent(dateText: string) {
    await waitFor(() => {
      const headers = this.getAllBySelector(EventPageObject.CSS_SELECTORS.dateHeader);
      const headerWithDate = Array.from(headers).find((header) =>
        header.textContent?.includes(dateText)
      );
      expect(headerWithDate).toBeInTheDocument();
    });
  }

  async assertNoDatesMessage() {
    await waitFor(() => {
      expect(this.getBySelector(EventPageObject.CSS_SELECTORS.noDates)).toBeInTheDocument();
    });
  }

  async assertNoParticipantsMessage() {
    await waitFor(() => {
      expect(this.getBySelector(EventPageObject.CSS_SELECTORS.noParticipants)).toBeInTheDocument();
    });
  }

  async assertVotingTablePresent() {
    await waitFor(() => {
      expect(this.getBySelector(EventPageObject.CSS_SELECTORS.votingTable)).toBeInTheDocument();
    });
  }

  async assertVotingTableNotPresent() {
    await waitFor(() => {
      expect(this.queryBySelector(EventPageObject.CSS_SELECTORS.votingTable)).toBeNull();
    });
  }

  getParticipantRows() {
    return this.getAllBySelector(EventPageObject.CSS_SELECTORS.participantRow);
  }

  getDateHeaders() {
    return this.getAllBySelector(EventPageObject.CSS_SELECTORS.dateHeader);
  }

  static CSS_SELECTORS = {
    title: ".event-title",
    location: ".event-location",
    votingTable: ".voting-table",
    participantRow: ".participant-row",
    dateHeader: ".date-header",
    noDates: ".no-dates",
    noParticipants: ".no-participants",
  };
}
