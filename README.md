## Summary

Creates a small 42x42 pixel BASE64 image that can be used to generate placeholder images

This loader does **not** require ImageMagick. Instead this loader makes use of [LWIP](https://github.com/EyalAr/lwip), a Node.js based image processor.


## Installation

Install LWIP

`npm install lwip --save-dev`

Install webpack-image-placeholder

`npm install webpack-image-placeholder --save-dev`

## Usage
``` javascript
var placeHolder = require("webpack-image-placeholder!./image.jpeg");
var placeHolderImageElement = document.createElement('img');
placeHolderImageElement.setAttribute('src', milkyWayImage.placeHolder);
```

## Demo
https://code.facebook.com/posts/991252547593574/the-technology-behind-preview-photos

![sample image](https://github.com/cgatian/webpack-image-placeholder/raw/master/test/fade.gif "Sample placeholder usage")


## License

MIT (http://www.opensource.org/licenses/mit-license.php)