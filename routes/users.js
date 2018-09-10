var express = require('express');
var router = express.Router();
var Users = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {

  Users.find({}, function(err, users){

      if(err){
        return res.json({success: false, error: err});
      }

      return res.json({success: true, users: users});
  });

});

module.exports = router;
