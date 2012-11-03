exports = {

  pageScroll: {
    contentWidth:Ti.UI.SIZE,
    contentHeight:Ti.UI.SIZE,
    touchEnabled:true,
    scrollType:'vertical',
    verticalBounce:true,
    showVerticalScrollIndicator:true,
    height:330,
    top:50,
    left:0
  },

  titleView: {
    width:'100%',
    height:Ti.UI.SIZE,
    backgroundColor:'black',    
    top:50
  },

  nameLabel: {
    height:45,
    left:10,
    top:-7,
    font:{fontSize:15, fontWeight:'bold'},
    color:'white'
  },

  projectLabel: {
    height:45,  
    top:11,
    font:{fontSize:13, fontWeight:'bold'},
    right:0,
    left:10,
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
    font:{fontSize:'15'}
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