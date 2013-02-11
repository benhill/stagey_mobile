function NotOnsale(date){

  var app = require('modules/core');
  var styles = require('modules/styles/styles');
  var noSaleStyles = require('modules/styles/not_onsale');
  var self = Ti.UI.createWindow(styles.defaultWindow);  

  self.load = function(){
    var noSaleLabel = Ti.UI.createLabel(noSaleStyles.noSaleLabel);
    noSaleLabel.text = "Tickets go on sale " + date + "."
    self.add(noSaleLabel);
  }

  return self;
}

module.exports = NotOnsale;