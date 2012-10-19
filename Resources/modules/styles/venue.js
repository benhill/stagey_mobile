exports = {	

  venueScroll: {
    contentWidth:'95%',
    contentHeight:1100,
    top:50,
    left:0,
    height:800,
    showVerticalScrollIndicator:true,
    showHorizontalScrollIndicator:true,
    layout:'vertical'
  },

  titleView: {
    width:'100%',
    height:Ti.UI.SIZE,
    layout:'vertical',
    backgroundColor:'black',
    top:0    
  },

  name: {
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,            
    font:{fontSize:17, fontWeight:'bold'},
    left:10,
    top:11,
    color:'white'
  },

  presenter: {
    top:0,
    left:10,
    font:{fontSize:11},
    height:Ti.UI.SIZE,
    width: '95%',    
    color:'white'
  },

  spacerView: {
    height:10
  },

  galleryView: {
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    top:5,
    left:5   
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
    font:{fontSize:14}
  },

  description: {
    top:10,
    left:5,
    font:{fontSize:10},
    height:Ti.UI.SIZE,
    width: '95%'
  },

  line: {
    width:320,
    height:1,
    top:10,
    bottom:5,
    backgroundColor:'gray'
  },

  addressView: {
    width:320,
    height:45,
    top:5
  },

  addressLabel: {
    text: "address",
    top:3,
    left:5,
    font:{fontSize:12, fontWeight:'bold'},
    height:Ti.UI.SIZE,
    width: '95%'
  },

  address: {
    top:3,
    left:70,
    font:{fontSize:12},
    height:Ti.UI.SIZE,
    width: '95%'
  },

  distance: {
    top:30,
    left:70,
    font:{fontSize:12},
    height:Ti.UI.SIZE,
    width: '95%'
  },

  projectsView: {
    width:320,
    height:60,
    top:5
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
    width:'80%'
  },

  titleLabel: {
    font:{fontSize:10},
    left:65,
    top:23,
    height:Ti.UI.SIZE,
    width:220
  },

  mapView: {
    mapType: Ti.Map.STANDARD_TYPE,
    animate:true,
    regionFit:true,
    userLocation:false,
    top:15,
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
    width:Ti.UI.SIZE,
    image:'iphone/more-arrow.png'
  }

};