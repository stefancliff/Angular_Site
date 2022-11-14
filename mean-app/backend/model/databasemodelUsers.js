var mongoose = require("mongoose");

//Setup the schema for the Users in the database
var usersSchema = mongoose.Schema({
  fname: { type: String, required: true},
  lname: { type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true},
  index: { type: String, required: true}
});

module.exports = mongoose.model('Users', usersSchema);
module.exports.get = function(callback, limit){
  Users.find(callback).limit(limit);
};
