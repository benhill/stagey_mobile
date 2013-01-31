styles = {	

  table: {    
  },

  titleView: {
    width:'100%',
    height:50,
    backgroundColor:'black',    
    top:50
  },

  titleLabel: {
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    color:'white',
    font:{fontSize:20, fontWeight:'bold'},    
    top:15,
    textAlign:'center'
  },

  previousView: {
    left:0,
    top:0,
    height:'100%',
    width:80
  },
  
  previousLabel: {
    height:Titanium.UI.SIZE,
    width:Titanium.UI.SIZE,
    font:{fontSize:14},
    color:'white'
  },

  nextView: {
    right:0,
    top:0,
    height:'100%',
    width:80
  },

  spacer: {
    height:'100%',
    width:1,
    backgroundColor:'white'
  },

  nextLabel: {    
    height:Titanium.UI.SIZE,
    width:Titanium.UI.SIZE,
    font:{fontSize:14},
    color:'white'
  },

  projectThumb: {
    width:45,
    height:45,
    left:5,
    top:10,
    borderColor:'black',
    borderWidth:1,
  },

  projectTitle: {
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    top:10,
    left:60,
    font:{fontSize:14},
    color:'black'
  },

  projectInfo: {
    height:Ti.UI.SIZE,
    width:220,
    top:30,
    left:60,
    font:{fontSize:12},
    color:'black'
  },

  row: {
    height:65
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

  spinner: {
    width:50,
    height:50,      
    message: 'loading...',
    color: 'black',
    style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
  },

  noPerfs: {
    text:'No performances match your criteria...',
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    top:150,
    color:'black'
  },

  carrotImage: {
    right:10,
    top:'40%',
    font:{fontSize:12, fontWeight:'bold'},
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    zIndex:-1000
  }

};

exports.table = styles.table;
exports.titleView = styles.titleView;
exports.titleLabel = styles.titleLabel;
exports.previousView = styles.previousView;
exports.previousLabel = styles.previousLabel;
exports.nextView = styles.nextView;
exports.spacer = styles.spacer;
exports.nextLabel = styles.nextLabel;
exports.projectThumb = styles.projectThumb;
exports.projectTitle = styles.projectTitle;
exports.projectInfo = styles.projectInfo;
exports.row = styles.row;
exports.moreLabel = styles.moreLabel;
exports.spinner = styles.spinner;
exports.noPerfs = styles.noPerfs;
exports.carrotImage = styles.carrotImage;
exports.helperView = styles.helperView;
exports.helperLabel = styles.helperLabel;