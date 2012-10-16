function ImageWindow(image_path){

  var styles = require('modules/styles/styles');
  var projectStyles = require('modules/styles/project');
  var self = Ti.UI.createWindow(styles.defaultWindow);

  self.load = function(){

  	var objectImage = Titanium.UI.createImageView({
  	  image: image_path,
  	  top:15
  	});
  	self.add(objectImage);

  	var closeButton = Titanium.UI.createButton({
  	  title:'Close',
  	  height:30,
  	  width:150,
  	  top:5
  	});
  	self.add(closeButton);

  	closeButton.addEventListener('click', function(){
  	  self.close();
  	});
  }
  
  return self;
}

module.exports = ImageWindow;