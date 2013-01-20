styles = {

	pwycLabel: {
    top:120,
    left:10,    
    width:Ti.UI.SIZE,
    height:Ti.UI.SIZE,
    font:{fontSize:16},
    text:"This performance is Pay What You Can.  Set your price.",
    color:'black'
  },

  dollarLabel: {
    top:170,
    left:10,
    width:20,
    width:Ti.UI.SIZE,
    height:Ti.UI.SIZE,
    font:{fontSize:18, fontWeight:'bold'},
    text:"$"
  },

  pwycText: {
    color:'#336699', 
    height:45, 
    width:80,
    top:165,
    left:25,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    color:'black'
  },

  quantButton: {
    title:'Next',
    bottom:5,
    width:300,
    height:50
  }

}

exports.pwycLabel = styles.pwycLabel;
exports.dollarLabel = styles.dollarLabel;
exports.pwycText = styles.pwycText;
exports.quantButton = styles.quantButton;