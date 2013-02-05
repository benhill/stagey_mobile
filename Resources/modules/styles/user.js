styles = {

  userScroll: {
  	contentWidth:'95%',
    contentHeight:Ti.UI.SIZE,
    touchEnabled:true,
    scrollType:'vertical',
    verticalBounce:true,
    showVerticalScrollIndicator:true,
    height:Ti.UI.SIZE,
    top:220
	},

  nameView: {
    width:Ti.UI.SIZE,
    height:Ti.UI.SIZE,
    top:55
  },

  wrapper: {
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    top:0
  },

  image: {    
    width:45,
    height:45,
    left:10,
    top:0,
    borderColor:'black',
    borderWidth:1
  },

  name: {
    height:Ti.UI.SIZE,
    width:300,
    left:65,
    top:10,
    font:{fontSize:'15', fontWeight:'bold'},
    color:'black'
  },  
  
  profile: {
    height:Ti.UI.SIZE,
    width:300,
    left:10,
    top:10,
    bottom:10,
    font:{fontSize:'13'},
    color:'black'
  },

  table: {
    top:110,
    height:Ti.UI.SIZE,
    borderColor:'black',
    borderWidth:1
  },

  row: {
    height:50
  },

  iconLabel: {    
    height:Ti.UI.SIZE,
    width:300,
    left:10,
    top:14,
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

exports.userScroll = styles.userScroll;
exports.wrapper = styles.wrapper;
exports.image = styles.image;
exports.name = styles.name;
exports.profile = styles.profile;
exports.table = styles.table;
exports.row = styles.row;
exports.iconLabel = styles.iconLabel;
exports.carrotImage = styles.carrotImage;
exports.nameView = styles.nameView;