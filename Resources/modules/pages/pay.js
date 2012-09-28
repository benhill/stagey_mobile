function PayWindow(title, containingTab, performance, quantity){

  var styles = require('modules/styles/styles');
  var payStyles = require('modules/styles/pay');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;
  var selected_date;

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

    var expiryLabel = Ti.UI.createLabel(payStyles.expiryLabel);
    self.add(expiryLabel);

    var showPicker = Ti.UI.createButton(payStyles.showPicker);
    self.add(showPicker);

    var pickerView = Ti.UI.createView(payStyles.pickerView);
     
    var cancel =  Ti.UI.createButton(payStyles.cancel);
     
    var done =  Ti.UI.createButton(payStyles.done);
     
    var spacer =  Ti.UI.createButton(payStyles.spacer);
     
    var toolbar =  Ti.UI.iOS.createToolbar(payStyles.toolbar);
    toolbar.items = [cancel,spacer,done]
    pickerView.add(toolbar);
     
    var picker = Ti.UI.createPicker(payStyles.picker);
    picker.selectionIndicator=true;    
    picker.minDate = today;
    picker.maxDate = today + (365*12);
    picker.value = today;
     
    pickerView.add(picker);

    picker.addEventListener("change", function(e){
      selected_date = e.value;
    });
    
    self.add(pickerView);

    var slide_in =  Ti.UI.createAnimation(payStyles.slide_in);
    var slide_out =  Ti.UI.createAnimation(payStyles.slide_out);

    showPicker.addEventListener('click',function() {
      pickerView.animate(slide_in);      
    });
     
    cancel.addEventListener('click',function() {
      pickerView.animate(slide_out);
    });

    done.addEventListener('click',function() {
      expiryLabel.text =  selected_date;
      pickerView.animate(slide_out);
    });

    var payButton = Ti.UI.createButton(payStyles.payButton);      
    self.add(payButton);
  }

  return self;
}

module.exports = PayWindow;