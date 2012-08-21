var barColor = 'black';
var default_search_text = 'search for a show';
function addKeyboardToolbar(textbox){
  var flexSpace = Ti.UI.createButton({
    systemButton:Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
    right:0
  });
  var doneButton = Ti.UI.createButton({
    systemButton:Ti.UI.iPhone.SystemButton.DONE,
    right:0
  });
  textbox.keyboardToolbar = [flexSpace, doneButton];
  textbox.addEventListener('focus', function(e) {
    textbox.keyboardToolbar = [flexSpace, doneButton];
    doneButton.activeFld = textbox;
  });
  doneButton.addEventListener('click', function(e) {
    e.source.activeFld.blur();
  });
};
function Icon(text, image, window, object){
   this.text = text;
   this.image = image;
   this.window = window;
   this.object = object;
}
var spinner = Ti.UI.createActivityIndicator({
  width:50,
  height:50,  
  top:150,
  message: 'loading...',
  color: 'black',
  style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
})