exports = {	

  row: {
    height:'70dp'
  },

  imageLabel: {    
    width:45,
    height:45,
    left:5,
    top:10,
    borderColor:'black',
    borderWidth:1
  },

  nameLabel: {    
    width:'100%',
    height:45,
    left:60,
    top:-7,
    font:{fontSize:'13', fontWeight:'bold'}
  },

  date: {    
    height:45,
    left:225,
    top:-7,
    font:{fontSize:'10'}
  },

  blurb: {
    height:45,
    left:60,
    top:17,
    width:250,
    font:{fontSize:'11'}
  },

  moreRow: {
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
  }

};