Ti.include("helper.js");
var projectTab = Ti.UI.currentTab;
var galleryWin = Ti.UI.currentWindow
var images = galleryWin.images;
var galleryScroll = Titanium.UI.createScrollView({
  contentWidth:'95%',
  contentHeight:1100,
  top:5,
  left:0,
  height:800,
  showVerticalScrollIndicator:true,
  showHorizontalScrollIndicator:true
});;
var image_place = 0;
var image_top = 0;
for(i = 0;i < images.length; i++){
  if(i > 0 && i % 4 === 0){image_place = 0;image_top += 75;}
  var image = Ti.UI.createImageView({
    maxZoomScale:5,
    image: images[i].thumbnail_path,
    width:70,
    height:70,
    left:image_place * 77,
    top:image_top,
    layout:'absolute',
    full_image_path: images[i].image_path,
    borderRadius:10,
    borderWidth:0
  });
  galleryScroll.add(image);
  image.addEventListener('click', function(e){
    var imageWin = Titanium.UI.createWindow({
      backgroundColor:'white',
      url:'image.js',
      image:e.source.full_image_path
    });                
    imageWin.open();
  });
  image_place ++;
}
galleryWin.add(galleryScroll);
galleryWin.open();