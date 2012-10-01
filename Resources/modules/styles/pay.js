exports = {

	fNameText: {
    color:'#336699', 
    height:35, 
    width:140, 
    top:10,
    left:5,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText: 'First Name',
	},

  lNameText: {
    color:'#336699', 
    height:35, 
    width:140,
    top:10,
    left:150,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText: 'Last Name',
  },

  cardText: {    
    color:'#336699', 
    height:35, 
    width:200, 
    top:50,
    left:5,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText: 'Credit Card Number',
  },

  csvText: {    
    color:'#336699', 
    height:35, 
    width:75, 
    top:50,
    right:10,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText: 'CSV',
  },  

  expiryButton: {
    title:'Set Expiry Date',
    top:100,
    width:150,
    left:10
  },

  expiryLabel: {
    top:108,
    left:170,
    text:'no date selected',
    width:Ti.UI.SIZE,
    height:Ti.UI.SIZE,
    font:{fontSize:14}
  },

  payButton: {
    title:'Review Order',
    bottom:10,
    width:300
  }

}