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

var barColor = 'black'