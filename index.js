var Jimp = require("jimp");
var loaderUtils = require("loader-utils");
var Datauri = require('datauri');

var path = require('path');
module.exports = function (source, map) {
  this.cacheable();
  var callback = this.async();

  var originalImage = path.resolve(this.resource)
  this.addDependency(originalImage);

  var config = {
    publicPath: false,
    name: "[name]_original.[ext]"
  };

  Jimp.read(originalImage).then(function (image) {
    var extension = loaderUtils.interpolateName(this, '.[ext]', {});

    var size = {
      width: image.bitmap.width,
      height: image.bitmap.height
    };

    image.scaleToFit(42, 42)    // resize
      .quality(60)              // set JPEG quality

    image.getBuffer(Jimp.MIME_JPEG, function (err, result) {
      var dataUri = new Datauri().format(extension, result).content;

      callback(null, "module.exports = " + JSON.stringify({
        dataUri: dataUri,
        size: size
      }) + ";", map);
    }.bind(this));
  }.bind(this)).catch(function (err) {
    console.log(err);
  });
}