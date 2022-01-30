import React, {useContext,useState} from 'react';
import NoteContext from '../context/notes/noteContext';

const AddNotes = () => {

    const context = useContext(NoteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title:"", description:"",tag:""});

    const onChange = (e) => {
        setNote({...note,[e.target.name]:e.target.value});
    }
    const handleClick = (e) =>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"",tag:""});
    }
    return (
        <>
            <h2>Add a Note</h2>

            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        name='title'
                        className="form-control"
                        id="title"
                        aria-describedby="emailHelp"
                        onChange={onChange}
                        value={note.title}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name='description'
                        onChange={onChange}
                        value={note.description}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                        Tags
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="tag"
                        name='tag'
                        onChange={onChange}
                        value={note.tag}
                    />
                </div>
               
                <button type="submit" className="btn btn-primary" onClick={handleClick}>
                    Add Notes
                </button>
            </form>
        </>
    );
};

export default AddNotes;
