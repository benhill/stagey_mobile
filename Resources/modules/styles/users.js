styles = {

  table: {
    top:50
  },

  row: {
  	height:'60dp'
  },

  image: {
  	width:45,
    height:45,
    left:5,
    top:10,
    borderColor:'black',
    borderWidth:1
  },

  nameLabel: {    
    width:'100%',
    height:45,
    left:60,
    top:-7,
    font:{fontSize:'13', fontWeight:'bold'}
  },

  roleLabel: {
    width:'100%',
    height:45,
    left:60,
    top:10,
    font:{fontSize:'13'}
  },

  carrotImage: {
    right:10,
    top:'40%',
    font:{fontSize:12, fontWeight:'bold'},
    height:Titanium.UI.SIZE,
    width:Titanium.UI.SIZE,
    image:'iphone/more-arrow.png'
  }

}

exports.table = styles.table;
exports.row = styles.row;
exports.image = styles.image;
exports.nameLabel = styles.nameLabel;
exports.roleLabel = styles.roleLabel;
exports.carrotImage = styles.carrotImage;