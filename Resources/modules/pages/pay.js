function PayWindow(){

  var app = require('modules/core');
  var styles = require('modules/styles/styles');
  var payStyles = require('modules/styles/pay');
  var self = Ti.UI.createWindow(styles.defaultWindow);

  self.load = function(){

    var titleView = Ti.UI.createView(styles.titleView);
    titleView.top = 50;    

    var titleLabel = Ti.UI.createLabel(styles.titleLabel);
    titleLabel.text = 'Your Credit Card';
    titleLabel.bottom = 10;
    titleView.add(titleLabel);

    self.add(titleView);
    
    var fNameText = Ti.UI.createTextField(payStyles.fNameText);
    self.add(fNameText);
    app.addKeyboardToolbar(fNameText);

    var lNameText = Ti.UI.createTextField(payStyles.lNameText);
    self.add(lNameText);
    app.addKeyboardToolbar(lNameText);

    var cardText = Ti.UI.createTextField(payStyles.cardText);
    self.add(cardText);
    app.addKeyboardToolbar(cardText);
    
    var csvText = Ti.UI.createTextField(payStyles.csvText);
    self.add(csvText);
    app.addKeyboardToolbar(csvText);    

    if(Ti.Platform.name == 'iPhone OS'){

      var expiryLabel = Ti.UI.createLabel(payStyles.expiryLabel);
      self.add(expiryLabel);

      csvText.addEventListener('change', function(e){
        if(e.value.length == 3){
          e.source.blur();
        }      
      })
            
      var expiryButton = Ti.UI.createButton(payStyles.expiryButton);    
      self.add(expiryButton);

      expiryButton.addEventListener('click', function(e){
        fNameText.blur();
        lNameText.blur();
        cardText.blur();
        csvText.blur();
        payButton.show();
      })
    }    

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
        
    var monthObj = require('modules/common/select_box');
    monthPicker = new monthObj(expiryLabel, expiryButton, data_1, data_2);        
    self.add(monthPicker);

    var payButton = Ti.UI.createButton(payStyles.payButton);

    if(Ti.Platform.name != 'iPhone OS'){
      monthPicker.top = 200;
      monthPicker.left = 20;

      var yearObj = require('modules/common/select_box');      
      yearPicker = new yearObj(expiryLabel, expiryButton, data_2);      
      self.add(yearPicker);
      yearPicker.top = 200;
      yearPicker.right = 20;
    }
    else{payButton.hide();}        

    self.add(payButton);        

    payButton.addEventListener('click', function(e){
      if(Ti.Platform.name == 'iPhone OS'){
        expiryMonth = expiryLabel.value.split(',')[0];
        expiryYear = expiryLabel.value.split(',')[1];
      }
      else{
        expiryMonth = monthPicker.value;
        expiryYear = yearPicker.value;
      }
      params = [cardText.value, fNameText.value, lNameText.value, csvText.value, expiryMonth, expiryYear];
      app.openWindow('Review Order', 'order', params);
    });
  }

  return self;
}

module.exports = PayWindow;