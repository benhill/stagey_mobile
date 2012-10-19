exports = {

  table: {
    top:50
  },

  row: {
    height:125
  },

  imageView: {    
    width: 320, 
    height:125
  },

  baseImage: {    
    width:512, 
    height:512,
    left:-100,
    top:-125
  },

  cropView: {
    width:320, 
    height:125
  },

  moreRow: {
    height:50
  },

  labelView: {
    bottom:0,
    width:'100%',
    backgroundColor:'#bbbbbb',
    backgroundRepeat:true,
    opacity:.7,
    height:40,
    borderWidth:1
  },

  objectLabel: {
    font:{fontSize:14,fontWeight:'bold'},
    height:Ti.UI.SIZE,
    left:10,
    top:5,
    color:'#000',
    touchEnabled:false
  },

  textLabel: {
    font:{fontSize:12},
    height:Ti.UI.SIZE,
    left:10,
    top:20,
    color:'#000',
    touchEnabled:false
  },

  carrotImage: {
    right:10,
    top:'40%',
    font:{fontSize:12, fontWeight:'bold'},
    height:Titanium.UI.SIZE,
    width:Titanium.UI.SIZE,
    image:'iphone/more-arrow.png'
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
  }

}