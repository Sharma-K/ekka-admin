const mongoose = require('mongoose');
const passportlocalmongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        
    },
    lastname: {
        type: String,
        
    },
    email: {
        type: String,
        
    },
    address: {
        type: String,
        
    },
    ec_select_city: {
        type: String,
       
    },
    postalcode: {
        type: Number,
        
    },
    ec_select_country: {
      type: String,
      
    },
    ec_select_state: {
        type: String,
       
    },
    password: {
        type: String,
        
    },
    isAdmin: {
        type: Boolean
    },
    username:{
        type: String
    }

})
UserSchema.plugin(passportlocalmongoose,{usernameField: 'email'});
module.exports = mongoose.model('User', UserSchema);