import React, { useState } from "react";
import { useAppDispatch } from "../features/store";
import { deleteEntry } from "../features/journalSlice";
import Card from "./ui/card";
import Button from "./ui/button";
import Dialog from "./ui/dialog-box";
import JournalEntryForm from "./JournalEntryForm";
import Text from "./ui/text";
import { JournalEntry as JournalEntryType } from "../types";

type JournalEntryProps = {
  entry: JournalEntryType;
};

const JournalEntry: React.FC<JournalEntryProps> = ({ entry }) => {
  const dispatch = useAppDispatch();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteEntry(entry.id));
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <Card
        title={entry.title}
        content={entry.content}
        footer={
          <div className="flex justify-end space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsEditDialogOpen(true)}
            >
              Edit
            </Button>
            <Button
              className="bg-red-600"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              Delete
            </Button>
          </div>
        }
      />

      <JournalEntryForm
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        initialEntry={entry}
      />

      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title="Confirm Delete"
      >
        <Text className="mb-4">
          Are you sure you want to delete this journal entry?
        </Text>
        <div className="flex justify-end space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsDeleteDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button className="bg-red-600" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default JournalEntry;
