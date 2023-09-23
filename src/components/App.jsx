import React, { useState,useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {

  const [notes, setNotes] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:3001/notes")
    .then(res=>res.json())
    .then(data=>{
      setNotes(data.notes)})
  },[])

  function addNote(newNote) {
    fetch("http://localhost:3001/notes",{
      method:"POST",
      body:JSON.stringify({
        title:newNote.title,
        content:newNote.content
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
     },
    })
    .then(res=>res.json())
    .then(data=>{
      setNotes(data.notes)
    })
    .catch(err=>{
      console.log(err)
    })
    // setNotes(prevNotes => {
    //   return [...prevNotes, newNote];
    // });
  }

  function deleteNote(id) {
    const newNote = notes[id];
    fetch("http://localhost:3001/delete-note",{
      method:"POST",
      body:JSON.stringify({
        title:newNote.title,
        content:newNote.content
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
     },
    })
    .then(res=>res.json())
    .then(data=>{
      setNotes(data.notes)
    })
    .catch(err=>{
      console.log(err)
    })
    // setNotes(prevNotes => {
    //   return prevNotes.filter((noteItem, index) => {
    //     return index !== id;
    //   });
    // });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
