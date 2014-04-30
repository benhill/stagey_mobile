styles = {

  pageScroll: {
    contentWidth:Ti.UI.SIZE,
    contentHeight:Ti.UI.SIZE,
    touchEnabled:true,
    scrollType:'vertical',
    verticalBounce:true,
    showVerticalScrollIndicator:true,
    height:'75%',
    top:65,
    left:0
  },

  titleView: {
    width:'100%',
    height:Ti.UI.SIZE,
    backgroundColor:'black',
  },

  nameLabel: {
    height:45,
    left:10,
    top:5,
    bottom:5,
    font:{fontSize:15, fontWeight:'bold'},
    color:'white'
  },

  line: {
    width:Ti.UI.SIZE,
    height:1,
    top:1,
    left:0,
    backgroundColor:'black'
  },

  body: {
    height:Ti.UI.SIZE,
    width:290,
    left:10,
    top:0,
    font:{fontSize:'15'},
    color:'black'
  },

  bodyWrapper: {
    height:Ti.UI.SIZE,
    top:65,
    left:0,
    layout:'vertical'
  },

  wrapper: {
    height:Ti.UI.SIZE,
    top:0,
    left:0,
    layout:'vertical'
  },

  buttonsWrapper: {
    bottom:0,
    width:'100%',
    height:50,
    borderWidth:1,
    borderColor:'gray',
    layout:'horizontal'
  },

  view_project: {
    title: 'View Project',
    top:7,
    left:5,
    width:100,
    height:37
  }

}

exports.pageScroll = styles.pageScroll;
exports.titleView = styles.titleView;
exports.nameLabel = styles.nameLabel;
exports.projectLabel = styles.projectLabel;
exports.line = styles.line;
exports.body = styles.body;
exports.bodyWrapper = styles.bodyWrapper;
exports.wrapper = styles.wrapper;
exports.buttonsWrapper = styles.buttonsWrapper;
exports.view_project = styles.view_project;