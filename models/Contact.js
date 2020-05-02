//models/Contact.js
var mongoose = require('mongoose');

//DB schema
var contactSchema = mongoose.Schema({
  name:{type:String, require:true, unique:true},
  email:{type:String},
  phone:{type:String}
});

var Contact = mongoose.model('contact',contactSchema); //스키마 모델 생성

module.exports = Contact;
