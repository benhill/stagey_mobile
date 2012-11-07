function LoginWindow(return_win){
  
  var styles = require('modules/styles/styles');
  var meStyles = require('modules/styles/me');
  var self = Ti.UI.createWindow(styles.defaultWindow);  
  var wrapper = Ti.UI.createView(meStyles.wrapper);  

  self.load = function(){
    var loginObj = require('modules/common/login');
    wrapper.add(new loginObj(return_win));
    self.add(wrapper);
  }

  return(self);
}

module.exports = LoginWindow;