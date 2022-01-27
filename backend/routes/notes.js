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

 



 module.exports = router;