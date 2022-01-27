const express = require('express');
const router = express.Router();
const Notes = require("../models/Notes");
const fetchUser = require('../middlewares/fetchUser');
const { body, validationResult } = require('express-validator');

  // Route 1 Add NOtes to DB Using the POST 
router.post('/createNotes',fetchUser,[
   body('title','Please enter a valid Title').isLength({min:3}),
   body('description', 'Please enter a valid description').isLength({min:5}),
   body('tag', 'Please enter a valid tag').isLength({min:5}),
], async (req, res) => {
   try {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array()});
      }
      const {title , description , tag} = req.body;
   
      const notes = new Notes({
         title,description,tag,user:req.user.id
      })
      const savedNotes = notes.save();
      res.json(savedNotes);
   } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
   }
  
});


  // Route 2 Get All Notes from DB Using the GET 

  router.get('/getAllNotes', fetchUser , async(req,res) => {
     try {
      const notes = await Notes.find({user:req.user.id})
      res.json(notes);
     } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
     }
  
  });


   // Route 3 Update Notes Using the PUT 

   router.put('/updateNote/:id', fetchUser , [
      body('title', 'Please Enter Valid Title'),
      body('description', 'Please enter Valid Description'),
      body('tag', 'Please enter a valid Tags')
   ], async(req,res)=>{
      const errors = validationResult(req);
      if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array()})
      }

      const {title, description , tag} = req.body;
      const noteUpdated = {};

      if(title){noteUpdated.title = title}
      if(description){noteUpdated.description = description}
      if(tag){noteUpdated.tag = tag}

      let note = await Notes.findById(req.params.id);
      if(!note){res.status(404).json({error:"Not Found"})}

      if(note.user.toString() !== req.user.id){
         res.status(401).json({error:"Not Allowed"})
      }

      note = await Notes.findByIdAndUpdate(req.params.id,{$set:noteUpdated}, {new:true})
      res.json(note);
   })

 



 module.exports = router;