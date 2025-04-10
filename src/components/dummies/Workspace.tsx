import { useEffect } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useNotes } from '../../hooks';

export const Workspace = () => {
  const { selectedNote, updateNote } = useNotes();

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     if (selectedNote) {
  //       updateNote(selectedNote.id!, selectedNote.content);
  //     }
  //   }, 1000);

  //   return () => clearTimeout(timeoutId);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedNote?.content, updateNote, selectedNote?.id]);

  return (
    <div>
      <SimpleMDE
        value={selectedNote?.content as string}
        onChange={(value) => {
          updateNote(selectedNote?.id as string, value);
        }}
      />
    </div>
  );
};
