styles = {	

  table: {
    backgroundColor:'#F4F1F1'
  },

  venueWrapper: {    
    top:50,
    left:0,
    height:Ti.UI.SIZE,
    width:'100%',
    layout:'vertical'
  },

  allGalleryView: {
    height:Ti.UI.SIZE,
    width:'100%',
    top:10,
    bottom:10,
    left:5,
    layout:'vertical'    
  },

  galleryView: {
    height:Ti.UI.SIZE,
    width:'100%'
  },

  img: {
    maxZoomScale:5,
    width:70,
    height:70,
    layout:'absolute',
    borderRadius:10,
    borderWidth:0
  },

  moreImagesLabel: {
    top:9,
    left:220,
    text:'more images',
    width:Ti.UI.SIZE,
    height:Ti.UI.SIZE,
    font:{fontSize:14},
    color:'black'
  },

  description: {
    top:12,
    bottom:10,
    left:5,
    font:{fontSize:12},
    height:Ti.UI.SIZE,
    width: '95%',
    color:'black'
  },

  addressView: {
    width:320,
    height:Ti.UI.SIZE,
    top:5
  },

  addressLabel: {
    text: "address",
    top:3,
    left:5,
    font:{fontSize:12, fontWeight:'bold'},
    height:Ti.UI.SIZE,
    width: '95%',
    color:'black'
  },

  address: {
    top:3,
    left:70,
    font:{fontSize:12},
    height:Ti.UI.SIZE,
    width: '75%',
    color:'black'
  },

  locationWrapper: {
    width:'100%',
    height:Ti.UI.SIZE,
    layout:'vertical'
  },

  projectsView: {
    width:320,
    height:60,
    top:5,
    bottom:10
  },

  projectThumb: {
    width:50,
    height:50,          
    left:5,
    top:8,
    borderWidth:1,
    borderColor:'black'
  },

  projectLabel: {
    font:{fontSize:14},
    left:65,
    top:5,
    height:Ti.UI.SIZE,
    width:'80%',
    color:'black'
  },

  titleLabel: {
    font:{fontSize:12},
    left:65,
    top:25,
    height:Ti.UI.SIZE,
    width:220,
    color:'black'
  },

  mapView: {
    mapType: Ti.Map.STANDARD_TYPE,
    animate:true,
    regionFit:true,
    userLocation:false,
    top:25,
    height:175
  },

  annotation: {
    animate:true,
    pincolor:Ti.Map.ANNOTATION_RED
  },

  carrotImage: {
    right:10,
    top:'40%',
    font:{fontSize:12, fontWeight:'bold'},
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE
  }

};

exports.table = styles.table;
exports.venueWrapper = styles.venueWrapper;
exports.allGalleryView = styles.allGalleryView;
exports.galleryView = styles.galleryView;
exports.img = styles.img;
exports.moreImagesLabel = styles.moreImagesLabel;
exports.description = styles.description;
exports.addressView = styles.addressView;
exports.addressLabel = styles.addressLabel;
exports.address = styles.address;
exports.locationWrapper = styles.locationWrapper;
exports.projectsView = styles.projectsView;
exports.projectThumb = styles.projectThumb;
exports.projectLabel = styles.projectLabel;
exports.titleLabel = styles.titleLabel;
exports.mapView = styles.mapView;
exports.annotation = styles.annotation;
exports.carrotImage = styles.carrotImage;