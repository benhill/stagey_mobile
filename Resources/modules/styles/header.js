styles = {

  headerView: {
    top:0,
    height:50,
    width:'100%',
    backgroundColor:'black',
    borderColor:'white',
    borderWidth:1
  },

  searchButton: {
    image:'http://stagey-mobile.s3.amazonaws.com/search_24.png',
    width:24,
    height:24,
    right:15,
    top:15
  },

  homeButton: {
    image:'https://stagey-mobile.s3.amazonaws.com/home_24.png',
    width:24,
    height:24,
    right:95,
    top:15
  },

  userButton: {
    image:'http://stagey-mobile.s3.amazonaws.com/user_24.png',
    width:24,
    height:24,
    right:55,
    top:14
  },

  backButton: {
    text:" \u21E6 back ",
    font:{fontSize:14},
    color:'white',
    width:60,
    height:30,
    top:10,
    left:5,
    borderWidth:.5,
    borderColor:'gray',
    borderRadius:5
  },

  logoImage: {
    top:10,
    left:5,
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE
  }

}

exports.headerView = styles.headerView;
exports.searchButton = styles.searchButton;
exports.backButton = styles.backButton;
exports.logoImage = styles.logoImage;
exports.userButton = styles.userButton;
exports.homeButton = styles.homeButton;