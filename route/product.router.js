var express = require('express');
var db = require('../lowdb');
var shortid = require('shortid');
var controller = require('../controllers/product.controller')
var router = express.Router();
var validate = require('../validate/user.validate')

router.get('/',controller.index);


module.exports = router;