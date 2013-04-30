var default_search_text = 'search for a show';

styles = {

  container: {
    width:'100%',
    height:'100%',
    backgroundImage:'/images/bg.png'
  },

	username: {
		height: 70,
		width: '95%',
		top: 15,
		hintText: 'Username',
		backgroundColor: '#fff',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_LINE
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
    height:50,
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
    top:'35%',
    font:{fontSize:12, fontWeight:'bold'},
    height:Titanium.UI.SIZE,
    width:Titanium.UI.SIZE
  }

};

exports.username = styles.username;
exports.iconsView = styles.iconsView;
exports.iconView = styles.iconView;
exports.iconImage = styles.iconImage;
exports.iconText = styles.iconText;
exports.alertView = styles.alertView;
exports.alertLabel = styles.alertLabel;
exports.container = styles.container;
exports.carrotImage = styles.carrotImage;