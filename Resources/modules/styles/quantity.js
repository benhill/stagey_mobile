exports = {    

  titleLabel: {
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    font:{fontSize:20},
    left:10,
    top:55
  },

  perfInfo: {
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    font:{fontSize:12},
    top:80,
    left:10
  },

  quantityLabel: {
    top:120,
    left:10,    
    width:Ti.UI.SIZE,
    height:Ti.UI.SIZE,
    font:{fontSize:18}
  },

  quantityButton: {
    title:'Change',
    top:115,
    width:75,
    left:170
  },

  codeText: {    
    color:'#336699', 
    height:35, 
    width:150, 
    top:170,
    left:10,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText: 'Discount Code',
  },

  buttonView: {
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    bottom:10
  },

  payButton: {
    title:'Pay for Tickets',    
    width:300
  }

}