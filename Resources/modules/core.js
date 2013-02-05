if(Ti.Platform.name != 'iPhone OS'){var app = require('modules/core');}

var primitives   = require('modules/helpers/primitives'),
  properties   = {},    // Any app-wide properties
	plugins      = {},    // Any plugins added to the app
	currentPage  = null,  // Reference to the current page module
	models       = {};    // Holds the Joli models

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

exports.openWindow = function(title, newWindowName, params){

  Ti.API.info("loading " + newWindowName);
  Ti.API.info("Available memory: " + Ti.Platform.availableMemory);

  require_path = 'modules/pages/' + newWindowName;
  if(Ti.Platform.name != 'iPhone OS'){require_path = '../' + require_path};
  var windowObj = require(require_path);
  var newWindow = windowObj.apply(this, params);

  if(Ti.Platform.name != 'iPhone OS'){

    newWindow.activity.onCreateOptionsMenu = function(e){
      var menu = e.menu;
      var menuItem = menu.add({ title: "My Account" });
            
      menuItem.addEventListener("click", function(e) {
        app.openWindow('Me', 'me', []);
      });
    }

    newWindow.addEventListener("android:search", function(e) {
      app.openWindow('Search', 'search', []);
    });

    newWindow.addEventListener('android:back', function(e){
      if(newWindow._sourceUrl != "app://modules/pages/shows.js"){
        newWindow.close();
      }
    });

  };

  openWithWindow(title, newWindow);
};

var resdir_value = '';
if(Ti.Platform.name != 'iPhone OS'){resdir_value = '../../'};

exports.resdir = resdir_value;

exports.openFromWindow = function(newWindow){
  openWithWindow('', newWindow);
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

exports.addKeyboardToolbar = function(textbox){
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

exports.properties = function() { 
  return properties; 
};

exports.property = function(name) { 
  return properties[name]; 
};

exports.timeout = 15000;

exports.api_url = 'http://192.168.1.65/api/';
//exports.api_url = 'https://staging.hollywoodfringe.org/api/';

exports.site_url = 'http://staging.hollywoodfringe.org/';

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