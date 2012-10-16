function Header(title, window){

  var styles = require('modules/styles/styles');
  var pickerStyles = require('modules/styles/select_box');
  
  var headerView = Ti.UI.createView({
    top:0,
    height:50,
    width:'100%',
    backgroundColor:'black'
  })

  var searchButton =  Ti.UI.createImageView({
    image:'iphone/search_24.png',
    width:24,
    height:24,
    right:15,
    top:15
  });
  if(title != 'Search'){headerView.add(searchButton)};

  searchButton.addEventListener('click', function(e){
    app.openWindow('Search', 'search', []);
  });

  if(window && title != 'Me' && title != 'Login'){
    var headerLabel = Ti.UI.createLabel({
      height:Ti.UI.SIZE,
      width:Ti.UI.SIZE,
      text:title,
      color:'white',
      left:80,
      font:{fontSize:22, fontWeight:'bold'}
    })
    //headerView.add(headerLabel)

    var backButton =  Ti.UI.createLabel({
      text:"\u21E6 back",
      font:{fontSize:14},
      color:'white',
      width:Ti.UI.SIZE,
      height:Ti.UI.SIZE,
      top:15,
      left:5
    });
    headerView.add(backButton);

    backButton.addEventListener('click', function(e){    
      window.close();
    })
  }
  else{
    var logoImage =  Ti.UI.createImageView({
      image:'iphone/hff_logo.png',      
      top:10,
      left:10
    });
    headerView.add(logoImage);
  }
  
	return headerView;
}

module.exports = Header;