var express = require('express');
var router = express.Router();
var FilesController = require('../controllers/bill.js');
var multer = require('multer');

var upload = multer({
  dest: 'public/tmp'
});

/*GET*/
router.post('/getAddress', FilesController.getAddress);

//
// /*POST*/
// router.post('/uploadFile',upload.single('file'), FilesController.uploadFile);
//
// router.param('fileId', FilesController.queryFile);

module.exports = router;
