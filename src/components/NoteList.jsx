import { FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';
import Note from './Note';

function NoteList({ notes, activeNote, onNoteSelect, onAddNote, onDeleteNote }) {
  return (
    <div className="note-list">
      <div className="note-list-header">
        <h2>Your Notes</h2>
        <button onClick={onAddNote} className="add-note-btn">
          <FiPlus /> New Note
        </button>
      </div>
      
      <div className="notes-container">
        {notes.length === 0 ? (
          <div className="empty-state">
            <p>No notes yet. Create one!</p>
          </div>
        ) : (
          notes.map(note => (
            <Note 
              key={note.id}
              note={note}
              isActive={note.id === activeNote}
              onSelect={onNoteSelect}
              onDelete={onDeleteNote}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default NoteList;