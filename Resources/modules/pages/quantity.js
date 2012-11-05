function QuantityWindow(performance_id, pwycPrice){

  var styles = require('modules/styles/styles');
  var perfStyles = require('modules/styles/quantity');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var quantity = 1;
  var pwycPrice;
  var payButton;

  self.load = function(){

    spinner.show();
    self.add(spinner);

  	var perfObj = require('modules/models/performance');
  	var url = app.api_url + "performance/" + performance_id + "?user_id=" + Ti.App.currentUser.id;

  	new perfObj(url, function(performance){

      self.remove(spinner);

      var cost;
      pwycPrice ? cost = pwycPrice : cost = performance.cost;

      var titleView = Ti.UI.createView(styles.titleView);
      titleView.top = 50;

	    (performance.project_title.length >= 25) ? title = performance.project_title.substr(0,25) + "..." : title = performance.project_title;

      var titleLabel = Ti.UI.createLabel(styles.titleLabel);
	    titleLabel.text = title;
	    titleView.add(titleLabel);

      var perfInfo = Ti.UI.createLabel(styles.subTitleLabel);
      perfInfo.text = performance.performance_info;
      perfInfo.bottom = 10;
      titleView.add(perfInfo);

      self.add(titleView);

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

      var buttonView = Ti.UI.createView(perfStyles.buttonView);
      
      payButton = Ti.UI.createButton(perfStyles.payButton);      
      buttonView.add(payButton);
      self.add(buttonView);      

      payButton.addEventListener('click', function(e){
        if(!quantityLabel.value){quantity = 1}else{quantity = quantityLabel.value}
        var cartObj = require('modules/models/cart');

        buttonView.remove(payButton);

        var spinner = Ti.UI.createActivityIndicator(styles.spinner);
        spinner.bottom = 10;
        spinner.message = '';
        buttonView.add(spinner);
        spinner.show();

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
              buttonView.remove(spinner);
              buttonView.add(payButton);
            }
          }
          else{
            var cartObj = require('modules/models/cart');
            new cartObj(Ti.App.currentUser.id).purchase(null, null, null, null, null, null, function(e){
              if (e.error){
                alert(e.error)
                buttonView.remove(spinner);
                buttonView.add(payButton);
              }
              else{                                
                app.openWindow('Receipt', 'receipt', [e.sale_id]);
                buttonView.remove(spinner);
                buttonView.add(payButton);
              }
            })
          }

        });
      });      
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
    app.openWindow('Credit Card', 'pay', []);
  }

  return self;
}

module.exports = QuantityWindow;