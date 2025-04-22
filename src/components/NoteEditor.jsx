import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { FiBold, FiItalic, FiList, FiCode } from 'react-icons/fi';
import ColorPicker from './ColorPicker';
import Tag from './Tag';
import '../styles/Editor.css';

function NoteEditor({ note, onUpdateNote }) {
  const [isPreview, setIsPreview] = useState(false);
  const [newTag, setNewTag] = useState('');
  
  if (!note) {
    return (
      <div className="note-editor empty">
        <p>Select a note or create a new one</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdateNote({ ...note, [name]: value });
  };

  const addTag = () => {
    if (newTag.trim() && !note.tags.includes(newTag.trim())) {
      onUpdateNote({ 
        ...note, 
        tags: [...note.tags, newTag.trim()] 
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    onUpdateNote({ 
      ...note, 
      tags: note.tags.filter(tag => tag !== tagToRemove) 
    });
  };

  const insertMarkdown = (syntax) => {
    const textarea = document.getElementById('note-content');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = note.content.substring(start, end);
    const beforeText = note.content.substring(0, start);
    const afterText = note.content.substring(end);
    
    let newText;
    if (syntax === 'bold') {
      newText = beforeText + `**${selectedText}**` + afterText;
    } else if (syntax === 'italic') {
      newText = beforeText + `*${selectedText}*` + afterText;
    } else if (syntax === 'list') {
      newText = beforeText + (selectedText ? 
        selectedText.split('\n').map(line => `- ${line}`).join('\n') : '- ') + afterText;
    } else if (syntax === 'code') {
      newText = beforeText + '```\n' + selectedText + '\n```' + afterText;
    }
    
    onUpdateNote({ ...note, content: newText });
  };

  return (
    <div className="note-editor">
      <div className="editor-header">
        <input
          type="text"
          name="title"
          value={note.title}
          onChange={handleChange}
          placeholder="Note title"
          className="note-title-input"
        />
        
        <div className="editor-toolbar">
          <button onClick={() => insertMarkdown('bold')} title="Bold">
            <FiBold />
          </button>
          <button onClick={() => insertMarkdown('italic')} title="Italic">
            <FiItalic />
          </button>
          <button onClick={() => insertMarkdown('list')} title="List">
            <FiList />
          </button>
          <button onClick={() => insertMarkdown('code')} title="Code">
            <FiCode />
          </button>
          
          <ColorPicker 
            currentColor={note.color}
            onChange={(color) => onUpdateNote({ ...note, color })}
          />
          
          <button 
            onClick={() => setIsPreview(!isPreview)}
            className={`preview-btn ${isPreview ? 'active' : ''}`}
          >
            {isPreview ? 'Edit' : 'Preview'}
          </button>
        </div>
      </div>
      
      <div className="editor-tags">
        {note.tags.map(tag => (
          <Tag key={tag} tag={tag} onRemove={removeTag} />
        ))}
        <div className="tag-input-container">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTag()}
            placeholder="Add tag..."
          />
          <button onClick={addTag}>+</button>
        </div>
      </div>
      
      {isPreview ? (
        <div className="markdown-preview">
          <ReactMarkdown>{note.content}</ReactMarkdown>
        </div>
      ) : (
        <textarea
          id="note-content"
          name="content"
          value={note.content}
          onChange={handleChange}
          placeholder="Write your note here (Markdown supported)..."
          className="note-content-input"
        />
      )}
    </div>
  );
}

export default NoteEditor;