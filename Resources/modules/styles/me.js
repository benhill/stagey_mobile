styles = {

  wrapper: {
    height:'100%',
    width:'100%',
    top:50
  },

  image: {
    width:45,
    height:45,
    left:10,
    top:10,
    borderColor:'black',
    borderWidth:1
  },

  nameLabel: {
    height:Ti.UI.SIZE,
    width:300,
    left:65,
    top:20,
    font:{fontSize:'18', fontWeight:'bold'},
    color:'black'
  },

  logoutButton: {
    title: 'Logout',
    bottom:60,
    left:10,
    width:300,
    height:50
  },

  table: {
    top:75,
    bottom:120
  },

  row: {
    height:50
  },

  iconLabel: {    
    height:Ti.UI.SIZE,
    width:300,
    left:10,
    top:15,
    font:{fontSize:'16', fontWeight:'bold'},
    color:'black'
  },

  carrotImage: {
    right:10,
    top:'40%',
    font:{fontSize:12, fontWeight:'bold'},
    height:Titanium.UI.SIZE,
    width:Titanium.UI.SIZE
  }

}

exports.wrapper = styles.wrapper;
exports.image = styles.image;
exports.nameLabel = styles.nameLabel;
exports.logoutButton = styles.logoutButton;
exports.table = styles.table;
exports.row = styles.row;
exports.iconLabel = styles.iconLabel;
exports.carrotImage = styles.carrotImage;