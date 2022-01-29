import React,{useContext} from 'react';
import NoteContext from "../context/notes/noteContext";
import NotesItem from './NotesItem';

const Notes = () => {
    const noteContext = useContext(NoteContext);
    const {notes, setNotes} = noteContext;
    return (
    <div>
         <div className="row my-3">
        <h2>Your Notes:</h2>
        {notes.map( (note) => {
            return <NotesItem key={note._id} note = {note}/>
        })}
      </div>
    </div>);
};

export default Notes;
