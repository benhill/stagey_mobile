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

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = mm+'/'+dd+'/'+yyyy;

    var datePicker = Ti.UI.createPicker(payStyles.datePicker);
    datePicker.minDate = today;
    datePicker.maxDate = today + (365*12);
    datePicker.value = today;
    self.add(datePicker);

    var payButton = Ti.UI.createButton(payStyles.payButton);      
    self.add(payButton);
  }

  return self;
}

module.exports = PayWindow;