var default_search_text = 'search for a show';

styles = {

  container: {
    width:'100%',
    height:'100%',
    backgroundImage:'/images/bg.png'
  },

	searchView: {
		top:60,
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
    height:40,
    clearOnEdit:true,
    top:0,
    left:26,
    width:'74%',
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    color:'gray'
  },

  searchButton: {
    width:'7%',
    height:Ti.UI.SIZE,
    top:5,
    right:27
  },

  iconsView: {
    left:0,
    layout:'absolute'
  },

  iconView: {
    width:120,
    height:100,
    layout:'vertical',
    borderRadius:10,
    backgroundColor:'black',
    borderColor:'white',
    borderWidth:1
  },

  iconImage: {
    height:60,
    width:60,
    top:10,
    left:25
  },

  iconText: {
    height:Ti.UI.SIZE,
    width:100,
    font:{fontSize:12, fontWeight:'bold'},
    left:10,
    top:3,
    textAlign:'center',
    color:'white'
  },

  alertView: {
    bottom:0,
    height:40,
    width:'100%',
    backgroundColor:'black',
    borderColor:'white',
    borderWidth:2
  },

  alertLabel: {
    left:30,
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    font:{fontSize:15, fontWeight:'bold'},
    color:'white'
  },

  carrotImage: {
    right:10,
    top:'30%',
    font:{fontSize:12, fontWeight:'bold'},
    height:Titanium.UI.SIZE,
    width:Titanium.UI.SIZE
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
exports.container = styles.container;
exports.carrotImage = styles.carrotImage;