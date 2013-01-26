styles = {

  detailsView: {
    top:90,
    left:0,
    height:100,
    layout:'absolute'
  },

  cartTotal: {
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    top:10,
    left:10,
    font:{fontSize:16, fontWeight:'bold'},
    color:'black'
  },

  ticketsTotal: {
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    top:30,
    left:10,
    font:{fontSize:14},
    color:'black'
  },

  feesTotal: {
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    top:30,
    left:140,
    font:{fontSize:14},
    color:'black'
  },

  table: {
    top:145,
    bottom:60,
    borderColor:'gray',
    borderWidth:1
  },

  row: {
    height:70,
    selectedBackgroundColor:'#F4F1F1'
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
    top:27,       
    left:60,
    font:{fontSize:12},
    width:240,
    color:'black'
  },
  
  buttonView: {
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    bottom:5
  },

  payButton: {
    title:'Buy Tickets',    
    width:300,
    height:50
  }

}

exports.detailsView = styles.detailsView;
exports.cartTotal = styles.cartTotal;
exports.ticketsTotal = styles.ticketsTotal;
exports.feesTotal = styles.feesTotal;
exports.table = styles.table;
exports.row = styles.row;
exports.projectThumb = styles.projectThumb;
exports.projectTitle = styles.projectTitle;
exports.projectInfo = styles.projectInfo;
exports.buttonView = styles.buttonView;
exports.payButton = styles.payButton;