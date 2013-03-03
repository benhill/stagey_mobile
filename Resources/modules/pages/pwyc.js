function PwycWindow(performance_id){

  var app = require('modules/core');
  var styles = require('modules/styles/styles');
  var pwycStyles = require('modules/styles/pwyc');  
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);

  self.load = function(){

    spinner.show();
    self.add(spinner);

	  var titleView = Ti.UI.createView(styles.titleView);
    titleView.top = 50;

    var perfObj = require('modules/models/performance');
    var url = Ti.App.api_url + "performance/" + performance_id + "?user_id=" + (Ti.App.currentUser ? Ti.App.currentUser.id : '');

    new perfObj(url, function(performance){

      (performance.project_title.length >= 25) ? title = performance.project_title.substr(0,25) + "..." : title = performance.project_title;

      var titleLabel = Ti.UI.createLabel(styles.titleLabel);
      titleLabel.text = title;
      titleView.add(titleLabel);

      var perfInfo = Ti.UI.createLabel(styles.subTitleLabel);
      perfInfo.text = performance.performance_info;
      perfInfo.bottom = 10;
      titleView.add(perfInfo);

      self.add(titleView);

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

      self.remove(spinner);

  	  quantButton.addEventListener('click', function(e){
  	    app.openWindow(self, 'Performance', 'quantity', [performance.id, pwycText.value]);        
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
    });
  }

	return self;
}

module.exports = PwycWindow;