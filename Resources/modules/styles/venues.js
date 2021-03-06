styles = {

  buttonBarView: {
    top:65
  },

  contentView: {
    height:Ti.UI.SIZE,
    width: Ti.UI.SIZE,
    top:105
  },

  table: {
    top:0
  },

  venueThumb: {
    width:45,
    height:45,
    left:5,
    top:10,
    borderColor:'black',
    borderWidth:1
  },

  nameLabel: {
    font:{fontSize:16,fontWeight:'bold'},
    height:Titanium.UI.SIZE,
    left:55,
    top:10,
    color:'#000',
    touchEnabled:false
  },

  addressLabel: {
    font:{fontSize:12},
    width:'80%',
    height:Titanium.UI.SIZE,
    left:55,
    top:30,
    color:'#000',
    touchEnabled:false
  },

  venueWindow: {
    layout:'vertical',
    title: "Venue"
  },

  row: {
    height:60,
    className: 'row',
    objName: 'row',
    touchEnabled: true
  },

  carrotImage: {
    right:10,
    top:'40%',
    font:{fontSize:12, fontWeight:'bold'},
    height:Titanium.UI.SIZE,
    width:Titanium.UI.SIZE
  }

};

exports.buttonBarView = styles.buttonBarView;
exports.contentView = styles.contentView;
exports.table = styles.table;
exports.venueThumb = styles.venueThumb;
exports.nameLabel = styles.nameLabel;
exports.addressLabel = styles.addressLabel;
exports.venueWindow = styles.venueWindow;
exports.row = styles.row;
exports.carrotImage = styles.carrotImage;