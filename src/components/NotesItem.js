import React,{useContext} from 'react';
import NoteContext from "../context/notes/noteContext";
const NotesItem = (props) => {
    const {note,updateNote} = props;
    const noteContext = useContext(NoteContext);
    const {deleteNote} = noteContext;

    return(
    <div className='col-md-4'>
        <div className="card my-3">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <p className="card-text">{note.tags}</p>
                <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                <i className="fas fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
            </div>
        </div>
    </div>
    );
};

export default NotesItem;
