function ImageWindow(image_path){

  var styles = require('modules/styles/styles');
  var imageStyles = require('modules/styles/image');
  var self = Ti.UI.createWindow(styles.defaultWindow);

  self.load = function(){
    var imageScroll = Ti.UI.createScrollView(imageStyles.imageScroll);

  	var objectImage = Titanium.UI.createImageView(imageStyles.objectImage);
    objectImage.image = image_path;
  	imageScroll.add(objectImage);

    self.add(imageScroll);
  }
  
  return self;
}

module.exports = ImageWindow;