exports = {	

  projectThumb: {
    width:45,
    height:45,
    left:5,
    top:10,
    borderColor:'black',
    borderWidth:1
  },

  nameLabel: {
    font:{fontSize:16,fontWeight:'bold'},
    height:'auto',
    left:55,
    top:7,
    color:'#000',
    touchEnabled:false
  },

  infoLabel: {
    font:{fontSize:12},
    height:'auto',
    left:55,
    top:25,
    color:'#000',
    touchEnabled:false
  },

  row: {
    height:60
  },

  moreLabel: {
    text:"LOAD MORE",
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,            
    top:20,        
    left:100,
    font:{fontSize:14, fontWeight:'bold'}
  },

  projectWindow: {    
  },

  spinner: {
    width:50,
    height:50,      
    message: 'loading...',
    color: 'black',
    style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
  }

};