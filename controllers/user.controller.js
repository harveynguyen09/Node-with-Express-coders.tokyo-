var db = require('../lowdb');
var shortid = require('shortid');
var bcrypt = require('bcrypt');

module.exports.index =(request,response)=>{
    response.render('users/index',{
        users: db.get('users').value()
    })
}
module.exports.search = (req,res)=>{
    var q = req.query.q
    var matchUser = db.get('users').value().filter((x)=>{
        return x.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index',{
        users: matchUser
    });
};
module.exports.create = (req,res)=>{
    console.log(req.cookies)
    res.render('users/create');
};
module.exports.getId = (req,res)=>{
    var id = req.params.id;
    var result = db.get('users').find({ id: id }).value()
    console.log(result)
    res.render('users/view',{
        users: result
    })
};
module.exports.postId = (req,res)=>{
    req.body.id =shortid.generate();
    //bcrypt
    var request = req.body;
    var saltRounds = 10;
    
    var myPlaintextPassword = req.body.password;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
            request.password = hash
            console.log(hash);
            db.get('users').push(request).write();
        });
    });
    //upload pic
    req.body.avatar = 'uploadS/'+req.file.filename;
    console.log(res.locals)   
    res.redirect('/users')
};