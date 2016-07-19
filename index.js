var Jimp = require("jimp");
var loaderUtils = require("loader-utils");
var Datauri = require('datauri');

var path = require('path');
module.exports = function (source, map) {
  this.cacheable();
  var callback = this.async();

  // Setup the plugin instance with options...
  if (!this.emitFile) throw new Error("emitFile is required from module system");

  var originalImage = path.resolve(this.resource)
  this.addDependency(originalImage);

  var config = {
    publicPath: false,
    name: "[name]_original.[ext]"
  };

  var url = loaderUtils.interpolateName(this, config.name, {});

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
      this.emitFile(url, source);

      callback(null, "module.exports = " + JSON.stringify({
        placeHolder: dataUri,
        fileName: url,
        size: size
      }) + ";", map);
    }.bind(this));
  }.bind(this)).catch(function (err) {
    console.log(err);
  });
}

module.exports.raw = true; // get buffer stream instead of utf8 string