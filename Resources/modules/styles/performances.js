exports = {	

  table: {    
  },

  titleView: {
    width:'100%',
    height:50,
    backgroundColor:'black',    
    top:50    
  },

  titleLabel: {
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    color:'white',
    font:{fontSize:20, fontWeight:'bold'},
    left:85,
    top:15
  },

  previousView: {
    left:0,
    top:0,
    height:'100%',
    width:40
  },
  
  previousImage: {    
    left:15,
    top:20,
    height:Titanium.UI.SIZE,
    width:Titanium.UI.SIZE,
    image:'iphone/less-arrow-white.png'
  },

  nextView: {
    right:0,
    top:0,
    height:'100%',
    width:40
  },

  spacer: {
    height:'100%',
    width:1,
    backgroundColor:'white'
  },

  nextImage: {    
    right:15,
    top:20,
    height:Titanium.UI.SIZE,
    width:Titanium.UI.SIZE,
    image:'iphone/more-arrow-white.png'          
  },

  projectThumb: {
    width:45,
    height:45,
    left:5,
    top:10,
    borderColor:'black',
    borderWidth:1,
  },

  projectTitle: {
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    top:10,
    left:60,
    font:{fontSize:14},
  },

  projectInfo: {
    height:Ti.UI.SIZE,
    width:220,
    top:30,
    left:60,
    font:{fontSize:12},
  },

  row: {
    height:65
  },

  moreLabel: {
    text:"LOAD MORE",
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,            
    top:20,        
    left:100,
    font:{fontSize:14, fontWeight:'bold'}
  },

  spinner: {
    width:50,
    height:50,      
    message: 'loading...',
    color: 'black',
    style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
  },

  noPerfs: {
    text:'No performances match your criteria...',
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    top:150
  },

  carrotImage: {
    right:10,
    top:'40%',
    font:{fontSize:12, fontWeight:'bold'},
    height:Titanium.UI.SIZE,
    width:Titanium.UI.SIZE,
    image:'iphone/more-arrow.png',
    zIndex:-1000
  }

};