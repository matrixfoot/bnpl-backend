const mongoose = require('mongoose');
const motifreclamationSchema = mongoose.Schema({
  userId: {type: String},
  groupe:[],
  created: { type: Date, default: Date.now },
  updated: { type: Date}
});
module.exports = mongoose.model('motifreclamation', motifreclamationSchema);