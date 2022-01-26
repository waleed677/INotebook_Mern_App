import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
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
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }

  });

  module.exports = mongoose.model('Notes', UserSchema);