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
	    var perfScroll = Ti.UI.createScrollView(perfStyles.perfScroll);

	    var title = Ti.UI.createLabel(perfStyles.title);
	    title.text = performance.project_title;
	    perfScroll.add(title);

      var perfInfo = Ti.UI.createLabel(perfStyles.perfInfo);
      perfInfo.text = performance.performance_info;
      perfScroll.add(perfInfo);

      var data = [];      
      for(i=0; i<8; i++){        
        i > 0 ? plural = 's' : plural = ''
        data[i] = Ti.UI.createPickerRow({value:i+1, title:(i+1) +' Ticket' + plural + ' for $' + app.formatCurrency(performance.cost * (i+1))});
      }

      var quantityPicker = Ti.UI.createPicker(perfStyles.quantityPicker);
      quantityPicker.add(data);
      perfScroll.add(quantityPicker);

      quantityPicker.addEventListener('change', function(e){quantity = e.row.value;});
      
      var payButton = Ti.UI.createButton(perfStyles.payButton);      
      perfScroll.add(payButton);

      payButton.addEventListener('click', function(e){
        var payObj = require('modules/pages/pay');
        var payWindow = new payObj('Credit Card', containingTab, performance, quantity);
        containingTab.open(payWindow);
        payWindow.load();
      });

	    self.add(perfScroll);
      self.remove(spinner);
	  })
  }

  return self;
}

module.exports = PerformanceWindow;