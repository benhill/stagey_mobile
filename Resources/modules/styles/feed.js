styles = {

  table: {
    top:50
  },

  row: {
    height:150,
    bottom:10,
    className: 'row',
    objName: 'row',
    touchEnabled: true
  },

  imageView: {    
    width: 320, 
    height:150
  },

  baseImage: {    
    width:512, 
    height:512,
    left:-100,
    top:-150
  },

  cropView: {
    width:320, 
    height:125
  },

  moreRow: {
    height:50
  },

  labelView: {
    bottom:3,
    width:'100%',
    backgroundColor:'#777777',
    backgroundRepeat:true,
    opacity:.85,
    height:100
  },

  objectLabel: {
    font:{fontSize:15,fontWeight:'bold'},
    height:Ti.UI.SIZE,
    left:10,
    top:1,
    color:'white',
    touchEnabled:false
  },

  textLabel: {
    font:{fontSize:13},
    height:Ti.UI.SIZE,
    width:'90%',
    left:10,
    top:20,
    color:'white',
    touchEnabled:false
  },

  carrotImage: {
    right:10,
    top:'40%',
    font:{fontSize:12, fontWeight:'bold'},
    height:Titanium.UI.SIZE,
    width:Titanium.UI.SIZE,    
    zIndex:1000
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

  line: {
    width:320,
    height:3,
    bottom:0,
    backgroundColor:'black'
  }  
}

exports.table = styles.table;
exports.row - styles.row;
exports.imageView = styles.imageView;
exports.baseImage = styles.baseImage;
exports.cropView = styles.cropView;
exports.moreRow = styles.moreRow;
exports.labelView = styles.labelView;
exports.objectLabel = styles.objectLabel;
exports.textLabel = styles.textLabel;
exports.carrotImage = styles.carrotImage;
exports.moreLabel = styles.moreLabel;
exports.spinner = styles.spinner;
exports.line = styles.line;