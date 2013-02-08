styles = {	

  table: {
    top:110
  },

  row: {
    height:155
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
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    left:60,
    top:5,
    font:{fontSize:'15', fontWeight:'bold'},
    color: 'black',
  },

  date: {    
    height:Ti.UI.SIZE,
    left:60,
    top:25,
    font:{fontSize:'13'},
    color: 'black'
  },

  rating: {
    height:Ti.UI.SIZE,
    width:240,
    top:42,
    left:60,
    font:{fontSize:12},
    color:'black'    
  },

  blurb: {
    height:Ti.UI.SIZE,
    left:5,
    top:65,
    width:'90%',
    font:{fontSize:'13'},
    color: 'black',
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
    width:Titanium.UI.SIZE
  }

};

exports.table = styles.table;
exports.row = styles.row;
exports.imageLabel = styles.imageLabel;
exports.nameLabel = styles.nameLabel;
exports.date = styles.date;
exports.blurb = styles.blurb;
exports.spinner = styles.spinner;
exports.carrotImage = styles.carrotImage;
exports.rating = styles.rating;