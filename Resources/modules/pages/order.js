function OrderWindow(cc_num, cc_fname, cc_lname, csv, expiry_month, expiry_year){

  var app = require('modules/core');
  var styles = require('modules/styles/styles');
  var orderStyles = require('modules/styles/order');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var cartObj = require('modules/models/cart');
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var payButton;

  self.load = function(){

    spinner.show();
    self.add(spinner);

    new cartObj(Ti.App.currentUser.id).get(function(e){

      var titleView = Ti.UI.createView(styles.titleView);
      titleView.top = 50;

      var titleLabel = Ti.UI.createLabel(styles.titleLabel);
      titleLabel.text = 'Review Your Order';
      titleLabel.bottom = 10;
      titleView.add(titleLabel);

      self.add(titleView);

      var detailsView = Ti.UI.createView(orderStyles.detailsView);

      var cartTotal = Ti.UI.createLabel(orderStyles.cartTotal);
      cartTotal.text = 'Total: $' + app.formatCurrency(e[0].total_cart);
      detailsView.add(cartTotal);

      var ticketsTotal = Ti.UI.createLabel(orderStyles.ticketsTotal);
      ticketsTotal.text = '$' + app.formatCurrency(e[0].total_tickets) + ' in tickets';
      detailsView.add(ticketsTotal);

      var feesTotal = Ti.UI.createLabel(orderStyles.feesTotal);
      feesTotal.text = '$' + app.formatCurrency(e[0].total_fees) + ' in fees';
      detailsView.add(feesTotal);

      self.add(detailsView);

      var table = Ti.UI.createTableView(orderStyles.table);
      var tableData = [];    

      for(i=0; i < e.length; i++){
        cart_item = e[i]

        var row = Ti.UI.createTableViewRow(orderStyles.row);

        var projectThumb = Ti.UI.createImageView(orderStyles.projectThumb);
        projectThumb.image = cart_item.project_thumbnail;
        row.add(projectThumb);            

        var title;
        (cart_item.project_title.length >= 30) ? title = cart_item.project_title.substr(0,30) + "..." : title = cart_item.project_title;

        var projectTitle = Ti.UI.createLabel(orderStyles.projectTitle);
        projectTitle.text = title;
        row.add(projectTitle);

        var projectInfo = Ti.UI.createLabel(orderStyles.projectInfo);
        projectInfo.text = cart_item.performance_info + ' \u00B7 $' + app.formatCurrency(cart_item.ticket_price);
        if(cart_item.discount){projectInfo.text += ' \u00B7 ' + cart_item.discount};
        row.add(projectInfo);

        if(Ti.Platform.name == 'iPhone OS'){row.height = row.toImage().height + 8;}

        tableData.push(row);

      }

      table.setData(tableData);
      self.add(table);    
      
      var buttonView = Ti.UI.createView(orderStyles.buttonView);

      payButton = Ti.UI.createButton(orderStyles.payButton);
      buttonView.add(payButton);

      self.add(buttonView);

      self.remove(spinner);
    
      payButton.addEventListener('click', function(e){

        buttonView.remove(payButton);

        var spinner = Ti.UI.createActivityIndicator(styles.spinner);
        spinner.message = '';
        spinner.bottom = 10;
        buttonView.add(spinner);
        spinner.show();

        var cartObj = require('modules/models/cart');
        new cartObj(Ti.App.currentUser.id).purchase(cc_fname, cc_lname, cc_num, expiry_month, expiry_year, csv, function(e){
          if (e.error){
            alert(e.error)
            buttonView.remove(spinner);
            buttonView.add(payButton);
          }
          else{            
            app.openWindow(self, 'Receipt', 'receipt', [e.sale_id]);
            buttonView.remove(spinner);
            buttonView.add(payButton);
          }
        })
      })

    });
  }

  return self;
}

module.exports = OrderWindow;