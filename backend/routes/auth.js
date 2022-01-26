const express = require('express');
const User = require('../models/Users');
const fetchUser = require('../middlewares/fetchUser');
const router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const { body, validationResult } = require('express-validator');

const JWT_SECRET = 'Inotebookapp';

// Create New User In Mongo DB
router.post('/createUser', [
   body('name').isLength({ min: 1 }),
   body('email').isEmail(),
   body('password').isLength({ min: 5 })
], async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   let salt = await bcrypt.genSalt(10);
   let secPassword = await bcrypt.hash(req.body.password, salt);
   try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
         return res.status(400).json({ errors: 'Email already exists' });
      }


      user = await User.create({
         name: req.body.name,
         email: req.body.email,
         password: secPassword
      });

      const data = {
         user:{
            id:user.id
         }
      }

      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({authToken});
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');

   }
});

   // Login User EndPoint
   router.post('/login',[
      body('email', 'Please enter a valid Credentials').isEmail(),
      body('password','Please enter a valid Credentials' ).exists()
   ],async(req,res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
         res.status(400).json({errors: errors.array()})
      }

      const {email, password} = req.body;
      try {
         let user = await User.findOne({email});
         if(!user){
            res.status(400).json({error: "Please Try to Login With Valid Credentials!!!"})
         }
         const passwordCompare = await bcrypt.compare(password,user.password);
         if(!passwordCompare){
            res.status(400).json({error: "Please Try to Login With Valid Credentials!!!"})
         }

         const data = {
            user: {
               id:user.id
            }
         }

        const authToken = jwt.sign(data, JWT_SECRET);
        res.send({authToken});
         
      } catch (error) {
         console.error(error.message);
         res.status(500).send('Server Error');
      }
   });


   //  GetUserData Endpoint

   router.post('/getUser', fetchUser, async(req,res) =>{
      try {
         let userId = req.user.id;
         const user = await User.findById(userId).select('-password');
         res.send(user);
      } catch (error) {
         console.error(error.message);
         res.status(500).send('Server Error');
      }
     
   });

module.exports = router;