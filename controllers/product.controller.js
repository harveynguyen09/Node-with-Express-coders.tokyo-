var db = require('../lowdb');
var shortid = require('shortid');
var perpage = 8;
module.exports.index =(request,response)=>{
    var page = parseInt(request.query.page)||1;
    var begin = (page-1) * perpage;
    var end = page * perpage;
    
    // PAGINATION RENDER
    var number = db.get('products').value().length
    var a = number/perpage;
    var paginationArray = [];
    for(var i=0;i<a;i++){
        paginationArray[i]= i+1;
    }
    var paginationStart = 0;
    var paginationEach = 3;
    var paginationEnd = paginationStart + paginationEach;
    
    response.render('product/index',{
        products: db.get('products').value().slice(begin,end),
        paginations: paginationArray.slice(paginationStart,paginationEnd)
    })
}