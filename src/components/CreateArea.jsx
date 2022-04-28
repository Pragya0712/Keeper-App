import React, {useState} from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import axios from "axios";

function CreateArea(props) {

  const [noteInput, setNoteInput] = useState({
    title: "",
    content: ""
  });

  const [isExpanded, setExpanded] = useState(false);

  function handleChange(event){
    const {value, name} = event.target;
    
    setNoteInput(prevNote =>{
      return {
        ...prevNote,
        [name]: value
      }
    });
  }

  function submitNote(event){
      props.onAdd(noteInput);

      axios.post("http://localhost:5000/notes/", noteInput);
      window.location = "/"

      setNoteInput({
        title: "",
        content: ""
        });

      event.preventDefault();
  };

  function expand(){
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && 
          (<div>
            <input 
              onChange={handleChange} 
              name="title" placeholder="Title" 
              value={noteInput.title} 
            />
            <hr />
          </div>)}
        <textarea 
          onChange= {handleChange}
          onClick= {expand} 
          name="content" 
          placeholder="Take a note..." 
          rows={isExpanded ? 3 : 1} value={noteInput.content} 

        />
        
        <Zoom in={isExpanded}>
          <Fab onClick = {submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
        
      </form>
    </div>
  );
}

export default CreateArea;
