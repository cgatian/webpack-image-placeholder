var Jimp = require("jimp");
var loaderUtils = require("loader-utils");
var Datauri = require('datauri');

var path = require('path');
module.exports = function (source, map) {

  var callback = this.async();

  // Setup the plugin instance with options...
  if (!this.emitFile) throw new Error("emitFile is required from module system");

  var config = {
    publicPath: false,
    name: "[name]_original.[ext]"
  };
  var url = loaderUtils.interpolateName(this, config.name, {});

  Jimp.read(path.resolve(this.resource)).then(function (image) {
    var size = {
      width: image.bitmap.width / 8,
      height: image.bitmap.height / 8
    };

    image.resize(42, Jimp.AUTO)            // resize
      .quality(60)                 // set JPEG quality

    var buff = image.getBuffer(Jimp.MIME_JPEG, function (err, result) {

      var uri = new Datauri().format('.jpg', result).content;

      this.emitFile(url, source);


      callback(null, "module.exports = " + JSON.stringify({
        placeHolder: uri,
        fileName: url,
        size: size
      }) + ";", map);
      
    }.bind(this));

  }.bind(this)).catch(function (err) {

    console.log(err);
  });
}

module.exports.raw = true; // get buffer stream instead of utf8 string