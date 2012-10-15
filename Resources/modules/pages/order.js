function OrderWindow(title, containingTab, cc_num, cc_fname, cc_lname, csv, expiry_month, expiry_year){

  var styles = require('modules/styles/styles');
  var orderStyles = require('modules/styles/order');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;

  var cartObj = require('modules/models/cart');

  new cartObj(Ti.App.currentUser.id).get(function(e){

    var detailsView = Ti.UI.createView(orderStyles.detailsView);

    var cartTotal = Ti.UI.createLabel(orderStyles.cartTotal);
    cartTotal.text = 'Total Order: $' + app.formatCurrency(e[0].total_cart);
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
      projectInfo.text = cart_item.performance_info;
      row.add(projectInfo);

      var costLabel = Ti.UI.createLabel(orderStyles.costLabel);
      costLabel.text = '$' + app.formatCurrency(cart_item.ticket_price);
      if(cart_item.discount){costLabel.text += ' \u00B7 ' + cart_item.discount};
      row.add(costLabel);

      tableData.push(row);
    }

    table.setData(tableData);
    self.add(table);

    var payButton = Ti.UI.createButton(orderStyles.payButton);    
    self.add(payButton);
  
    payButton.addEventListener('click', function(e){
      var cartObj = require('modules/models/cart');
      new cartObj(Ti.App.currentUser.id).purchase(cc_fname, cc_lname, cc_num, expiry_month, expiry_year, csv, function(e){
        if (e.error){
          alert(e.error)
        }
        else{
          params = ['Receipt', containingTab, e.sale_id];
          app.openWindow('receipt', containingTab, params);
        }
      })
    })

  });

  return self;
}

module.exports = OrderWindow;