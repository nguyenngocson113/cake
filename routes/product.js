var express = require('express');
var router = express.Router();
var FilesController = require('../controllers/product');
var multer = require('multer');

var upload = multer({
  dest: 'public/tmp'
});

/*GET*/
router.get('/getNewProduct', FilesController.getNewProduct);
router.get('/getTypes', FilesController.getTypes);
router.get('/getProduct/:productId', FilesController.getProduct);
router.get('/getProductType/:typeId', FilesController.getProductType);

//
// /*POST*/
// router.post('/uploadFile',upload.single('file'), FilesController.uploadFile);
//
// router.param('fileId', FilesController.queryFile);

module.exports = router;
