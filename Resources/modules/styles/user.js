exports = {

  userScroll: {
  	contentWidth:'95%',
    contentHeight:Ti.UI.SIZE,
    touchEnabled:true,
    scrollType:'vertical',
    verticalBounce:true,
    showVerticalScrollIndicator:true,
    height:'89%',
    top:50
	},

  wrapper: {
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    top:0
  },

  image: {    
    width:45,
    height:45,
    left:10,
    top:10,
    borderColor:'black',
    borderWidth:1
  },

  name: {
    height:Ti.UI.SIZE,
    width:300,
    left:70,
    top:20,
    font:{fontSize:'14', fontWeight:'bold'}
  },

  line1: {
    width:320,
    height:1,
    top:70,
    left:0,
    backgroundColor:'gray'
  },

  reviewsLabel: {    
    height:Ti.UI.SIZE,
    width:300,
    left:10,
    top:80,
    font:{fontSize:'14', fontWeight:'bold'}
  },

  line2: {
    width:320,
    height:1,
    top:110,
    left:0,
    backgroundColor:'gray'
  },

  profile: {
    height:Ti.UI.SIZE,
    width:300,
    left:10,
    top:120,
    font:{fontSize:'13'}
  }

}