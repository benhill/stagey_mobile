function PayWindow(){

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
    addKeyboardToolbar(fNameText);

    var lNameText = Ti.UI.createTextField(payStyles.lNameText);
    self.add(lNameText);
    addKeyboardToolbar(lNameText);

    var cardText = Ti.UI.createTextField(payStyles.cardText);
    self.add(cardText);
    addKeyboardToolbar(cardText);
    
    var csvText = Ti.UI.createTextField(payStyles.csvText);
    self.add(csvText);
    addKeyboardToolbar(csvText);

    csvText.addEventListener('change', function(e){
      if(e.value.length == 3){
        e.source.blur();
      }      
    })

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
      fNameText.blur();
      lNameText.blur();
      cardText.blur();
      csvText.blur();
      payButton.show();
    })

    function addKeyboardToolbar(textbox){
      var flexSpace = Ti.UI.createButton({
        systemButton:Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
        right:0
      });

      var doneButton = Ti.UI.createButton({
        systemButton:Ti.UI.iPhone.SystemButton.DONE,
        right:0
      });

      textbox.keyboardToolbar = [flexSpace, doneButton];

      textbox.addEventListener('focus', function(e) {
        textbox.keyboardToolbar = [flexSpace, doneButton];
        doneButton.activeFld = textbox;
      });

      doneButton.addEventListener('click', function(e) {
        e.source.activeFld.blur();
      });
    };

    payButton.addEventListener('click', function(e){
      expiryMonth = expiryLabel.value.split(',')[0];
      expiryYear = expiryLabel.value.split(',')[1];        
      params = [cardText.value, fNameText.value, lNameText.value, csvText.value, expiryMonth, expiryYear];
      app.openWindow('Review Order', 'order', params);
    });
  }

  return self;
}

module.exports = PayWindow;