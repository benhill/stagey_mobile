styles = {

  titleLabel: {
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    font:{fontSize:20},
    left:10,
    top:75,
    color:'black'
  },

  perfInfo: {
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    font:{fontSize:12},
    top:100,
    left:10,
    color:'black'
  },

  quantityLabel: {
    top:150,
    left:10,
    width:Ti.UI.SIZE,
    height:Ti.UI.SIZE,
    font:{fontSize:18},
    color:'black'
  },

  quantityButton: {
    title:'Change',
    top:145,
    width:75,
    left:170,
    height:30
  },

  codeText: {
    color:'#336699',
    height:45,
    width:150,
    top:180,
    left:10,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText: 'Discount Code',
  },

  buttonView: {
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    bottom:5
  },

  payButton: {
    title:'Continue',
    width:300,
    height:50
  }

}

exports.titleLabel = styles.titleLabel;
exports.perfInfo = styles.perfInfo;
exports.quantityLabel = styles.quantityLabel;
exports.quantityButton = styles.quantityButton;
exports.codeText = styles.codeText;
exports.buttonView = styles.buttonView;
exports.payButton = styles.payButton;