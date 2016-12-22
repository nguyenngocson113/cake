var express = require('express');
var router = express.Router();
var FilesController = require('../controllers/product');
var multer = require('multer');

var upload = multer({
  dest: 'public/tmp'
});

/*GET*/
router.get('/getNewProduct/:trang', FilesController.getNewProduct);//lay sp moi, phan trang 1 trang 10 sp
router.get('/getTypes', FilesController.getTypes);// lay ra loai sp
router.get('/getProduct/:productId', FilesController.getProduct);//chi tiet sp
router.get('/getProductType/:typeId/:trang', FilesController.getProductType);//danh sach tung loai banh phan trang 1 trang 10 sp
router.get('/getProductViewMost/:trang', FilesController.getProductViewMost);
router.get('/getProducts', FilesController.getProducts);

//
// /*POST*/
// router.post('/uploadFile',upload.single('file'), FilesController.uploadFile);
router.post('/getProductBySearch', FilesController.getProductBySearch);// search

//
// router.param('fileId', FilesController.queryFile);
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
module.exports = router;
