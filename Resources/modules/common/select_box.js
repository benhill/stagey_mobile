function SelectBox(resultsLabel, submitButton, data_1, data_2){

  var styles = require('modules/styles/styles');
  var pickerStyles = require('modules/styles/select_box');  

  var pickerView = Ti.UI.createView(pickerStyles.pickerView);
   
  var cancel =  Ti.UI.createButton(pickerStyles.cancel);
   
  var done =  Ti.UI.createButton(pickerStyles.done);
   
  var spacer =  Ti.UI.createButton(pickerStyles.spacer);
   
  var toolbar =  Ti.UI.iOS.createToolbar(pickerStyles.toolbar);
  toolbar.items = [cancel,spacer,done]
  pickerView.add(toolbar);
   
  var picker = Ti.UI.createPicker(pickerStyles.picker);
  picker.selectionIndicator=true;  
  if(data_1){
    var selectedValue;
    var selectedTitle;

    var column1 = Ti.UI.createPickerColumn();
    
    for(var i=0; i<data_1.length; i++){
      column1.addRow(data_1[i]);
    }    

    if(data_2){
      var column2 = Ti.UI.createPickerColumn();
      for(var i=0; i<data_2.length; i++){
        column2.addRow(data_2[i]);
      }
      picker.columns = [column1, column2];
    }
    else{
      picker.columns = [column1]; 
    }

  }
  else{
    var selectedDate;
    picker.type = Ti.UI.PICKER_TYPE_DATE;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = mm+'/'+dd+'/'+yyyy;
    //picker.minDate = today;
    //picker.maxDate = today + (365*12);
    //picker.value = today;
  }  
   
  pickerView.add(picker);

  picker.addEventListener("change", function(e){
    if(data_2){
      selectedTitle = e.selectedValue[0] + ' ' + e.selectedValue[1]
      selectedValue = e.selectedValue[0] + ',' + e.selectedValue[1]
    }
    else if(data_1){
      selectedValue = e.row.value;
      selectedTitle = e.row.title;
    }
    else{
      selectedDate = e.value;
    }
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
    if(data_1){
      resultsLabel.text = selectedTitle;
      resultsLabel.value = selectedValue;
    }
    else{
      resultsLabel.text =  selectedDate;
    }
    pickerView.hide();
  });
  
  pickerView.hide();

	return pickerView;
}

module.exports = SelectBox;