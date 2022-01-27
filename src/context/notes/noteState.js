import noteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
     const user = {
            "name": "waleed",
            "age": "30",
     }
     const [state, setState] = useState(user);
     const update = () =>{
         setTimeout(() => {
             setState({
                    "name": "Zohra",
                    "age": "32",
             })
         }, 1000);
     }
     return (
    <noteContext.Provider value={{state, update}}>
        {props.children}
    </noteContext.Provider>
        )
}

export default NoteState;