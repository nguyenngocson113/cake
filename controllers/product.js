var pg = require('pg');
var configDB = require('../model/database.js');
var conString = configDB.url;
var client = new pg.Client(conString);

exports.getNewProduct = function(req, res,callback) {
  var products= [];
  pg.connect(conString,function(err,client,done){
    if(err){
      console.error('error running query', err);
      return callback(err);
    }
    client.query('select id,name,image,unit_price,promotion_price, created_at from products order by created_at DESC',function(err,result){

      if(err){
        console.log('err')
        return callback(err);
      }
        {
          result.rows.forEach(function(sp){
            products.push(sp);
          })
          return res.json({products})
        }
        done();
    });
  });
}
exports.getTypes = function(req,res,callback){
  var types = [];
  pg.connect(conString,function(err,client,done){
    if(err){
      console.error('error running query', err);
      return callback(err);
    }
    client.query('select name,image from type_products ',function(err,result){

      if(err){
        console.log('err')
        return callback(err);
      }
        {
          result.rows.forEach(function(type){
            types.push(type)
          })
          return res.json({types});
        }
        done();
    });
  });
}
exports.getProduct = function(req,res,callback){
  var productId = req.params.productId;
  var product = [];
  pg.connect(conString,function(err,client,done){
    if(err){
      console.error('error running query', err);
      return callback(err);
    }
    client.query('select id,name,image, description from products where id= '+ productId,function(err,result){

      if(err){
        console.log('err')
        return callback(err);
      }
        {
          result.rows.forEach(function(sp){
            product.push(sp)
          })
          return res.json({product});
        }
        done();
    });
  });
}
exports.getProductType = function(req,res,callback){
  var typeId = req.params.typeId;
  var products = [];
  pg.connect(conString,function(err,client,done){
    if(err){
      console.error('error running query', err);
      return callback(err);
    }
    client.query('select p.id_type ,p.name,p.image,p.unit_price,p.promotion_price from products p inner join type_products t on p.id_type = t.id where t.id =   '+ productId,function(err,result){

      if(err){
        console.log('err')
        return callback(err);
      }
        {
          result.rows.forEach(function(sp){
            products.push(sp)
          })
          return res.json({products});
        }
        done();
    });
  });
}
