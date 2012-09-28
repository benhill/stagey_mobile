function SelectBox(resultsLabel, submitButton, data){

  var styles = require('modules/styles/styles');
  var pickerStyles = require('modules/styles/select_box');
  var selected_date;
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = mm+'/'+dd+'/'+yyyy;

  var pickerView = Ti.UI.createView(pickerStyles.pickerView);
   
  var cancel =  Ti.UI.createButton(pickerStyles.cancel);
   
  var done =  Ti.UI.createButton(pickerStyles.done);
   
  var spacer =  Ti.UI.createButton(pickerStyles.spacer);
   
  var toolbar =  Ti.UI.iOS.createToolbar(pickerStyles.toolbar);
  toolbar.items = [cancel,spacer,done]
  pickerView.add(toolbar);
   
  var picker = Ti.UI.createPicker(pickerStyles.picker);
  picker.selectionIndicator=true;  
  if(data){
    picker.add(data);
  }
  else{
    picker.type = Ti.UI.PICKER_TYPE_DATE;
    //picker.minDate = today;
    //picker.maxDate = today + (365*12);
    //picker.value = today;
  }  
   
  pickerView.add(picker);

  picker.addEventListener("change", function(e){
    selected_date = e.value;
  });  

  var slide_in =  Ti.UI.createAnimation(pickerStyles.slide_in);
  var slide_out =  Ti.UI.createAnimation(pickerStyles.slide_out);

  submitButton.addEventListener('click',function() {
    pickerView.show();
  });
   
  cancel.addEventListener('click',function() {
    pickerView.hide();
  });

  done.addEventListener('click',function() {
    resultsLabel.text =  selected_date;
    pickerView.hide();
  });
  
  pickerView.hide();

	return pickerView;
}

module.exports = SelectBox;