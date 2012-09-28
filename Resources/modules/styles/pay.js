exports = {

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

  pickerView: {
    height:251,
    bottom:-251,
    zIndex:100
  },

  cancel: {
    title:'Cancel',
    style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
  },

  done: {
    title:'Done',
    style:Titanium.UI.iPhone.SystemButtonStyle.DONE
  },

  spacer: {
    systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
  },

  toolbar: {
    top:0    
  },

  picker: {
    top:43,
    type:Ti.UI.PICKER_TYPE_DATE
  },

  slide_in: {
    bottom:0
  },

  slide_out: {
    bottom:-251
  },

  showPicker: {
    title:'Set Expiry Date',
    top:100,
    width:100,
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

  payButton: {
    title:'Buy Tickets',
    bottom:10,
    width:300
  }

}