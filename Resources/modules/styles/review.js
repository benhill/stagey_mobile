exports = {

  reviewScroll: {
    contentWidth:Ti.UI.SIZE,
    contentHeight:Ti.UI.SIZE,
    touchEnabled:true,
    scrollType:'vertical',
    verticalBounce:true,
    showVerticalScrollIndicator:true,
    height:325,
    top:50,
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
    font:{fontSize:13, fontWeight:'bold'},
    color:'white'
  },

  projectLabel: {
    height:45,  
    top:11,
    font:{fontSize:10, fontWeight:'bold'},
    right:0,
    left:75,
    color:'white'
  },

  info: {
    height:47,
    top:26,
    font:{fontSize:10, fontWeight:'bold'},
    right:0,
    left:75,
    color:'white'
  },

  line: {
    width:Ti.UI.SIZE,
    height:1,
    top:1,
    left:0,
    backgroundColor:'black'
  },

  helpful: {
    title: 'Helpful',
    top:5,
    left:5,
    width:90
  },

  not_helpful: {
    title: 'Not Helpful',
    top:5,
    left:5,
    width:100  
  },

  view_project: {
    title: 'View Project',
    top:5,
    left:5,
    width:100  
  },

  body: {
    height:Ti.UI.SIZE,
    width:290,
    left:10,
    top:5,
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
  },

  buttonsWrapper: {
    bottom:0,
    width:'100%',
    height:50,
    borderWidth:1,
    borderColor:'gray',
    layout:'horizontal'
  }

}