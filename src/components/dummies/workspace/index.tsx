import 'easymde/dist/easymde.min.css';
import { NoteCard } from '../noteCard';
import { useSelectedNote } from '../../../hooks/useSelectNote';

interface IWorkspacePrors {
  setIsEditing: (value: boolean) => void;
}

export const Workspace = ({setIsEditing}: IWorkspacePrors) => {

  const { selectedNoteId } = useSelectedNote();

  return (
    <>
      {selectedNoteId && <NoteCard onEdit={setIsEditing} />}
    </>
  );
};
