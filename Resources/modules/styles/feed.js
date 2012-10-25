exports = {

  table: {
    top:50
  },

  row: {
    height:150,
    bottom:10
  },

  imageView: {    
    width: 320, 
    height:150
  },

  baseImage: {    
    width:512, 
    height:512,
    left:-100,
    top:-150
  },

  cropView: {
    width:320, 
    height:125
  },

  moreRow: {
    height:50
  },

  labelView: {
    bottom:3,
    width:'100%',
    backgroundColor:'#777777',
    backgroundRepeat:true,
    opacity:.85,
    height:70
  },

  objectLabel: {
    font:{fontSize:15,fontWeight:'bold'},
    height:Ti.UI.SIZE,
    left:10,
    top:1,
    color:'white',
    touchEnabled:false
  },

  textLabel: {
    font:{fontSize:13},
    height:Ti.UI.SIZE,
    width:'90%',
    left:10,
    top:18,
    color:'white',
    touchEnabled:false
  },

  carrotImage: {
    right:10,
    top:'40%',
    font:{fontSize:12, fontWeight:'bold'},
    height:Titanium.UI.SIZE,
    width:Titanium.UI.SIZE,
    image:'iphone/more-arrow-white.png',
    zIndex:1000
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

  line: {
    width:320,
    height:3,
    bottom:0,
    backgroundColor:'black'
  }  
}