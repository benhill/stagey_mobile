styles = {

  detailsView: {
    top:90,
    left:0,
    height:130,
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
    top:50,
    left:10,
    font:{fontSize:14},
    color:'black'
  },

  subscriptionSwitch: {
    top:10,
    right:10,
    titleOn:'Yes',
    titleOff:'No',
    width:45,
    height:35
  },

  subscriptionLabel: {
    text:'share personal info with this show',
    font:{fontSize:14},
    color:'black',
    top:40,
    right:10,
    width:'40%',
    textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT
  },

  table: {
    top:175,
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
exports.subscriptionSwitch = styles.subscriptionSwitch;
exports.subscriptionLabel = styles.subscriptionLabel;