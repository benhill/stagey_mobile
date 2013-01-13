var default_search_text = 'search for a show';

styles = {	

	searchView: {
		top:52,
    left:1,
    height:50,
    layout:'absolute'
	},

	username: {
		height: 70,
		width: '95%',
		top: 15,
		hintText: 'Username',
		backgroundColor: '#fff',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_LINE
	},

	searchField: {
    value:default_search_text,
    height:30,
    clearOnEdit:true,
    top:0,
    left:0,
    width:'90%',
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    color:'gray'		
  },

  searchButton: {
    width:'7%',
    height:Ti.UI.SIZE,
    top:5,
    right:5
  },

  iconsView: {
    top:85,
    left:0,
    height:260,
    layout:'absolute'
  },

  iconView: {
    width:120,
    height:100,
    layout:'vertical',
    borderRadius:10,
    backgroundColor:'black'
  },

  iconImage: {
    height:40,
    width:40,
    top:10,
    left:40
  },

  iconText: {
    height:Ti.UI.SIZE,
    width:100,
    font:{fontSize:12, fontWeight:'bold'},
    left:10,
    top:5,
    textAlign:'center',
    color:'white'
  },

  alertView: {
    bottom:0,
    height:50,
    width:'100%',
    backgroundColor:'#bbbbbb'
  },

  alertLabel: {
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    font:{fontSize:15, fontWeight:'bold'},
    color:'white'
  }

};

exports.searchView = styles.searchView;
exports.username = styles.username;
exports.searchField = styles.searchField;
exports.searchButton = styles.searchButton;
exports.iconsView = styles.iconsView;
exports.iconView = styles.iconView;
exports.iconImage = styles.iconImage;
exports.iconText = styles.iconText;
exports.alertView = styles.alertView;
exports.alertLabel = styles.alertLabel;