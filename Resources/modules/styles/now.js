exports = {	

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
    width:Ti.UI.SIZE,
    top:30,       
    left:60,
    font:{fontSize:10},
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

  spinner: {
    width:50,
    height:50,      
    message: 'loading...',
    color: 'black',
    style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
  },

  noPerfs: {
    text:'No performances available',
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    top:10,
    left:60,
    font:{fontSize:14}
  }

};