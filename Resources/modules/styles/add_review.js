exports = {

  buttonSave: {
    title:'save',    
    top:60,
    right:5,
    height:25,
    width:60
  },

  tabRating: {
    labels:['Loved It', 'Liked It', 'Not My Thing'], 
    backgroundColor:'#336699', 
    top:60, 
    left:5,
    style:Titanium.UI.iPhone.SystemButtonStyle.BAR, 
    height:25, 
    width:245 
  },

  labelBody: {
    top:100,
    left:5,
    text:'Your Review:',
    width:Ti.UI.SIZE,
    height:Ti.UI.SIZE,
    font:{fontSize:14, fontWeight:'bold'}
  },

  textBody: {
    color:'#336699',
    height:250,
    width:305,
    top:120,
    left:5,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
  }

}