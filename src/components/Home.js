import React from "react";
import AddNotes from "./AddNotes";
import Notes from "./Notes";

function Home() {
   
   
  return (
    <div className="container my-3">
     <AddNotes/>
     <Notes/>
    </div>
  );
}

export default Home;
