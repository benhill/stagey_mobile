styles = {

  projectScroll: {
    contentWidth:Ti.UI.SIZE,
    contentHeight:Ti.UI.SIZE,
    touchEnabled:true,
    scrollType:'vertical',
    verticalBounce:true,
    showVerticalScrollIndicator:true,
    width:Ti.UI.SIZE,
    height:350,
    top:50
  },

  wrapper: {
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    top:0,
    layout:'vertical'  
  },

  titleLabel: {
    height:Ti.UI.SIZE,
    width:'300',
    left:8,
    top:8,    
    font:{fontSize:'16', fontWeight:'bold'}
  },

  line: {
    width:320,
    height:1,
    top:5,
    backgroundColor:'gray'
  },

  descriptionLabel: {    
    height:Ti.UI.SIZE,
    width:'300',
    left:8,
    top:8,
    font:{fontSize:'12'}
  }

}

exports.projectScroll = styles.projectScroll;
exports.wrapper = styles.wrapper;
exports.titleLabel = styles.titleLabel;
exports.line = styles.line;
exports.descriptionLabel = styles.descriptionLabel;