exports = {

  expiryButton: {
    title:'Set Expiry Date',
    top:100,
    width:200,
    left:10
  },

  expiryLabel: {
    top:100,
    left:120,
    text:'no date selected',
    width:Ti.UI.SIZE,
    height:Ti.UI.SIZE,
    font:{fontSize:14}
  },

	nameLabel: {		
    color:'#336699', 
    height:35, 
    width:300, 
    top:10,
    left:5,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText: 'Name on Card',
	},

  cardLabel: {    
    color:'#336699', 
    height:35, 
    width:200, 
    top:50,
    left:5,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText: 'Credit Card Number',
  },

  csvLabel: {    
    color:'#336699', 
    height:35, 
    width:75, 
    top:50,
    right:10,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText: 'CSV',
  },  

  payButton: {
    title:'Buy Tickets',
    bottom:10,
    width:300
  }

}