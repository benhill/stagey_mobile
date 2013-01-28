function Header(title, window){

  var app = require('modules/core');
  var styles = require('modules/styles/styles');
  var headerStyles = require('modules/styles/header');
  
  var headerView = Ti.UI.createView(headerStyles.headerView);

  var searchButton =  Ti.UI.createImageView(headerStyles.searchButton);

  if(title != 'Search' && title != 'Shows'){headerView.add(searchButton)};

  searchButton.addEventListener('click', function(e){
    app.openWindow('Search', 'search', []);
  });

  if(window && title != 'Me' && title != 'Login' && Ti.Platform.name == 'iPhone OS'){
    
    var backButton =  Ti.UI.createLabel(headerStyles.backButton);
    headerView.add(backButton);

    backButton.addEventListener('click', function(e){    
      window.close();
    })
  }
  else{
    var logoImage =  Ti.UI.createImageView(headerStyles.logoImage);    
    logoImage.image = 'http://stagey-mobile.s3.amazonaws.com/hff_logo.png';
    headerView.add(logoImage);

    if(Ti.Platform.name != 'iPhone OS' && title != "Home"){
      logoImage.addEventListener('click', function(e){
        app.openWindow('Home', 'shows', []);
      })
    }
  }
  
	return headerView;
}

module.exports = Header;