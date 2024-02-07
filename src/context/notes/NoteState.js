import React, { useState } from "react";
import  NoteContext  from "./noteContext";


const NoteState = (props)=>{
    const s1 = {
        "name":"Harry",
        "class":"5b" 
    }
    const [state,setState] = useState(s1);
    const update = ()=>{
        setTimeout(()=>{
            setState({
                "name":"Larry",
                "class":"10ab" 
            })
        },1000)
    }

    const notesInitial = [
        {
          "_id": "65bba59d2a635e267856d307",
          "user": "65baabafa7e1fb0fc87c7810",
          "title": "hello my name is lakshya",
          "description": "Do workout in the park",
          "tag": "learning",
          "date": "2024-02-01T14:07:25.791Z",
          "__v": 0
        },
        {
            "_id": "65bba59d2a635e267856d307",
            "user": "65baabafa7e1fb0fc87c7810",
            "title": "hello my name is Akshya",
            "description": "Do something which is helpfull",
            "tag": "learning",
            "date": "2024-02-01T14:07:25.791Z",
            "__v": 0
          }
          ,
        {
            "_id": "65bba59d2a635e267856d307",
            "user": "65baabafa7e1fb0fc87c7810",
            "title": "hello my name is Akshya",
            "description": "Do something which is helpfull",
            "tag": "learning",
            "date": "2024-02-01T14:07:25.791Z",
            "__v": 0
          }
          ,
        {
            "_id": "65bba59d2a635e267856d307",
            "user": "65baabafa7e1fb0fc87c7810",
            "title": "hello my name is Akshya",
            "description": "Do something which is helpfull",
            "tag": "learning",
            "date": "2024-02-01T14:07:25.791Z",
            "__v": 0
          }
          ,
        {
            "_id": "65bba59d2a635e267856d307",
            "user": "65baabafa7e1fb0fc87c7810",
            "title": "hello my name is Akshya",
            "description": "Do something which is helpfull",
            "tag": "learning",
            "date": "2024-02-01T14:07:25.791Z",
            "__v": 0
          }
          ,
        {
            "_id": "65bba59d2a635e267856d307",
            "user": "65baabafa7e1fb0fc87c7810",
            "title": "hello my name is Akshya",
            "description": "Do something which is helpfull",
            "tag": "learning",
            "date": "2024-02-01T14:07:25.791Z",
            "__v": 0
          }
      ];
      const [notes,setNotes] = useState(notesInitial);
    return (
        <NoteContext.Provider value={{state,update,notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;