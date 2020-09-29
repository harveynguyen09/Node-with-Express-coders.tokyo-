var express = require('express');
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });
var db = require('../lowdb');
var shortid = require('shortid');
var controller = require('../controllers/user.controller')
var router = express.Router();
var validate = require('../validate/user.validate')
var authMiddleware = require("../middlewares/auth.middleware")


router.get('/',authMiddleware.requireAuth,controller.index);

router.get('/cookie',function(req,res,next){
    res.cookie('user_id',12345);
    res.send('hello')
})

router.get('/search',controller.search);

router.get('/create',controller.create);

router.get('/:id',controller.getId);

router.post('/create',upload.single('avatar'),validate.postCreate, controller.postId);
module.exports = router;