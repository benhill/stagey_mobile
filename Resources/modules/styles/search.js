styles = {

  searchField: {
    height:40,
    top:55,
    left:5,
    width:'85%',
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText:'search for a show',
    clearOnEdit:true,
    color:'black'
  },

  searchButton: {    
    width:24,
    height:24,
    top:57,    
    left:285
  },

  noResultsLabel: {
    top:150,
    width:Ti.UI.SIZE,
    height:Ti.UI.SIZE,
    text:'No projects match your query...'
  }

}

exports.searchField = styles.searchField;
exports.searchButton = styles.searchButton;
exports.noResultsLabel = styles.noResultsLabel;