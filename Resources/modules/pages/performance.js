function PerformanceWindow(title, containingTab, performance_id){

  var styles = require('modules/styles/styles');
  var perfStyles = require('modules/styles/performance');
  
  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;

  self.load = function(){

  	var perfObj = require('modules/models/performance');
  	var url = app.api_url + "performance/" + performance_id + ".json";

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
        data[i] = Ti.UI.createPickerRow({title:(i+1) +' Ticket' + plural + ' for $' + app.formatCurrency(performance.cost * (i+1))});
      }

      var quantity = Ti.UI.createPicker(perfStyles.quantity);      
      quantity.add(data);
      perfScroll.add(quantity);

      var payButton = Ti.UI.createButton(perfStyles.payButton);
      perfScroll.add(payButton);

	    self.add(perfScroll);
	  })
  }

  return self;
}

module.exports = PerformanceWindow;