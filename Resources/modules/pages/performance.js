function PerformanceWindow(title, containingTab, performance_id, pwycPrice){

  var styles = require('modules/styles/styles');
  var perfStyles = require('modules/styles/performance');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var quantity = 1;
  var pwycPrice;

  self.load = function(){

    spinner.show();
    self.add(spinner);

  	var perfObj = require('modules/models/performance');
  	var url = app.api_url + "performance/" + performance_id + ".json?user_id=" + Ti.App.currentUser.id;

  	new perfObj(url, function(performance){

      var cost;
      pwycPrice ? cost = pwycPrice : cost = performance.cost;

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
        data[i] = Ti.UI.createPickerRow({value:i+1, title:(i+1) +' Ticket' + plural + ' x $' + app.formatCurrency(cost)});
      }

      var quantityLabel = Ti.UI.createLabel(perfStyles.quantityLabel);
      quantityLabel.text = data[0].title;
      self.add(quantityLabel);

      var quantityButton = Ti.UI.createButton(perfStyles.quantityButton);
      self.add(quantityButton);

      var selectObj = require('modules/common/select_box');
      self.add(new selectObj(quantityLabel, quantityButton, data));

      var codeText = Ti.UI.createTextField(perfStyles.codeText);
      if(!pwycPrice){
        self.add(codeText);
        addKeyboardToolbar(codeText);
      }
      
      var payButton = Ti.UI.createButton(perfStyles.payButton);      
      self.add(payButton);

      payButton.addEventListener('click', function(e){
        if(!quantityLabel.value){quantity = 1}else{quantity = quantityLabel.value}
        var cartObj = require('modules/models/cart');
        new cartObj(Ti.App.currentUser.id).add_to_cart(performance.id, quantity, pwycPrice, function(e){
          if(e.cart_total > 0){
            if(codeText.value.length > 0){
              var cartObj = require('modules/models/cart');
              new cartObj(Ti.App.currentUser.id).apply_discount_code(codeText.value, function(result){
                if(result.success){loadPayWindow();}
                else{alert('Discount Code Not Found')}
              })
            }
            else{
              loadPayWindow();
            }
          }
          else{
            var cartObj = require('modules/models/cart');
            new cartObj(Ti.App.currentUser.id).purchase(null, null, null, null, null, null, function(e){
              if (e.error){
                alert(e.error)
              }
              else{                
                var params = ['Receipt', containingTab, e.sale_id];
                app.openWindow('receipt', containingTab, params);
              }
            })
          }

        });
      });

      self.remove(spinner);
	  })
  }

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

  function loadPayWindow(){
    var params = ['Credit Card', containingTab];
    app.openWindow('pay', containingTab, params);
  }

  return self;
}

module.exports = PerformanceWindow;