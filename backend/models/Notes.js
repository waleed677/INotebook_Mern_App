const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
   title: {
         type: String,
            required: true
   },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        required: true,
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }

  });

  module.exports = mongoose.model('Notes', NotesSchema);