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

exports.register = function(name, object) {
	plugins[name] = object;
};

exports.properties = function() { 
	return properties; 
};

exports.property = function(name) { 
	return properties[name]; 
};

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