import { useContext, useEffect } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { NotesContext } from '../../app/providers';

const Workspace = () => {
  const { selectedNote, updateNote } = useContext(NotesContext);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (selectedNote) {
        updateNote(selectedNote.id!, selectedNote.content);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNote?.content, updateNote, selectedNote?.id]);

  if (!selectedNote) return <div>Выберите заметку</div>;

  return (
    <div>
      <SimpleMDE
        value={selectedNote.content}
        onChange={(value) => {
          updateNote(selectedNote.id!, value);
        }}
      />
    </div>
  );
};

export default Workspace;
