import React, { useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';

function About() {
    const a = useContext(noteContext)
    useEffect(() => {
        a.update()
    },[]);

  return (
  <div>
    <h2>I am {a.state.name} and i am {a.state.age} years old!!! </h2>
  </div>
  );
}

export default About;
