styles = {

	fNameText: {
    color:'#336699', 
    height:35, 
    width:150, 
    top:100,
    left:5,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText: 'First Name',
	},

  lNameText: {
    color:'#336699', 
    height:35, 
    width:150,
    top:100,
    left:160,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText: 'Last Name',
  },

  cardText: {    
    color:'#336699', 
    height:35, 
    width:200, 
    top:140,
    left:5,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText: 'Credit Card Number',
  },

  csvText: {    
    color:'#336699', 
    height:35, 
    width:75, 
    top:140,
    right:10,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText: 'CSV',
  },  

  expiryButton: {
    title:'Set Expiry Date',
    top:190,
    width:150,
    left:10
  },

  expiryLabel: {
    top:198,
    left:170,
    text:'no date selected',
    width:Ti.UI.SIZE,
    height:Ti.UI.SIZE,
    font:{fontSize:14}
  },

  payButton: {
    title:'Review Order',
    bottom:5,
    width:300,
    height:50
  }

}

exports.fNameText = styles.fNameText;
exports.lNameText = styles.lNameText;
exports.cardText = styles.cardText;
exports.csvText = styles.csvText;
exports.expiryButton = styles.expiryButton;
exports.expiryLabel = styles.expiryLabel;
expiryLabel.payButton = styles.payButton;