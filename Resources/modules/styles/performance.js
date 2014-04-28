styles = {

  perfView: {
    layout:'vertical',
    width:'100%',
    height:Ti.UI.SIZE,
    top:65
  },

	perfLabel: {
    width:'100%',
    height:Ti.UI.SIZE,
    font:{fontSize:'16', fontWeight:'bold'},
    left:15,
    color:'black'
  },

  carrotImage: {
    right:10,
    top:'40%',
    font:{fontSize:12, fontWeight:'bold'},
    height:Titanium.UI.SIZE,
    width:Titanium.UI.SIZE,
    zIndex:-1000
  },

  table: {
    top:0,
    backgroundColor:'#F4F1F1'
  },

  row: {
    height:50
  }

}

exports.perfView = styles.perfView;
exports.perfLabel = styles.perfLabel;
exports.carrotImage = styles.carrotImage;
exports.table = styles.table;
exports.row  = styles.row;