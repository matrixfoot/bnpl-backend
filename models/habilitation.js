const mongoose = require('mongoose');
const habilitationSchema = mongoose.Schema({
  userId: {type: String},
  id:{type: String},
  intitule:{type: String},
  created: { type: Date, default: Date.now },
  updated: { type: Date}
});
module.exports = mongoose.model('habilitation', habilitationSchema);