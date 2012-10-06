exports = {    

  titleLabel: {
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    font:{fontSize:20},
    left:10,
    top:5
  },

  perfInfo: {
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    font:{fontSize:12},
    top:30,
    left:10
  },

  quantityLabel: {
    top:70,
    left:10,    
    width:Ti.UI.SIZE,
    height:Ti.UI.SIZE,
    font:{fontSize:18}
  },

  quantityButton: {
    title:'Change',
    top:65,
    width:75,
    left:90
  },

  codeText: {    
    color:'#336699', 
    height:35, 
    width:150, 
    top:120,
    left:10,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText: 'Discount Code',
  },

  payButton: {
    title:'Pay for Tickets',
    bottom:10,
    width:300
  }

}