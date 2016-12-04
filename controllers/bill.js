var NodeGeocoder = require('node-geocoder');
var options = {
  provider: 'google',
  httpApdapter:'https',
  apiKey: 'AIzaSyBL18dXATiadpnNsfIFpiXF4sKtzS_HXcU',
  formatter: null
}
exports.getAddress = function(req, res) {
    var txtaddress = req.body.txtaddress;
    var address = [];
    var geocoder = NodeGeocoder(options);
  geocoder.geocode(txtaddress,function(err,result){
    result.forEach(function(dc){
      address.push(dc);
    })
    return res.json({address});

  })
}
