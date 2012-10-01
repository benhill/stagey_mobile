function PayWindow(title, containingTab, performance, quantity){

  var styles = require('modules/styles/styles');
  var payStyles = require('modules/styles/pay');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;  

  self.load = function(){
    var fNameText = Ti.UI.createTextField(payStyles.fNameText);
    self.add(fNameText);

    var lNameText = Ti.UI.createTextField(payStyles.lNameText);
    self.add(lNameText);

    var cardText = Ti.UI.createTextField(payStyles.cardText);
    self.add(cardText);

    var csvText = Ti.UI.createTextField(payStyles.csvText);
    self.add(csvText);

    var expiryLabel = Ti.UI.createLabel(payStyles.expiryLabel);    
    self.add(expiryLabel);

    var expiryButton = Ti.UI.createButton(payStyles.expiryButton);    
    self.add(expiryButton);

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var data_1 = [];
    for(i=0; i < months.length; i++){              
      data_1[i] = Ti.UI.createPickerRow({value:i+1, title:months[i]});
    }

    year = new Date().getFullYear();
    years = [];
    for(i=0; i < 12; i++){
      years[i] = String(year+i);
    }    
    var data_2 = [];
    for(i=0; i < years.length; i++){
      data_2[i] = Ti.UI.createPickerRow({value:years[i], title:years[i]});
    }    

    var selectObj = require('modules/common/select_box');
    self.add(new selectObj(expiryLabel, expiryButton, data_1, data_2));

    var payButton = Ti.UI.createButton(payStyles.payButton);
    payButton.hide();
    self.add(payButton);

    expiryButton.addEventListener('click', function(e){
      payButton.show();
    })

    payButton.addEventListener('click', function(e){
      
      var cartObj = require('modules/models/cart');

      new cartObj(Ti.App.currentUser.id).add_to_cart(performance.id, quantity, function(e){
        expiryMonth = expiryLabel.value.split(',')[0];
        expiryYear = expiryLabel.value.split(',')[1];

        var orderObj = require('modules/pages/order');
        var orderWindow = new orderObj('Review Order', containingTab, cardText.value, fNameText.value, lNameText.value, csvText.value, expiryMonth, expiryYear);
        containingTab.open(orderWindow);
      });
            
    });
  }

  return self;
}

module.exports = PayWindow;