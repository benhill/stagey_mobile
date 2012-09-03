exports = {	

  reviewScroll: {
    contentWidth:Ti.UI.SIZE,
    contentHeight:Ti.UI.SIZE,
    touchEnabled:true,
    scrollType:'vertical',
    verticalBounce:true,
    showVerticalScrollIndicator:true,
    height:350,
    top:0,
    left:0
  },

  reviewerWrapper: {
    height:Ti.UI.SIZE,
    top:0,
    left:0
  },

  image: {
    width:55,
    height:55,
    left:10,
    top:10,
    borderColor:'black',
    borderWidth:1
  },

  nameLabel: {
    height:45,
    left:75,
    top:-7,
    font:{fontSize:13, fontWeight:'bold'}
  },

  projectLabel: {
    height:45,  
    top:11,
    font:{fontSize:10, fontWeight:'bold'},
    right:0,
    left:75
  },

  info: {
    height:47,
    top:26,
    font:{fontSize:10, fontWeight:'bold'},
    right:0,
    left:75
  },

  line: {
    width:Ti.UI.SIZE,
    height:1,
    top:72,
    left:0,
    backgroundColor:'gray'
  },

  body: {
    height:Ti.UI.SIZE,
    width:290,
    left:10,
    top:77,
    font:{fontSize:'12'}
  },

  wrapper: {
    height:Ti.UI.SIZE,
    top:0,
    left:0
  }

}