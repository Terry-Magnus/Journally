import { useAppSelector } from "../features/store";
import Text from "./ui/text";
import JournalEntry from "./JournalEntry";

const JournalList = () => {
  const entries = useAppSelector((state) => state.journal.entries);

  if (entries.length === 0) {
    return (
      <Text color="gray" className="text-center">
        You have no journal entries
      </Text>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <JournalEntry key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default JournalList;
