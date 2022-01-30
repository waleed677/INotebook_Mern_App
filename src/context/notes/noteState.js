import NoteContext from "./noteContext";
import { useState } from "react";
import { body } from "express-validator";


const NoteState = (props) => {
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const Host = "http://localhost:5000/api/";
  // Fetch All Notes Using the Fetch API

  const fetchAllNotes = async () => {
    const response = await fetch(`${Host}notes/getAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmMWE4YTI2OWVlOGFmODA3NTQyYjkzIn0sImlhdCI6MTY0MzMwODEwM30.Oo0pZMRmBgKrXpidluN2dbm1xHQS6c9l90IYgRufokE"
      }
    })
    const data = await response.json();
    setNotes(data);
  }

  // Add a Note Using the Fetch API

  const addNote = async(title, description, tag) => {
    const response = await fetch(`${Host}notes/createNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmMWE4YTI2OWVlOGFmODA3NTQyYjkzIn0sImlhdCI6MTY0MzMwODEwM30.Oo0pZMRmBgKrXpidluN2dbm1xHQS6c9l90IYgRufokE"
      },
      body: JSON.stringify({"title":title,"description":description,"tags":tag})
    })
    const data = await response.json();
    console.log(data);
   setNotes(notes.concat(data));
  }

  const deleteNote = async(id) => {
    const response = await fetch(`${Host}notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmMWE4YTI2OWVlOGFmODA3NTQyYjkzIn0sImlhdCI6MTY0MzMwODEwM30.Oo0pZMRmBgKrXpidluN2dbm1xHQS6c9l90IYgRufokE"
      }
    })
    let newNotes = notes.filter((note) =>{
      return note._id !== id;
    })
    setNotes(newNotes);
  }

  const editNote = async(id, title, description, tag) => {
    const response = await fetch(`${Host}notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmMWE4YTI2OWVlOGFmODA3NTQyYjkzIn0sImlhdCI6MTY0MzMwODEwM30.Oo0pZMRmBgKrXpidluN2dbm1xHQS6c9l90IYgRufokE"
      },
      body: JSON.stringify({id:id,"title":title,"description":description,"tags":tag})
  });
    const data = await response.json();
    
    let newNotes = JSON.parse(JSON.stringify(notes));
    console.log(newNotes);

    for(let i = 0 ; i < newNotes.length ; i++){
      if(newNotes[i]._id === id){
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tags = tag;
        break;
      }
    }
    setNotes(newNotes);

  }

  return (
    <NoteContext.Provider value={{ notes,fetchAllNotes,addNote,deleteNote,editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;