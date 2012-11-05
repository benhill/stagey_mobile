function PwycWindow(performance){

  var styles = require('modules/styles/styles');
  var pwycStyles = require('modules/styles/pwyc');  
  var self = Ti.UI.createWindow(styles.defaultWindow);

  self.load = function(){

	  var pwycLabel = Ti.UI.createLabel(pwycStyles.pwycLabel);        
	  self.add(pwycLabel);

	  var dollarLabel = Ti.UI.createLabel(pwycStyles.dollarLabel);
	  self.add(dollarLabel);

	  var pwycText = Ti.UI.createTextField(pwycStyles.pwycText);
	  pwycText.value = app.formatCurrency(performance.cost);
	  self.add(pwycText);
	  addKeyboardToolbar(pwycText);

	  var quantButton = Ti.UI.createButton(pwycStyles.quantButton);
	  self.add(quantButton);

	  quantButton.addEventListener('click', function(e){
	    app.openWindow('Performance', 'quantity', [performance.id, pwycText.value]);
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
  }

	return self;
}

module.exports = PwycWindow;