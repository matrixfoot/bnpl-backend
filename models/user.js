const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String},
  confirmpassword: { type: String},
  firstname: { type: String},
  lastname: { type: String},
  raisonsociale: { type: String},
  role: { type: String},
  banque: { type: String},
  mobile: { type: String},
  fonction: { type: String},
  secteur: { type: String},
  nomsociete: { type: String},
  habilitation: [],
  contact: { type: String},

  clientcode: { type: String},
  ficheUrl: { type: String,},
  civilite: { type: String },
  role: {type: String,default: 'basic',enum: ["basic", "supervisor", "admin"]},
  accessToken: {type: String},
  verified: { type: Date},
  resetToken: {token: String,expires: Date},
  passwordReset: { type: Date},
  created: { type: Date, default: Date.now },
  updated: { type: Date},
  connected: { type: Boolean, default:false},
  desactive: { statut: Boolean, default: false,date: Date},
  restaured: { type: Date},
  compte: { type: String },
  carte: { type: String },
  affiliation: { type: String },
  terminal: { type: String },
  matfiscale: { type: String },
  nature: { type: String},
  usertype: { type: String},
  matriculefiscale: { type: String},
  indicatifagence: { type: String},
  matricule: { type: String},

});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);