import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import Swal from 'sweetalert2'

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [isTitle, setTitle] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    if (note.title === "") {
      Swal.fire({
        icon: 'error',
        text: 'Title is mandatory!',
      })
    }
    else {
      props.onAdd(note);
      setNote({
        title: "",
        content: ""
      });
    }
    event.preventDefault();
  }

  function handleTitle() {
    setTitle(true);
  }

  return (
    <div>
      <form className="create-note">
        {isTitle && <input
          required
          type="text"
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />}
        <textarea
          name="content"
          onClick={handleTitle}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isTitle ? 3 : 1}
        />
        <Zoom in={isTitle}>
          <Fab type="submit" onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
