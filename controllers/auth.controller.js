var db = require('../lowdb');
const bcrypt = require('bcrypt');

module.exports.login =(request,response)=>{
    response.render('auth/login');
};
module.exports.postLogin = (req,res)=>{
    var email = req.body.email;
    var password = req.body.password;
    var user=db.get('users').find({email: email}).value();
    console.log(user);
    if(!user){
        res.render('auth/login',{
            errors: [
                'user does not exist'
            ],
            values: req.body
        });
        return;
    }
    var result;
    bcrypt.compare(password, user.password, function (err, res) {
        result=res;
        if(!result){
            res.render('auth/login',{
                errors:[
                    'wrong password'
                ],
                values: req.body
            })
            return;
        }

    })
    
    console.log(result)
    
    res.cookie('userId',user.id,{
        signed: true
    })
    res.redirect('/users')
};