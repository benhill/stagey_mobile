exports = {

  reviewScroll: {
    contentWidth:Ti.UI.SIZE,
    contentHeight:Ti.UI.SIZE,
    touchEnabled:true,
    scrollType:'vertical',
    verticalBounce:true,
    showVerticalScrollIndicator:true,
    height:'100%',
    top:50,
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

  helpful: {
    title: 'Helpful',
    top:25,
    left:20,
    width:100
  },

  not_helpful: {
    title: 'Not Helpful',
    top:-35,
    right:35,
    width:100  
  },

  view_project: {
    title: 'View Project',
    top:10,
    left:90,
    width:120  
  },

  body: {
    height:Ti.UI.SIZE,
    width:290,
    left:10,    
    font:{fontSize:'12'}
  },

  bodyWrapper: {
    height:Ti.UI.SIZE,
    top:0,
    left:0,
    layout:'vertical'
  },

  wrapper: {
    height:Ti.UI.SIZE,
    top:0,
    left:0,
    layout:'vertical'
  }

}