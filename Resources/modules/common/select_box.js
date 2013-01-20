function SelectBox(resultsLabel, submitButton, data_1, data_2){

  var app = require('modules/core');
  var styles = require('modules/styles/styles');
  var pickerStyles = require('modules/styles/select_box');

  var pickerView = Ti.UI.createView(pickerStyles.pickerView);
   
  if(Ti.Platform.name == 'iPhone OS'){
    var cancel =  Ti.UI.createButton(pickerStyles.cancel);
     
    var done =  Ti.UI.createButton(pickerStyles.done);
     
    var spacer =  Ti.UI.createButton(pickerStyles.spacer);
     
    var toolbar =  Ti.UI.iOS.createToolbar(pickerStyles.toolbar);
    toolbar.items = [cancel,spacer,done]
    pickerView.add(toolbar);

    pickerView.bottom = 0;
    pickerView.hide();
  }
  else{
    pickerView.left = 0
    pickerView.top = 80;
    pickerView.show();
  }
   
  var picker = Ti.UI.createPicker(pickerStyles.picker);
  picker.selectionIndicator=true;
  
  if(data_1){
    var selectedValue = data_1[0].value;
    var selectedTitle = data_1[0].title;
      
    if(data_2){
      var selectedValue2  = data_2[0].value;
      var selectedTitle2 = data_2[0].title;
    }

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
  }  
   
  pickerView.add(picker);

  picker.addEventListener("change", function(e){
    if(data_2){
      if(e.columnIndex == 0){
        selectedTitle = e.row.title;
        selectedValue = e.row.value
      }
      else if(e.columnIndex == 1){
        selectedTitle2 = e.row.title;
        selectedValue2 = e.row.value
      }
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

  if(Ti.Platform.name == 'iPhone OS'){

    submitButton.addEventListener('click',function() {
      pickerView.show();
    });
   
    cancel.addEventListener('click',function() {
      pickerView.hide();
    });

    done.addEventListener('click',function() {
      if(data_2){      
        resultsLabel.text = selectedTitle + ' ' + selectedTitle2;
        resultsLabel.value = selectedValue + ',' + selectedValue2;
      }
      else if(data_1){      
        resultsLabel.text = selectedTitle;
        resultsLabel.value = selectedValue;
      }
      else{
        resultsLabel.text =  selectedDate;
      }
      pickerView.hide();
    });

  }  

	return pickerView;
}

module.exports = SelectBox;