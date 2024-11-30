export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

// src/redux/journalSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface JournalState {
  entries: JournalEntry[];
}

const loadEntriesFromSession = (): JournalEntry[] => {
  const savedEntries = localStorage.getItem("journal-entries");
  return savedEntries ? JSON.parse(savedEntries) : [];
};

const initialState: JournalState = {
  entries: loadEntriesFromSession(),
};

const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    addEntry: (
      state,
      action: PayloadAction<Omit<JournalEntry, "id" | "createdAt">>
    ) => {
      const newEntry: JournalEntry = {
        ...action.payload,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      };
      state.entries.push(newEntry);
      localStorage.setItem("journal-entries", JSON.stringify(state.entries));
    },
    updateEntry: (state, action: PayloadAction<JournalEntry>) => {
      const index = state.entries.findIndex(
        (entry) => entry.id === action.payload.id
      );
      if (index !== -1) {
        state.entries[index] = action.payload;
        localStorage.setItem("journal-entries", JSON.stringify(state.entries));
      }
    },
    deleteEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter(
        (entry) => entry.id !== action.payload
      );
      localStorage.setItem("journal-entries", JSON.stringify(state.entries));
    },
  },
});

export const { addEntry, updateEntry, deleteEntry } = journalSlice.actions;
export default journalSlice.reducer;
