export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface RootState {
  journals: JournalEntry[];
}
