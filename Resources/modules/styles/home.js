var default_search_text = 'search for a show';

exports = {	

	searchView: {
		top:0,
    left:0,
    height:50,
    layout:'absolute'
	},

	username: {
		height: 70,
		width: '95%',
		top: 15,
		hintText: 'Username',
		backgroundColor: '#fff',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_LINE
	},

	searchField: {
    value:default_search_text,
    height:30,
    clearOnEdit:true,
    top:10,
    left:15,
    width:'82%',
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    color:'gray'		
  },

  searchButton: {
    image:'iphone/search_24.png',
    width:24,
    height:24,
    top:12,    
    left:285
  },

  iconsView: {
    top:55,
    left:0,
    height:260,
    layout:'absolute'
  },

  iconView: {
    width:100,
    height:85,
    layout:'vertical'  
  },

  iconImage: {
    height:40,
    width:40,
    top:10    
  },

  iconText: {
    height:Ti.UI.SIZE,
    width:100,
    font:{fontSize:12},
    left:0,
    top:5,
    textAlign:'center'
  }

};