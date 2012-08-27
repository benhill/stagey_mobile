var currentWin = Ti.UI.currentWindow;

var currentTab = Ti.UI.currentTab;

var barColor = '#A1A1A1';

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

function Icon(text, image, window, object, auth_required){
 this.text = text;
 this.image = image;
 this.window = window;
 this.object = object;
 this.auth_required = auth_required;
}

var spinner = Ti.UI.createActivityIndicator({
  width:50,
  height:50,  
  top:150,
  message: 'loading...',
  color: 'black',
  style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
})

var sharekit = require('com.0x82.sharekit');

function prompt_login(win){
  loginWin = Ti.UI.createWindow({
    url:'login.js',
    barColor:barColor,
    return_win:win
  });
  
  currentTab.open(loginWin);
}