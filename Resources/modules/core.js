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
  var windowObj = require('modules/pages/' + newWindowName);  
  var newWindow = windowObj.apply(this, params);
  openWithWindow(title, newWindow);
};

exports.openFromWindow = function(newWindow){
  openWithWindow('', newWindow);
};

function openWithWindow(title, newWindow){
  newWindow.navBarHidden = true;
  var headerObj = require('modules/common/header');
  newWindow.add(new headerObj(title, newWindow));
  Ti.API.activeTab.open(newWindow);
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

exports.api_url = 'http://www.gwahir.com:3000/api/';

exports.site_url = 'http://www.gwahir.com:3000/';

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