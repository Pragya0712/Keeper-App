import React, {useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";


function App() {

  const [notes, setNotes] = useState([]);

  function addNote(noteInput){
    setNotes((prevNotes)=>{
      return [...prevNotes, noteInput];
    })

  }

  useEffect(() => {
    axios.get("http://localhost:5000/notes/")
      .then(res => {
        setNotes(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  });

  function deleteItem(id){
    axios.delete(`http://localhost:5000/notes/${id}`)
    setNotes(prevNotes => {
      return prevNotes.filter((note, index) => {
        return index !== id;
      } )
    })

  }

  return (
    <div>
      <Header />
      <CreateArea 
        onAdd = {addNote}
      />
      {notes.map((note, index)=>(
        <Note 
          key={index} 
          id={note._id} 
          title={note.title} 
          content={note.content} 
          onDelete={deleteItem}/>
      ))}
      
      <Footer />
    </div>
  );
}

export default App;
