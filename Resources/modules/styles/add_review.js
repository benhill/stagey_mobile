styles = {

  buttonSave: {
    title:'save',    
    bottom:10,    
    width:300
  },

  labelBody: {
    top:100,
    left:5,
    text:'YOUR REVIEW:',
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
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    font:{fontColor:'black'}
  },

  tabBar: {
    width:Ti.Platform.displayCaps.platformWidth,
    height:40,
    left:0,
    top:50,
    backgroundColor:'#000',
    layout:'horizontal'
  },

  tab1: {
    width:85,
    height:36,
    left:7,
    top:0,
    backgroundColor:'black',
    borderRadius:2,
    value:1
  },

  tab1Label: {
    text:'Liked It',
    color:'gray',
    width:Ti.UI.SIZE,
    height:Ti.UI.SIZE
  },

  tab2: {
    width:85,
    height:36,
    left:7,
    top:0,
    backgroundColor:'black',
    value:2
  },

  tab2Label: {
    text:'Loved It',
    color:'gray',
    width:Ti.UI.SIZE,
    height:Ti.UI.SIZE
  },

  tab3: {
    width:120,
    height:36,
    left:7,
    top:0,
    backgroundColor:'black',
    value:0
  },

  tab3Label: {
    text:'Not My Thing',
    color:'gray',
    width:Ti.UI.SIZE,
    height:Ti.UI.SIZE
  },

  spacer: {
    width:1,
    height:40,
    backgroundColor:'white'
  }

}

exports.buttonSave = styles.buttonSave;
exports.labelBody = styles.labelBody;
exports.textBody = styles.textBody;
exports.tabBar = styles.tabBar;
exports.tab1 = styles.tab1;
exports.tab1Label = styles.tab1Label;
exports.tab2 = styles.tab2;
exports.tab2Label = styles.tab2Label;
exports.tab3 = styles.tab3;
exports.tab3Label = styles.tab3Label;
exports.spacer = styles.spacer;