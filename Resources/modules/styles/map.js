exports = {	

  mapWrapper: {
    width:Ti.UI.SIZE,
    height:Ti.UI.SIZE
  },

  mapView: {
    mapType:Ti.Map.STANDARD_TYPE,
    animate:true,
    regionFit:true,
    userLocation:false,
    backgroundColor:'white'
  },

  viewButton: {
    title:'view',
    height:32,
    width:64
  },

  annotation: {
    animate:true,
    pincolor:Ti.Map.ANNOTATION_RED
  }

};