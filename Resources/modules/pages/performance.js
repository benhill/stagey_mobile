function PerformanceWindow(title, containingTab, performance_id){

  var styles = require('modules/styles/styles');
  var perfStyles = require('modules/styles/performance');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var quantity = 1;

  self.load = function(){

    spinner.show();
    self.add(spinner);

  	var perfObj = require('modules/models/performance');
  	var url = app.api_url + "performance/" + performance_id + ".json?user_id=" + Ti.App.currentUser.id;

  	new perfObj(url, function(performance){

	    (performance.project_title.length >= 25) ? title = performance.project_title.substr(0,25) + "..." : title = performance.project_title;

      var titleLabel = Ti.UI.createLabel(perfStyles.titleLabel);
	    titleLabel.text = title;
	    self.add(titleLabel);

      var perfInfo = Ti.UI.createLabel(perfStyles.perfInfo);
      perfInfo.text = performance.performance_info;
      self.add(perfInfo);

      var data = [];      
      for(i=0; i<8; i++){        
        i > 0 ? plural = 's' : plural = ''
        data[i] = Ti.UI.createPickerRow({value:i+1, title:(i+1) +' Ticket' + plural + ' for $' + app.formatCurrency(performance.cost * (i+1))});
      }

      var quantityLabel = Ti.UI.createLabel(perfStyles.quantityLabel);
      quantityLabel.text = data[0].title;
      self.add(quantityLabel);

      var quantityButton = Ti.UI.createButton(perfStyles.quantityButton);
      self.add(quantityButton);

      var selectObj = require('modules/common/select_box');
      self.add(new selectObj(quantityLabel, quantityButton, data));
      
      var payButton = Ti.UI.createButton(perfStyles.payButton);      
      self.add(payButton);

      payButton.addEventListener('click', function(e){
        var payObj = require('modules/pages/pay');        
        if(!quantityLabel.value){quantity = 1}else{quantity = quantityLabel.value}
        var payWindow = new payObj('Credit Card', containingTab, performance, quantity);
        containingTab.open(payWindow);
        payWindow.load();
      });

      self.remove(spinner);
	  })
  }

  return self;
}

module.exports = PerformanceWindow;