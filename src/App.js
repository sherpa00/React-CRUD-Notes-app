
import { useEffect } from 'react';
import './App.css';
import AddNote from './components/addNote';
import NotesList from './components/notesList';
import SearchNotes from './components/searchNotes';

function App() {

  return (
    <div className="App">
      <h1>NOTES-APP</h1>
      <SearchNotes/>
      <AddNote/>
      <NotesList/>
    </div>
  );
}

export default App;
