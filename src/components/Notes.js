import React, { useContext, useEffect, useRef,useState } from 'react';
import NoteContext from "../context/notes/noteContext";
import NotesItem from './NotesItem';

const Notes = () => {
  const noteContext = useContext(NoteContext);
  const { notes, fetchAllNotes,editNote } = noteContext;
  const [note, setNote] = useState({id:"", etitle:"", edescription:"",etag:""});
  useEffect(() => {
    fetchAllNotes();
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title, edescription:currentNote.description,etag:currentNote.tags});
  }
  const onChange = (e) => {
    setNote({...note,[e.target.name]:e.target.value});
}
const handleClick = (e) =>{
    editNote(note.id,note.etitle, note.edescription, note.etag);
    refClose.current.click();
   
}
  const ref = useRef(null)
  const refClose = useRef(null)
  return (

    <div>

      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        name='etitle'
                        className="form-control"
                        id="etitle"
                        aria-describedby="emailHelp"
                        onChange={onChange}
                        value={note.etitle}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">
                        Description
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="edescription"
                        name='edescription'
                        onChange={onChange}
                        value={note.edescription}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="etag" className="form-label">
                        Tags
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="etag"
                        name='etag'
                        onChange={onChange}
                        value={note.etag}
                    />
                </div>
            
            </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes:</h2>
        {notes.map((note) => {
          return <NotesItem key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </div>);
};

export default Notes;
