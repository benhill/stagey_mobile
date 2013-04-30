if(Ti.Platform.name != 'iPhone OS'){var app = require('modules/core');}

var primitives   = require('modules/helpers/primitives'),
  properties   = {},    // Any app-wide properties
	plugins      = {},    // Any plugins added to the app
	currentPage  = null  // Reference to the current page module

exports.addProperty = function(name, value) {
	properties[name] = value;
};

exports.loadPage = function(name, params) {
	currentPage = require(properties.pages + '/' + name);
	currentPage.load(exports, params);
};

exports.formatCurrency = function(num) {
  num = isNaN(num) || num === '' || num === null ? 0.00 : num;
  return parseFloat(num).toFixed(2);
}

exports.register = function(name, object) {
  plugins[name] = object;
};

exports.throwError = function(me, e) {
  Ti.API.debug("STATUS: " + me.status);
  Ti.API.debug("TEXT:   " + me.responseText);
  Ti.API.debug("ERROR:  " + e.error);
  alert('There was an error retrieving the remote data. Try again.');
};

exports.openWindow = function(currentWindow, title, newWindowName, params){

  if(currentWindow != null && Ti.Platform.name != 'iPhone OS'){
    Ti.App.prevWindow = currentWindow;
    currentWindow.close();
  }

  require_path = 'modules/pages/' + newWindowName;
  if(Ti.Platform.name != 'iPhone OS'){require_path = '../' + require_path};
  var windowObj = require(require_path);
  var newWindow = windowObj.apply(this, params);

  if(Ti.Platform.name != 'iPhone OS'){

    newWindow.activity.onCreateOptionsMenu = function(e){
      var menu = e.menu;
      var menuItem = menu.add({ title: "My Account" });

      menuItem.addEventListener("click", function(e) {
        app.openWindow(newWindow, 'Me', 'me', []);
      });
    }

    newWindow.addEventListener("android:search", function(e) {
      app.openWindow(newWindow, 'Search', 'search', []);
    });

    newWindow.addEventListener('android:back', function(e){
      if(newWindow._sourceUrl != "app://modules/pages/shows.js"){
        newWindow.close();
        if(currentWindow){currentWindow.open();}
      }
    });

  };

  openWithWindow(title, newWindow);
};

function openWithWindow(title, newWindow){
  newWindow.navBarHidden = true;
  require_path = 'modules/common/header';
  if(Ti.Platform.name != 'iPhone OS'){require_path = '../' + require_path};
  var headerObj = require(require_path);
  newWindow.add(new headerObj(title, newWindow));

  newWindow.open();
  newWindow.load();
}

var resdir_value = '';
if(Ti.Platform.name != 'iPhone OS'){resdir_value = '../../'};

exports.resdir = resdir_value;

exports.openFromWindow = function(newWindow){
  openWithWindow('', newWindow);
};

exports.addKeyboardToolbar = function(textbox, doneCallback){

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
    if(doneCallback){doneCallback();};
  });
};

exports.properties = function() {
  return properties;
};

exports.property = function(name) {
  return properties[name];
};

exports.timeout = 20000;

exports.orientationObserverUpdate = function(_event) {
	// Example of how you can control the current page with global events
	var type = (_event.source.isLandscape()) ? 'landscape' : 'portrait' ;

	if(currentPage && currentPage.orientationUpdate) {
		currentPage.orientationUpdate(type);
	}
};

exports.toTitleCase = function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

exports.getOrientation = function(o) {
	switch (o) {
		case Titanium.UI.PORTRAIT: {
			return 'portrait';
		}
		case Titanium.UI.UPSIDE_PORTRAIT: {
			return 'upside portrait';
		}
		case Titanium.UI.LANDSCAPE_LEFT: {
			return 'landscape left';
		}
		case Titanium.UI.LANDSCAPE_RIGHT: {
			return 'landscape right';
		}
		case Titanium.UI.FACE_UP: {
			return 'face up';
		}
		case Titanium.UI.FACE_DOWN: {
			return 'face down';
		}
		case Titanium.UI.UNKNOWN: {
			return 'unknown';
		}
	}
};

exports.dynamic_scoller = function(e, beginUpdateCallback, updating, lastDistance, page){
  if(Ti.Platform.name == 'iPhone OS'){
    var offset = e.contentOffset.y;
    var height = e.size.height;
    var total = offset + height;
    var theEnd = e.contentSize.height;
    var distance = theEnd - total;

    if (distance < lastDistance){
      var nearEnd = theEnd * .65;
      if (!updating && (total >= nearEnd)){
        beginUpdateCallback();
      }
    }
    lastDistance = distance;
  }
  else{
    if (!updating && e.totalItemCount % page === 0) {
      var distance = e.totalItemCount - e.firstVisibleItem;
      if (distance <= e.visibleItemCount) {
        if (!updating) {
          //extract
          updating = true;
          beginUpdateCallback();
        }
      }
    }
  }
}