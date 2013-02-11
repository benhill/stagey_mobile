function Header(title, window){

  var app = require('modules/core');
  var styles = require('modules/styles/styles');
  var headerStyles = require('modules/styles/header');
  
  var headerView = Ti.UI.createView(headerStyles.headerView);

  if(Ti.Platform.name == 'iPhone OS'){

    var searchButton =  Ti.UI.createImageView(headerStyles.searchButton);
    if(title != 'Search'){headerView.add(searchButton)};  

    searchButton.addEventListener('click', function(e){
      app.openWindow(window, 'Search', 'search', []);
    });  

    var userButton =  Ti.UI.createImageView(headerStyles.userButton);
    headerView.add(userButton);

    userButton.addEventListener('click', function(e){
      app.openWindow(window, 'Me', 'me', []);
    });  
  }

  if(window && title != 'Home' && Ti.Platform.name == 'iPhone OS'){    
    var backButton =  Ti.UI.createLabel(headerStyles.backButton);
    headerView.add(backButton);

    backButton.addEventListener('click', function(e){    
      if(title == 'Schedule'){
        app.openWindow(window, 'Home', 'shows', []);  
      }
      else if (title == 'My Schedule'){
        app.openWindow(window, 'Me', 'me', []);
      }
      else{
        window.close();
      }
    })
    
  }
  else{
    var logoImage =  Ti.UI.createImageView(headerStyles.logoImage);    
    logoImage.image = 'http://stagey-mobile.s3.amazonaws.com/hff_logo.png';
    headerView.add(logoImage);

    if(Ti.Platform.name != 'iPhone OS' && title != "Home"){
      logoImage.addEventListener('click', function(e){
        app.openWindow(window, 'Home', 'shows', []);
      })
    }
  }
  
	return headerView;
}

module.exports = Header;