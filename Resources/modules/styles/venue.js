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
    backgroundColor:'#bbbbbb',
    top:0
  },

  name: {
    height:Titanium.UI.SIZE,
    width:Titanium.UI.SIZE,            
    font:{fontSize:20, fontWeight:'bold'},
    left:5,
    top:10
  },

  presenter: {
    top:0,
    left:5,
    font:{fontSize:10},
    height:Titanium.UI.SIZE,
    width: '95%',
    bottom:10
  },

  galleryView: {
    height:Titanium.UI.SIZE,
    width:Titanium.UI.SIZE,
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
    width:Titanium.UI.SIZE,
    height:Titanium.UI.SIZE,
    font:{fontSize:14}
  },

  description: {
    top:10,
    left:5,
    font:{fontSize:10},
    height:Titanium.UI.SIZE,
    width: '95%'
  },

  line: {
    width:320,
    height:1,
    top:10,
    bottom:5,
    backgroundColor:'gray'
  },

  mapView: {
    width:320,
    height:45,
    top:5
  },

  mapLabel: {
    text: "map",
    top:3,
    left:5,
    font:{fontSize:13},
    height:Titanium.UI.SIZE,
    width: '95%'
  },

  address: {
    top:3,
    left:70,
    font:{fontSize:10},
    height:Titanium.UI.SIZE,
    width: '95%'
  },

  distance: {
    top:30,
    left:70,
    font:{fontSize:10},
    height:Titanium.UI.SIZE,
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
    height:Titanium.UI.SIZE,
    width:'90%'
  },

  titleLabel: {
    font:{fontSize:10},
    left:65,
    top:23,
    height:Titanium.UI.SIZE,
    width:250
  }

};