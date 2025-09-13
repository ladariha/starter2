export type UserRecord = {
  name: string;
  answer: "yes" | "no" | "if-needed";
};

export type DateRecord = {
  timestamp: number;
  records: UserRecord[];
};

export type EventProps = {
  location?: string;
  id: string;
  title: string;
  dates: DateRecord[];
};

export type EventHeaderProps = {
  title: string;
  location?: string;
};

export type EventTableProps = {
  dates: DateRecord[];
};

export type ParticipantRowProps = {
  participantName: string;
  dates: DateRecord[];
};

export type DateColumnProps = {
  timestamp: number;
};

export type VoteCellProps = {
  vote?: UserRecord["answer"];
};
