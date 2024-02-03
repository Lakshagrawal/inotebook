const express = require("express")
const router = express.Router();
const fetchuser = require("../middleware/fetchuser")
const Notes = require("../models/Notes")
const { check, validationResult } = require('express-validator');

// Router 1: fetching all the notes present in the db 
router.get('/fetchallnotes',fetchuser, async(req,res)=>{
   try {
      const notes = await Notes.find({user:req.user.id});
      res.json(notes)
   } catch (error) {
      console.error(error.message);
      // console.log(error)
      res.status(500).send("Internal Server Error Try after some time");
   }
})

// Router 2: add all the notes present in the db 
router.post('/addnote',fetchuser,[
   check("title","Enter correct title.").isLength({min:5}),
   check("description","Min length of Description is 5 character").isLength({min:5})
], async(req,res)=>{

   const errors = validationResult(req.body);
    // console.log(req.body)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
    else{
      try {
         const {title,description,tag} = req.body;
         const note = new Notes({
            title,description,tag,user:req.user.id
         })
         const saveNote = await note.save();
         res.json(saveNote);
      } catch (error) {
         console.error(error.message);
         // console.log(error)
         res.status(500).send("Internal Server Error Try after some time");
      }

    }
   
})


// Router 3: updating an existing notes using put "api/notes/updatenote"
router.put('/updatenote/:id',fetchuser, async(req,res)=>{
   try {
      const {title,description,tag} = req.body;
      const newNote = {}
      if(title){newNote.title = title};
      if(description){newNote.description = description};
      if(tag){newNote.tag = tag};

      //find the note which we have to update
      let note = await Notes.findById(req.params.id);

      if(!note){
         return res.status(404).send("Not Found");
      }
      if(note.user.toString() !== req.user.id){
         return res.status(401).send("Not Allowed");
      }
      else{
         note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
         res.json({note});
      }
   } catch (error) {
      console.error(error.message);
      // console.log(error)
      res.status(500).json("Internal Server Error Try after some time")
   }
   
   
})

// Router 4: delete an existing notes using post "api/notes/deletenote"
router.delete('/deletenote/:id',fetchuser, async(req,res)=>{
   try {
      
      //find the note to be delete and delete it
      let note = await Notes.findById(req.params.id);

      if(!note){
         return res.status(404).send("Not Found");
      }
      // Allow deletion only if user owns this notes
      if(note.user.toString() !== req.user.id){
         return res.status(401).send("Not Allowed");
      }
      else{
         note = await Notes.findByIdAndDelete(req.params.id);
         res.json({"Success":"Note has been deleted", note:note});
      }
   } catch (error) {
      console.error(error.message);
      // console.log(error);
      res.status(500).json("Internal Server Error Try after some time")

   }
   
   
})


module.exports = router