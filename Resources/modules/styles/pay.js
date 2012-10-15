exports = {

	fNameText: {
    color:'#336699', 
    height:35, 
    width:150, 
    top:60,
    left:5,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText: 'First Name',
	},

  lNameText: {
    color:'#336699', 
    height:35, 
    width:150,
    top:60,
    left:160,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText: 'Last Name',
  },

  cardText: {    
    color:'#336699', 
    height:35, 
    width:200, 
    top:100,
    left:5,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText: 'Credit Card Number',
  },

  csvText: {    
    color:'#336699', 
    height:35, 
    width:75, 
    top:100,
    right:10,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText: 'CSV',
  },  

  expiryButton: {
    title:'Set Expiry Date',
    top:150,
    width:150,
    left:10
  },

  expiryLabel: {
    top:158,
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