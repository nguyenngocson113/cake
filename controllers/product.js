var pg = require('pg');
var configDB = require('../model/database.js');
var conString = configDB.url;
var client = new pg.Client(conString);

exports.getNewProduct = function(req, res,callback) {
  var sosp1trang=10;
  var trangdangxem = req.params.trang;
  var off = (trangdangxem - 1) * sosp1trang;
  var products= [];
  pg.connect(conString,function(err,client,done){
    if(err){
      console.error('error running query', err);
      return callback(err);
    }
    client.query('select id,name,image,unit_price,promotion_price, created_at from products order by created_at DESC LIMIT ' +sosp1trang+ ' OFFSET ' +off,function(err,result){

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
    client.query('select id,name,image,description from type_products ',function(err,result){

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
  var sosp1trang=10;
  var trangdangxem = req.params.trang;
  var off = (trangdangxem - 1) * sosp1trang;
  var products = [];
  pg.connect(conString,function(err,client,done){
    if(err){
      console.error('error running query', err);
      return callback(err);
    }
    client.query('select p.id_type ,p.name,p.image,p.unit_price,p.promotion_price from products p inner join type_products t on p.id_type = t.id where t.id =  '+typeId+' LIMIT '+sosp1trang+' OFFSET '+off,function(err,result){

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
};
exports.getProductBySearch = function(req,res,callback){
  var txtSp = req.body.txtSp;
  var products = [];

  pg.connect(conString,function(err,client,done){
    if(err){
      console.error('error running query', err);
      return callback(err);
    }
    client.query("select id, name, unit_price, image,updated_at,promotion_price  from products where name LIKE '%" +txtSp+ "%'" ,function(err,result){

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
exports.getProductViewMost = function(req, res,callback) {
  var sosp1trang=10;
  var trangdangxem = req.params.trang;
  var off = (trangdangxem - 1) * sosp1trang;
  var products= [];
  pg.connect(conString,function(err,client,done){
    if(err){
      console.error('error running query', err);
      return callback(err);
    }
    client.query('select id,name,image,unit_price,promotion_price, created_at, view from products order by view DESC LIMIT ' +sosp1trang+ ' OFFSET ' +off,function(err,result){

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
exports.getProducts = function(req, res,callback) {
  var products= [];
  pg.connect(conString,function(err,client,done){
    if(err){
      console.error('error running query', err);
      return callback(err);
    }
    client.query('select name from products ',function(err,result){

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
