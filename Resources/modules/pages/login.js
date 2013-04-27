function LoginWindow(return_win){

  var app = require('modules/core');
  var styles = require('modules/styles/styles');
  var loginStyles = require('modules/styles/login');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var wrapper = Ti.UI.createView(loginStyles.wrapper);

  self.load = function(){
    var loginObj = require('modules/common/login');
    wrapper.add(new loginObj(return_win, self));
    self.add(wrapper);
  }

  return(self);
}

module.exports = LoginWindow;