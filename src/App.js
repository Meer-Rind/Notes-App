import { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import './styles/App.css';

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [activeNote, setActiveNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'New Note',
      content: '',
      color: '#ffffff',
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  const updateNote = (updatedNote) => {
    setNotes(notes.map(note => 
      note.id === updatedNote.id ? 
      { ...updatedNote, updatedAt: new Date().toISOString() } : note
    ));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    if (activeNote === id) {
      setActiveNote(null);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Markdown Notes</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>
      
      <div className="app-container">
        <NoteList 
          notes={filteredNotes} 
          activeNote={activeNote}
          onNoteSelect={setActiveNote}
          onAddNote={addNote}
          onDeleteNote={deleteNote}
        />
        
        <NoteEditor 
          note={notes.find(note => note.id === activeNote)} 
          onUpdateNote={updateNote}
        />
      </div>
      
      <footer className="app-footer">
        <p>Created by Meer-Rind</p>
        <a 
          href="https://github.com/Meer-Rind" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Visit my GitHub
        </a>
      </footer>
    </div>
  );
}

export default App;