var mongoose = require("mongoose");

//Setup the schema for the furniture in the database
var furnitureSchema = mongoose.Schema({
  name: { type: String, required: true},
  main_material: { type: String, required: true},
  colour: { type: String, required: true},
  type: { type: String, required: true},
  area: { type: String, required: true},
  index: { type: String, required: true},
});

module.exports = mongoose.model('Furniture', furnitureSchema);
module.exports.get = function(callback, limit){
  Furniture.find(callback).limit(limit);
};
