styles = {

	fNameText: {
    color:'#336699',
    height:45,
    width:150,
    top:120,
    left:5,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText: 'First Name'
	},

  lNameText: {
    color:'#336699',
    height:45,
    width:150,
    top:120,
    left:160,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText: 'Last Name'
  },

  cardText: {
    color:'#336699',
    height:45,
    width:200,
    top:170,
    left:5,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText:'Credit Card Number',
    keyboardType:Ti.UI.KEYBOARD_NUMBER_PAD,
    passwordMask:true,
  },

  csvText: {
    color:'#336699',
    height:45,
    width:75,
    top:170,
    right:10,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText: 'CSV',
    keyboardType:Ti.UI.KEYBOARD_NUMBER_PAD,
    passwordMask:true,
  },

  expiryButton: {
    title:'Set Expiry Date',
    top:220,
    width:150,
    left:10
  },

  expiryLabel: {
    top:228,
    left:170,
    text:'no date selected',
    width:Ti.UI.SIZE,
    height:Ti.UI.SIZE,
    font:{fontSize:14},
    color:'black'
  },

  payButton: {
    title:'Review Order',
    bottom:5,
    width:300,
    height:50
  },

  pickerContainer1: {
    height:Ti.UI.SIZE
  },

  pickerContainer2: {
    height:Ti.UI.SIZE
  }

}

exports.fNameText = styles.fNameText;
exports.lNameText = styles.lNameText;
exports.cardText = styles.cardText;
exports.csvText = styles.csvText;
exports.expiryButton = styles.expiryButton;
exports.expiryLabel = styles.expiryLabel;
exports.payButton = styles.payButton;
exports.pickerContainer1 = styles.pickerContainer1;
exports.pickerContainer2 = styles.pickerContainer2;