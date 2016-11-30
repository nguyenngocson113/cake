var express = require('express');
var router = express.Router();
var FilesController = require('../controllers/product');
var multer = require('multer');

var upload = multer({
  dest: 'public/tmp'
});

/*GET*/
router.get('/getNewProduct:trang', FilesController.getNewProduct);
router.get('/getTypes', FilesController.getTypes);
router.get('/getProduct/:productId', FilesController.getProduct);
router.get('/getProductType/:typeId/:trang', FilesController.getProductType);
router.post('/getProductBySearch', FilesController.getProductBySearch);

//
// /*POST*/
// router.post('/uploadFile',upload.single('file'), FilesController.uploadFile);
//
// router.param('fileId', FilesController.queryFile);
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
module.exports = router;
