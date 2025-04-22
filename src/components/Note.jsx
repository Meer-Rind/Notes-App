import { FiTrash2, FiEdit } from 'react-icons/fi';
import Tag from './Tag';

function Note({ note, isActive, onSelect, onDelete }) {
  const truncatedContent = note.content.length > 100 
    ? note.content.substring(0, 100) + '...' 
    : note.content;

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(note.id);
  };

  return (
    <div 
      className={`note ${isActive ? 'active' : ''}`}
      style={{ backgroundColor: note.color }}
      onClick={() => onSelect(note.id)}
    >
      <div className="note-header">
        <h3>{note.title}</h3>
        <button onClick={handleDelete} className="delete-btn">
          <FiTrash2 />
        </button>
      </div>
      <div className="note-content-preview">
        {truncatedContent}
      </div>
      <div className="note-tags">
        {note.tags.map(tag => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>
      <div className="note-date">
        {new Date(note.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
}

export default Note;