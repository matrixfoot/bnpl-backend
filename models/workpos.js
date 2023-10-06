const mongoose = require('mongoose');

const workposSchema = mongoose.Schema({
    userId: {
        type: String,
    },
    RECORDREFERENCE:{
        type: String,
    },
    BATCHIDENTIFICATION:{
        type: String,
    },
    BATCHSEQUENCENUMBER:{
        type: String,
    },
    TRANSACTIONSEQUENCENUMBER:{
        type: String,
    },
    MERCHANTIDENTIFICATION:{
        type: String,
    },
    BATCHSEQUENCENUMBER2:{
        type: String,
    },
    DRAFTNUMBER:{
        type: String,
    },
    CARDHOLDERNUMBER:{
        type: String,
    },
    FILLER:{
        type: String,
    },
    TRANSACTIONAMOUNT:{
        type: String,
    },
    FILLER2:{
        type: String,
    },
    TERMINALINVOICENUMBER:{
        type: String,
    },
    TRANSACTIONTIME:{
        type: String,
    },
    CARDEXPIRYDATE:{
        type: String,
    },
    AUTHORIZATIONCODE:{
        type: String,
    },
    TRANSACTIONDATE:{
        type: String,
    },
    SETTLEMENTAMOUNT:{
        type: String,
    },
    FILLER3:{
        type: String,
    },
    TERMINALTYPE:{
        type: String,
    },
    ISSUERBANKCODE:{
        type: String,
    },
    FILLER4:{
        type: String,
    },
    OPERATIONCODE:{
        type: String,
    },
    ACQUIRERBANKCODE:{
        type: String,
    },
    FILLER5:{
        type: String,
    },
    CURRENCYCODE:{
        type: String,
    },
    FILLER6:{
        type: String,
    },
    TERMINALTYPE2:{
        type: String,
    },
    FILLER7:{
        type: String,
    },
    TRANSTRAILERID:{
        type: String,
    },
  doctype: { type: String},
  created: { type: Date, default: Date.now },
  updated: { type: Date}
});
module.exports = mongoose.model('workpos', workposSchema);