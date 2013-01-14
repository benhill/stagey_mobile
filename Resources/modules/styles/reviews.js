styles = {	

  table: {
    top:100
  },

  row: {
    //height:100
  },

  imageLabel: {    
    width:45,
    height:45,
    left:5,
    top:10,
    borderColor:'black',
    borderWidth:1
  },  

  nameLabel: {    
    width:'100%',
    height:Ti.UI.SIZE,
    left:60,
    top:5,
    font:{fontSize:'13', fontWeight:'bold'}
  },

  date: {    
    height:Ti.UI.SIZE,
    left:60,
    top:24,
    font:{fontSize:'13'}
  },

  blurb: {
    height:Ti.UI.SIZE,
    left:60,
    top:39,
    width:220,
    font:{fontSize:'13'}
  },

  moreRow: {
    height:60
  },

  moreLabel: {
    text:"LOAD MORE",
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,            
    top:20,        
    left:100,
    font:{fontSize:14, fontWeight:'bold'}
  },

  spinner: {
    width:50,
    height:50,      
    message: 'loading...',
    color: 'black',
    style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
  },

  carrotImage: {
    right:10,
    top:'40%',
    font:{fontSize:12, fontWeight:'bold'},
    height:Titanium.UI.SIZE,
    width:Titanium.UI.SIZE,
    image:'iphone/more-arrow.png'
  }

};

exports.table = styles.table;
exports.row = styles.row;
exports.imageLabel = styles.imageLabel;
exports.nameLabel = styles.nameLabel;
exports.date = styles.date;
exports.blurb = styles.blurb;
exports.moreRow = styles.moreRow;
exports.moreLabel = styles.moreLabel;
exports.spinner = styles.spinner;
exports.carrotImage = styles.carrotImage;