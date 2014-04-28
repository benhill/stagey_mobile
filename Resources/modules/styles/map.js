styles = {

  mapWrapper: {
    width:Ti.UI.SIZE,
    height:Ti.UI.SIZE
  },

  mapView: {
    animate:true,
    regionFit:true,
    userLocation:false,
    backgroundColor:'white',
    zIndex:10000
  },

  viewButton: {
    title:'view',
    height:32,
    width:64
  },

  annotation: {
    animate:true
  }

};

exports.mapWrapper = styles.mapWrapper;
exports.mapView = styles.mapView;
exports.viewButton = styles.viewButton;
exports.annotation = styles.annotation;