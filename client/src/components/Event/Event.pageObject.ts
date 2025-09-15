import { BasePageObject } from "../../testutils/BasePageObject";
import { waitFor } from "@testing-library/react";

export class EventPageObject extends BasePageObject {
  async assertTitle(title: string): Promise<void> {
    await waitFor(() => {
      expect(this.getBySelector(EventPageObject.CSS_SELECTORS.title)).toHaveTextContent(title);
    });
  }

  async assertLocation(location: string): Promise<void> {
    await waitFor(() => {
      expect(this.getBySelector(EventPageObject.CSS_SELECTORS.location)).toHaveTextContent(location);
    });
  }

  async assertLocationNotVisible(): Promise<void> {
    await waitFor(() => {
      expect(this.queryBySelector(EventPageObject.CSS_SELECTORS.location)).toBeFalsy();
    });
  }

  async assertParticipantExists(participantName: string): Promise<void> {
    await waitFor(() => {
      const participants = this.getAllBySelector(EventPageObject.CSS_SELECTORS.participantName);
      const found = participants.some((p) => p.textContent === participantName);
      expect(found).toBe(true);
    });
  }

  async assertDateColumnExists(date: string): Promise<void> {
    await waitFor(() => {
      const dateHeaders = this.getAllBySelector(EventPageObject.CSS_SELECTORS.dateHeader);
      const found = dateHeaders.some((h) => h.textContent === date);
      expect(found).toBe(true);
    });
  }

  async assertVoteForParticipantAndDate(participantName: string, dateIndex: number, expectedVote: string): Promise<void> {
    await waitFor(() => {
      const participantRows = this.getAllBySelector(EventPageObject.CSS_SELECTORS.participantRow);
      const participantRow = participantRows.find((row) => {
        const nameCell = row.querySelector(EventPageObject.CSS_SELECTORS.participantName);
        return nameCell?.textContent === participantName;
      });

      expect(participantRow).toBeTruthy();

      if (participantRow) {
        const voteCells = participantRow.querySelectorAll(EventPageObject.CSS_SELECTORS.voteCell);
        const targetCell = voteCells[dateIndex];
        expect(targetCell).toBeTruthy();
        expect(targetCell.textContent).toBe(expectedVote);
      }
    });
  }

  async assertVotingTableExists(): Promise<void> {
    await waitFor(() => {
      expect(this.getBySelector(EventPageObject.CSS_SELECTORS.votingTable)).toBeInTheDocument();
    });
  }

  async assertParticipantCount(expectedCount: number): Promise<void> {
    await waitFor(() => {
      const participants = this.queryAllBySelector(EventPageObject.CSS_SELECTORS.participantName);
      expect(participants).toHaveLength(expectedCount);
    });
  }

  async assertDateCount(expectedCount: number): Promise<void> {
    await waitFor(() => {
      const dateHeaders = this.queryAllBySelector(EventPageObject.CSS_SELECTORS.dateHeader);
      expect(dateHeaders).toHaveLength(expectedCount);
    });
  }

  static CSS_SELECTORS = {
    title: ".event-title",
    location: ".event-location",
    votingTable: ".voting-table-element",
    participantRow: ".participant-row",
    participantName: ".participant-name",
    dateHeader: ".date-header",
    voteCell: ".vote-cell",
    eventContainer: ".event-container"
  };
}
