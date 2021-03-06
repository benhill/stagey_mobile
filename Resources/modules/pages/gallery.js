function GalleryWindow(mode, object_id){

  var app = require('modules/core');
  var styles = require('modules/styles/styles');
  var galleryStyles = require('modules/styles/gallery');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var galleryScroll = Titanium.UI.createScrollView(galleryStyles.galleryScroll);
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);  

  self.load = function(){

    spinner.show();
    self.add(spinner);

    var imagesObj = require('modules/models/images');
    new imagesObj(object_id, mode, function(images){

      var image_place = 0;
      var image_top = 0;

      for(i = 0;i < images.length; i++){

        if(i > 0 && i % 4 === 0){image_place = 0;image_top += 75;}

        var image = Ti.UI.createImageView(galleryStyles.image);
        image.image = images[i].thumbnail_path;
        image.full_image_path = images[i].image_path;
        image.left = image_place * 77;
        image.top = image_top;
        galleryScroll.add(image);

        image.addEventListener('click', function(e){
          app.openWindow(self, 'Image', 'image', [e.source.full_image_path]);
        });        

        image_place ++;
      }

      spinner.hide();
      self.add(galleryScroll);

    });
  }
  
  return(self)
}

module.exports = GalleryWindow;