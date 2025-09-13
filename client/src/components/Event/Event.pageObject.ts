import { BasePageObject } from "../../testutils/BasePageObject";
import { waitFor } from "@testing-library/react";

export class EventPageObject extends BasePageObject {
  async assertTitle(expectedTitle: string): Promise<void> {
    await waitFor(() => {
      expect(this.getBySelector(EventPageObject.CSS_SELECTORS.title)).toHaveTextContent(expectedTitle);
    });
  }

  async assertLocation(expectedLocation: string): Promise<void> {
    await waitFor(() => {
      expect(this.getBySelector(EventPageObject.CSS_SELECTORS.location)).toHaveTextContent(expectedLocation);
    });
  }

  async assertLocationNotPresent(): Promise<void> {
    await waitFor(() => {
      expect(this.queryBySelector(EventPageObject.CSS_SELECTORS.location)).toBeUndefined();
    });
  }

  async assertDateColumnsCount(expectedCount: number): Promise<void> {
    await waitFor(() => {
      const dateColumns = this.getAllBySelector(EventPageObject.CSS_SELECTORS.dateColumn);
      expect(dateColumns).toHaveLength(expectedCount);
    });
  }

  async assertDateColumnPresent(expectedDate: string): Promise<void> {
    await waitFor(() => {
      const dateColumns = this.getAllBySelector(EventPageObject.CSS_SELECTORS.dateValue);
      const dateTexts = dateColumns.map((col) => col.textContent);
      expect(dateTexts).toContain(expectedDate);
    });
  }

  async assertParticipantPresent(participantName: string): Promise<void> {
    await waitFor(() => {
      const participants = this.getAllBySelector(EventPageObject.CSS_SELECTORS.participantName);
      const participantTexts = participants.map((p) => p.textContent);
      expect(participantTexts).toContain(participantName);
    });
  }

  async assertVote(participantName: string, dateIndex: number, expectedVote: string): Promise<void> {
    await waitFor(() => {
      const participants = this.getAllBySelector(EventPageObject.CSS_SELECTORS.participantName);
      const participantIndex = participants.findIndex((p) => p.textContent === participantName);
      expect(participantIndex).not.toBe(-1);

      const participantRows = this.getAllBySelector(EventPageObject.CSS_SELECTORS.participantRow);
      const targetRow = participantRows[participantIndex];
      const voteCells = targetRow.querySelectorAll(EventPageObject.CSS_SELECTORS.voteCell);
      const targetCell = voteCells[dateIndex];

      if (expectedVote === "") {
        expect(targetCell.textContent?.trim()).toBe("");
      } else {
        expect(targetCell.textContent?.trim()).toBe(expectedVote);
      }
    });
  }

  async assertVoteCellClass(participantName: string, dateIndex: number, expectedClass: string): Promise<void> {
    await waitFor(() => {
      const participants = this.getAllBySelector(EventPageObject.CSS_SELECTORS.participantName);
      const participantIndex = participants.findIndex((p) => p.textContent === participantName);
      expect(participantIndex).not.toBe(-1);

      const participantRows = this.getAllBySelector(EventPageObject.CSS_SELECTORS.participantRow);
      const targetRow = participantRows[participantIndex];
      const voteCells = targetRow.querySelectorAll(EventPageObject.CSS_SELECTORS.voteCell);
      const targetCell = voteCells[dateIndex];

      expect(targetCell).toHaveClass(expectedClass);
    });
  }

  async assertEmptyTable(): Promise<void> {
    await waitFor(() => {
      expect(this.getBySelector(EventPageObject.CSS_SELECTORS.emptyTable)).toBeInTheDocument();
    });
  }

  async assertParticipantsOrder(expectedOrder: string[]): Promise<void> {
    await waitFor(() => {
      const participants = this.getAllBySelector(EventPageObject.CSS_SELECTORS.participantName);
      const actualOrder = participants.map((p) => p.textContent);
      expect(actualOrder).toEqual(expectedOrder);
    });
  }

  static CSS_SELECTORS = {
    title: ".event-title",
    location: ".event-location",
    dateColumn: ".date-column",
    dateValue: ".date-value",
    participantName: ".participant-name",
    participantRow: ".participant-row",
    voteCell: ".vote-cell",
    emptyTable: ".event-table-empty"
  };
}
