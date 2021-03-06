var pg = require('pg');
var configDB = require('../model/database.js');

var pgp = require('pg-promise')();

var pool = new pg.Pool(configDB.config);

exports.getNewProduct = function(req, res, next) {
  var sosp1trang=10;
  var trangdangxem = req.params.trang;
  var off = (trangdangxem - 1) * sosp1trang;
  var products= [];
  pool.connect(function(err, client, done) {
    if(err){
      console.error('error running query', err);
      return next(err);
    }

    client.query('select id,name,image,unit_price,promotion_price, "createdAt" from products order by "createdAt" DESC LIMIT ' +sosp1trang+ ' OFFSET ' +off,function(err,result){
      done();

      if(err){
        console.log('err')
        return next(err);
      }
      result.rows.forEach(function(sp){
          products.push(sp);
      });

      return res.json({products})

    });
  });

};
exports.getTypes = function(req, res, next){
  var types = [];
  pool.connect(function(err, client, done){
    if(err) {
      console.error('error running query', err);
      return next(err);
    }
    client.query('select id,name,image,description from type_products ', function(err, result) {
      done();

      if(err) {
        console.log('err')
        return next(err);
      }
      result.rows.forEach(function(type){
          types.push(type)
      });

      return res.json({types});

    });
  });
}
exports.getProduct = function(req, res, next){
  var productId = req.params.productId;
  var product = [];
  pool.connect(function(err, client, done){
    if(err) {
      console.error('error running query', err);
      return next(err);
    }
    client.query('select id, name, image, unit_price, promotion_price, description from products where id= '+ productId,function(err,result){
      done();

      if(err) {
        console.log('err')
        return next(err);
      }

      result.rows.forEach(function(sp){
        product.push(sp)
      });
      return res.json({product});

    });
  });
}
exports.getProductType = function(req, res, next){
  var typeId = req.params.typeId;
  var sosp1trang=10;
  var trangdangxem = req.params.trang;
  var off = (trangdangxem - 1) * sosp1trang;
  var products = [];
  pool.connect(function(err, client, done){
    if(err){
      console.error('error running query', err);
      return next(err);
    }
    client.query('select p.id ,p.name,p.image,p.unit_price,p.promotion_price from products p inner join type_products t on p.id_type = t.id where t.id =  '+typeId+' LIMIT '+sosp1trang+' OFFSET '+off,function(err,result){

      done();

      if(err){
        console.log('err')
        return next(err);
      }

      result.rows.forEach(function(sp){
        products.push(sp)
      });

      return res.json({products});

    });
  });
};
exports.getProductBySearch = function(req, res, next){
  var txtSp = req.body.txtSp;
  var products = [];

  pool.connect(function(err, client, done){
    if(err){
      console.error('error running query', err);
      return next(err);
    }
    client.query('select id, name, unit_price,"updatedAt", image,promotion_price  from products where name LIKE '+ "'%"+txtSp+"%'" ,function(err,result){

      done();
      if(err){
        console.log('err')
        return next(err);
      }

      result.rows.forEach(function(sp){
        products.push(sp)
      });

      return res.json({products});
    });
  });
}
exports.getProductViewMost = function(req, res, next) {
  var sosp1trang=10;
  var trangdangxem = req.params.trang;
  var off = (trangdangxem - 1) * sosp1trang;
  var products= [];
  pool.connect(function(err, client, done){
    if(err){
      console.error('error running query', err);
      return next(err);
    }
    client.query('select id,name,image,unit_price,promotion_price, "createdAt", view from products order by view DESC LIMIT ' +sosp1trang+ ' OFFSET ' +off,function(err,result){
      done();

      if(err){
        console.log('err')
        return next(err);
      }

      result.rows.forEach(function(sp){
         products.push(sp);
      });

      return res.json({products});
    });
  });
}
exports.getProducts = function(req, res, next) {
  var products= [];
  pool.connect(function(err,client,done){
    if(err){
      console.error('error running query', err);
      return next(err);
    }
    client.query('select name from products ',function(err,result){

      done();

      if(err){
        console.log('err')
        return next(err);
      }

      result.rows.forEach(function(sp){
            products.push(sp);
      });

      return res.json({products})
    });
  });
}


exports.productBuy = function(req, res, next) {

    pool.connect(function(err, client, done) {
      if (err) {
        console.error('error running query', err);
        next(err);
      }
      client.query('Insert into bills (name, email, address, phone, total) values ($1, $2, $3, $4, $5) RETURNING id',
          [req.body.name, req.body.email, req.body.address, req.body.phone, req.body.total], function(err, result) {

          if (err) {
            next(err);
          } else {
            var idBill = result.rows[0].id;
            var products = req.body.products;

            products.forEach(product => {
              product.idBill = idBill*1;
            });

            // performance-optimized, reusable set of columns:
            var tb = new pgp.helpers.ColumnSet(['idBill', 'idProduct', 'quality', 'price'], {table: 'detailBills'});

            // generating a multi-row insert query:
            var query = pgp.helpers.insert(products, tb);

            // executing the query:
            client.query(query)
                .then(data => {
                    done();
                    res.json({
                      success: true,
                      data: {}
                    });

                })
                .catch(error => {
                    done();
                    res.json({
                      success: false,
                      data: {}
                    });
                });

          }
      });
    });
};
