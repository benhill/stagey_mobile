var imageWin = Titanium.UI.currentWindow;

var objectImage = Titanium.UI.createImageView({
  image: imageWin.image,
  top:15
});

imageWin.add(objectImage);

var closeButton = Titanium.UI.createButton({
  title:'Close',
  height:30,
  width:150,
  top:5
});

imageWin.add(closeButton);

closeButton.addEventListener('click', function(){
  imageWin.close();
});