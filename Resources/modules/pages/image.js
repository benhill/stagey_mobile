function ImageWindow(image_path){

  var app = require('modules/core');
  var styles = require('modules/styles/styles');
  var imageStyles = require('modules/styles/image');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);

  self.load = function(){

    spinner.show();
    self.add(spinner);
    
    var imageScroll = Ti.UI.createScrollView(imageStyles.imageScroll);

  	var objectImage = Titanium.UI.createImageView(imageStyles.objectImage);
    objectImage.image = image_path;
  	imageScroll.add(objectImage);

    objectImage.addEventListener("load", function(e) {
      spinner.hide();
    });

    self.add(imageScroll);
  }
  
  return self;
}

module.exports = ImageWindow;