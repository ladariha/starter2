Create a React component called “Event” and unit/component tests such as:
- the component is used for displaying event planning (Doodle-like) and voting for when event should happen
- each event has name (mandatory), location (optional), list of possible dates (type DateRecord)
- each DateRecord contains information about a date and how particapants have voted (type UserRecord)
- the Event component must receivee  3 props: location, title, dates

type UserRecord = {
 name: string;
 answer: "yes" | "no" | "if-needed";
}


type DateRecord = {
 timestamp: number;
 records: UserRecord[];
}

// props komponenty Event
type EventProps  = {
 location?: string;
 id: string;
 title: string;
 dates: DateRecord[];
}

- component Event must show location, name and a table with polling results - in rows there are names of participants, columns are for dates and cells show how given particant has voted in particular date (not all participants are required to provide vote for each day)
- try to decompose Event component to smaller components if it makes sense
- cover the code with component tests
