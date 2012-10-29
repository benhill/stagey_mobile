exports = {	

  projectScroll: {
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

  title: {
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    color:'white',
    font:{fontSize:17, fontWeight:'bold'},
    left:10,
    top:10
  },

  subTitle: {
    height:Ti.UI.SIZE,
    width:'95%',
    color:'white',
    left:10,
    font:{fontSize:11},
    bottom:10
  },

  galleryView: {
    height:Ti.UI.SIZE,
    width:'100%',
    top:10,
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

  descriptionLabel: {
    top:15,
    bottom:7,
    left:5,
    font:{fontSize:12},
    height:Ti.UI.SIZE,
    width: '95%'
  },

  line: {
    width:320,
    height:1,
    top:5,
    backgroundColor:'gray'
  },

  iconsView: {
    top:5,
    left:5,
    height:60,
    layout:'absolute'
  },

  iconView: {
    width:100,
    height:50,
    layout:'vertical'
  },

  iconImage: {
    height:24,
    width:24,
    top:0
  },

  iconText: {
    height:Ti.UI.SIZE,
    width:100,
    font:{fontSize:13},
    left:0,
    top:5,
    textAlign:'center'
  },

  reviewView: {
    width:320,
    height:75,
    top:5
  },

  reviewUserThumb: {
    width:50,
    height:50,    
    left:5,
    top:8,
    borderWidth:1,
    borderColor:'black'
  },

  reviewsLabel: {
    text:"View All Reviews",
    font:{fontSize:14},
    left:65,
    top:5,
    height:Ti.UI.SIZE,
    width:'90%'
  },

  reviewsLabelName: {
    font:{fontSize:10},
    left:65,
    top:23,
    height:Ti.UI.SIZE,
    width:230
  },

  carrotImage: {
    right:10,
    top:'40%',
    font:{fontSize:12, fontWeight:'bold'},
    height:Titanium.UI.SIZE,
    width:Titanium.UI.SIZE,
    image:'iphone/more-arrow.png'
  },

  teamThumb: {
    width:50,
    height:50,
    left:5,
    top:8,
    borderWidth:1,
    borderColor:'black'
  },

  teamView: {
    width:320,
    height:60,
    top:5
  },

  teamLabel: {
    text:"View Project Team",
    font:{fontSize:14},
    left:65,
    top:5,
    height:Ti.UI.SIZE,
    width:'90%'
  },

  teamLabelName: {
    font:{fontSize:10},
    left:65,
    top:23,
    height:Ti.UI.SIZE,
    width:250
  },

  tagsLabel: {
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    top:10,
    left:5,
    font:{fontSize:10}
  }

};