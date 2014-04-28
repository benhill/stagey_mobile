styles = {

  table: {
    top:65
  },

  projectThumb: {
    width:45,
    height:45,
    left:5,
    top:10,
    borderColor:'black',
    borderWidth:1
  },

  nameLabel: {
    font:{fontSize:16,fontWeight:'bold'},
    height:Ti.UI.SIZE,
    left:55,
    top:7,
    color:'#000',
    touchEnabled:false
  },

  infoLabel: {
    font:{fontSize:13},
    height:Ti.UI.SIZE,
    width:'75%',
    left:55,
    top:25,
    color:'#000',
    touchEnabled:false
  },

  row: {
    height:60,
    className: 'row',
    objName: 'row',
    touchEnabled: true
  },

  moreLabel: {
    text:"LOAD MORE",
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    top:20,
    left:100,
    font:{fontSize:14, fontWeight:'bold'},
    color:'black'
  },

  projectWindow: {
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
  },

  noResultsLabel: {
    top:150,
    width:Ti.UI.SIZE,
    height:Ti.UI.SIZE,
    text:'No projects match your query...'
  }

};

exports.table = styles.table;
exports.projectThumb = styles.projectThumb;
exports.nameLabel = styles.nameLabel;
exports.infoLabel = styles.infoLabel;
exports.row = styles.row;
exports.moreLabel = styles.moreLabel;
exports.projectWindow = styles.projectWindow;
exports.spinner = styles.spinner;
exports.carrotImage = styles.carrotImage;
exports.noResultsLabel = styles.noResultsLabel;