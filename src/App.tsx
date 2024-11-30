import { useState } from "react";
import Button from "./components/ui/button";
import JournalList from "./components/JournalList";
import JournalEntryForm from "./components/JournalEntryForm";
import Box from "./components/ui/box";
import Container from "./components/ui/container";
import Text from "./components/ui/text";

const App: React.FC = () => {
  const [isAddEntryDialogOpen, setIsAddEntryDialogOpen] = useState(false);

  return (
    <Container className="bg-[url('./assets/wooden-bg.jpg')] justify-center">
      <Box className="w-full max-w-2xl p-6 bg-[url('./assets/paper-bg.jpg')] rounded-lg shadow-md">
        <Text variant="bold" className="text-center mb-6 text-4xl">
          Journally
        </Text>
        <Text variant="italic" size="base" className="text-center mb-6">
          Tell me all your little secrets..... I won't tell🧙🏼‍♂️🤫🖋
        </Text>

        <JournalList />

        <Box className="text-center mt-6">
          <Button
            onClick={() => setIsAddEntryDialogOpen(true)}
            variant="primary"
          >
            Add New Entry
          </Button>
        </Box>

        <JournalEntryForm
          isOpen={isAddEntryDialogOpen}
          onClose={() => setIsAddEntryDialogOpen(false)}
        />
      </Box>
    </Container>
  );
};

export default App;
