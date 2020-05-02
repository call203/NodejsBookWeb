// models/Contact.js
var express = require('express');
var router = express.Router();
var Contact = require("../models/Contact");

//Contacts - index
router.get('/', function(req, res){
  //find: DB에서 검색 조건에 맞는 모델 찾고 콜백 함수를 호출
  Contact.find({},function(err,contacts){
    if(err) return res.json(err); //에러가 있다면 json으로 표시
    res.render('contacts/index',{contacts:contacts});
  });
});
//Contacts - New
router.get('/new',function(req,res){
  res.render('contacts/new');
});
//Contacts - create
router.post('/',function(req,res){
  //create: data생성함
  Contact.create(req.body,function(err,contact){
    if(err) return res.json(err);
    res.redirect('/contacts');
  })
});
//Contact - show
router.get('/:id',function(req,res){
  Contact.findOne({_id:req.params.id},function(err,contact){
    if(err) return res.json(err);
    res.render('contacts/show',{contact:contact});
  })
});
//Contact - edit
router.get('/:id/edit',function(req,res){
  Contact.findOne({_id:req.params.id},function(err,contact){
    if(err) return res.json(err);
    res.render('contacts/edit',{contact:contact});
  })
});
//Contact - update
router.put('/:id',function(req,res){
  Contact.findOneAndUpdate({_id:req.params.id},req.body, function(err,contact){
    if(err) return res.json(err);
    res.redirect('/contacts/'+ req.params.id);
  })
});
//Contact - destroy
router.delete('/:id',function(req,res){
  Contact.deleteOne({_id:req.params.id},function(err,contact){
    if(err) return res.json(err);
    res.redirect('/contacts')
  })
});

module.exports = router;
