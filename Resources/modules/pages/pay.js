function PayWindow(title, containingTab, performance, quantity){

  var styles = require('modules/styles/styles');
  var payStyles = require('modules/styles/pay');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;  

  self.load = function(){
    var nameLabel = Ti.UI.createTextField(payStyles.nameLabel);
    self.add(nameLabel);

    var cardLabel = Ti.UI.createTextField(payStyles.cardLabel);
    self.add(cardLabel);

    var csvLabel = Ti.UI.createTextField(payStyles.csvLabel);
    self.add(csvLabel);

    var expiryLabel = Ti.UI.createLabel(payStyles.expiryLabel);
    self.add(expiryLabel);

    var expiryButton = Ti.UI.createButton(payStyles.expiryButton);
    self.add(expiryButton);

    var selectObj = require('modules/common/select_box');
    self.add(new selectObj(expiryLabel, expiryButton));

    var payButton = Ti.UI.createButton(payStyles.payButton);      
    self.add(payButton);
  }

  return self;
}

module.exports = PayWindow;