styles = {

  headerView: {
    top:0,
    height:65,
    width:'100%',
    backgroundColor:'black',
    borderColor:'white',
    borderWidth:1
  },

  menuButtonView: {
    width:75,
    height:30,
    right:0,
    top:21,
    zIndex:50,
    backgroundImage:'/images/menu.png'
  },

  backButton: {
    text:" \u21E6 back ",
    font:{fontSize:14},
    color:'white',
    width:60,
    height:30,
    top:25,
    left:5,
    borderWidth:.5,
    borderColor:'gray',
    borderRadius:5
  },

  logoImage: {
    top:20,
    left:5,
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE
  },

  navView: {
    width:200,
    height:'100%',
    backgroundColor:'white',
    right:-200,
    zIndex:50,
    top:50,
    borderColor:'gray',
    borderWidth:2
  },

  table: {
    top:0
  },

  row: {
    height:60,
    className: 'row',
    objName: 'row',
    touchEnabled: true
  },

  wrapper: {
    height:'100%',
    width:'100%',
    top:0
  },

  logoutButton: {
    title: 'Logout',
    bottom:60,
    right:5,
    width:185,
    height:40
  },

  loginButton: {
    title: 'Login',
    bottom:60,
    right:5,
    width:185,
    height:40
  },

  table: {
    top:0,
    bottom:120,
    width:'100%'
  },

  row: {
    height:40,
    width:'100%'
  },

  iconLabel: {
    height:Ti.UI.SIZE,
    width:300,
    left:44,
    top:11,
    font:{fontSize:'14', fontWeight:'bold'},
    color:'black'
  },

  iconImage: {
    width:20,
    height:20,
    left:10
  },

  carrotImage: {
    right:10,
    top:'40%',
    font:{fontSize:12, fontWeight:'bold'},
    height:Titanium.UI.SIZE,
    width:Titanium.UI.SIZE
  }

}

exports.headerView = styles.headerView;
exports.backButton = styles.backButton;
exports.logoImage = styles.logoImage;
exports.navView = styles.navView;
exports.table = styles.table;
exports.row = styles.row;
exports.wrapper = styles.wrapper;
exports.logoutButton = styles.logoutButton;
exports.loginButton = styles.loginButton;
exports.table = styles.table;
exports.row = styles.row;
exports.iconLabel = styles.iconLabel;
exports.menuButtonView = styles.menuButtonView;
exports.carrotImage = styles.carrotImage;
exports.iconImage = styles.iconImage;