const mongoose = require('mongoose');
 const UserSchema = new mongoose.Schema({
     googleId:{
         type: String,
         required:true
     },
     displaynameId:{
        type: String,
        required:true
    },
    firstnameId:{
        type: String,
        required:true
    },
    lastnameId:{
        type: String,
        required:true
    },
    imageId:{
        type: String,
        
    },
    createdAt:{
        type: Date,
       default:Date.now
    }
 });

 module.exports = mongoose.model('User', UserSchema);