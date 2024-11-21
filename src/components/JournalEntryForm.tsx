import { useState, useEffect } from "react";
import { useAppDispatch } from "../features/store";
import { addEntry, updateEntry } from "../features/journalSlice";
import Dialog from "./ui/dialog-box";
import FormControl from "./ui/form-control";
import Button from "./ui/button";
import { JournalEntry } from "../types";

type JournalEntryFormProps = {
  isOpen: boolean;
  onClose: () => void;
  initialEntry?: JournalEntry;
};

const JournalEntryForm: React.FC<JournalEntryFormProps> = ({
  isOpen,
  onClose,
  initialEntry,
}) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (initialEntry) {
      setTitle(initialEntry.title);
      setContent(initialEntry.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [initialEntry, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (initialEntry) {
      // Preserve the original createdAt timestamp when updating
      dispatch(
        updateEntry({
          ...initialEntry,
          title,
          content,
        })
      );
    } else {
      // For new entries, addEntry action will handle creating id and createdAt
      dispatch(
        addEntry({
          title,
          content,
        })
      );
    }

    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={initialEntry ? "Edit Journal Entry" : "New Journal Entry"}
    >
      <form onSubmit={handleSubmit}>
        <FormControl
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          isRequired
        />
        <FormControl
          label="Content"
          as="textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          isRequired
          rows={4}
        />
        <div className="flex justify-end space-x-2 mt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {initialEntry ? "Update" : "Save"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default JournalEntryForm;
