const mongoose = require('mongoose');
const passportlocalmongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;


const AdminSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
})
AdminSchema.plugin(passportlocalmongoose,{usernameField: 'email'});
module.exports = mongoose.model('Admin', AdminSchema);