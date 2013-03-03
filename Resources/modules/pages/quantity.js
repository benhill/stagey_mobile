function QuantityWindow(performance_id, pwycPrice){

  var app = require('modules/core');
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
  	var url = Ti.App.api_url + "performance/" + performance_id + "?user_id=" + Ti.App.currentUser.id;

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

      if(Ti.Platform.name == 'iPhone OS'){
        quantityLabel.text = data[0].title;        

        var quantityButton = Ti.UI.createButton(perfStyles.quantityButton);
        self.add(quantityButton);
      }
      else{
        quantityLabel.hide();
      }
      self.add(quantityLabel);

      var selectObj = require('modules/common/select_box');
      quantPicker = new selectObj(quantityLabel, quantityButton, data);
      
      if(Ti.Platform.name != 'iPhone OS'){
        quantView = Ti.UI.createView();
        quantView.height = Ti.UI.SIZE;
        quantView.width = Ti.UI.SIZE;
        quantView.top = 80;
        quantView.add(quantPicker);
        
        self.add(quantView);
      }
      else{
        self.add(quantPicker);
      }

      var codeText = Ti.UI.createTextField(perfStyles.codeText);
      if(Ti.Platform.name != 'iPhone OS'){codeText.left = null}
      if(!pwycPrice){
        self.add(codeText);
        addKeyboardToolbar(codeText);
      }

      var buttonView = Ti.UI.createView(perfStyles.buttonView);
      
      payButton = Ti.UI.createButton(perfStyles.payButton);      
      buttonView.add(payButton);
      self.add(buttonView);      

      payButton.addEventListener('click', function(e){
        if(Ti.Platform.name == 'iPhone OS'){
          if(!quantityLabel.value){quantity = 1}else{quantity = quantityLabel.value}
        }
        else{quantity = quantPicker.value;}
        var cartObj = require('modules/models/cart');        

        new cartObj(Ti.App.currentUser.id).add_to_cart(performance.id, quantity, pwycPrice, function(e){
          if(e.cart_total > 0){
            if(codeText.value.length > 0){
              var cartObj = require('modules/models/cart');
              new cartObj(Ti.App.currentUser.id).apply_discount_code(codeText.value, function(result){
                if(result.pwyc){
                  alert('Discount Code Applied.  Choose Your Price.');
                  app.openWindow(self, 'PWYC', 'pwyc', [performance.id]);
                }
                else if(result.success){
                  alert('Discount Code Applied');
                  loadPayWindow();
                }
                else{
                  alert('Discount Code Not Found')
                  buttonView.remove(spinner);
                  buttonView.add(payButton);
                }
              })
            }
            else{
              loadPayWindow();
              buttonView.remove(spinner);
              buttonView.add(payButton);
            }
          }
          else{
            app.openWindow(self, 'Review Order', 'order', [null, null, null, null, null, null, true]);
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
    app.openWindow(self, 'Credit Card', 'pay', []);
  }

  return self;
}

module.exports = QuantityWindow;