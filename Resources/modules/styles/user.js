exports = {

  userScroll: {
  	contentWidth:Ti.UI.SIZE,
    contentHeight:Ti.UI.SIZE,
    touchEnabled:true,
    scrollType:'vertical',
    verticalBounce:true,
    showVerticalScrollIndicator:true,
    height:350,
    top:0
	},

  wrapper: {
    height:Ti.UI.SIZE,
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

  profile: {
    height:Ti.UI.SIZE,
    width:300,
    left:10,
    top:70,
    font:{fontSize:'12'}
  }

}