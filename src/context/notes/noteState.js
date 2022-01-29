import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "61f2e49afc4d01cf53a2434d",
          "user": "61f1a8a269ee8af807542b93",
          "title": "My First Title Updated",
          "description": "My First Title description",
          "timeStamp": "2022-01-27T18:29:46.724Z",
          "__v": 0
        },
        {
          "_id": "61f2e4ccfc4d01cf53a24351",
          "user": "61f1a8a269ee8af807542b93",
          "title": "My 3rd Title",
          "description": "My First Title description",
          "timeStamp": "2022-01-27T18:30:36.268Z",
          "__v": 0
        }
      ];
    const [notes, setNotes] = useState(notesInitial);
     return (
    <NoteContext.Provider value={{notes,setNotes}}>
        {props.children}
    </NoteContext.Provider>
        )
}

export default NoteState;