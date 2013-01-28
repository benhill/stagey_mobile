styles = {	

	defaultWindow: {
  	backgroundColor:'#F4F1F1',
  	barColor:'black',
  	borderColor:'white',
    borderWidth:2,
    borderRadius:0
	},

	spinner: {
	  width:Ti.UI.SIZE,
	  height:Ti.UI.SIZE,  
	  top:150,
	  message:'loading...',
	  color:'black',
	  style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
    zIndex:1000
	},

	titleView: {
    width:'100%',
    height:Ti.UI.SIZE,
    layout:'vertical',
    backgroundColor:'black',    
    top:0
  },

  titleLabel: {
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    color:'white',
    font:{fontSize:17, fontWeight:'bold'},
    left:10,
    top:10
  },

  subTitleLabel: {
    height:Ti.UI.SIZE,
    width:'95%',
    color:'white',
    left:10,
    font:{fontSize:12},
    bottom:10
  },

  noDataLabel: {
    height:Ti.UI.SIZE,
    top:150,
    touchEnabled:false,
    color:'black'
  }

};

exports.defaultWindow = styles.defaultWindow;
exports.spinner = styles.spinner;
exports.titleView = styles.titleView;
exports.titleLabel = styles.titleLabel;
exports.subTitleLabel = styles.subTitleLabel;
exports.noDataLabel = styles.noDataLabel;