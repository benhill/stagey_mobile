function ReceiptWindow(sale_id){

  var styles = require('modules/styles/styles');
  var receiptStyles = require('modules/styles/receipt');
  var self = Ti.UI.createWindow(styles.defaultWindow);


  self.load = function(){
    
    var saleObj = require('modules/models/sale');
    new saleObj(sale_id, function(sale){

      var detailsView = Ti.UI.createView(receiptStyles.detailsView);

      var cartTotal = Ti.UI.createLabel(receiptStyles.cartTotal);
      cartTotal.text = 'Total Order: $' + app.formatCurrency(sale.total_paid);
      detailsView.add(cartTotal);

      var ticketsTotal = Ti.UI.createLabel(receiptStyles.ticketsTotal);
      ticketsTotal.text = '$' + app.formatCurrency(sale.ticket_total) + ' in tickets';
      detailsView.add(ticketsTotal);

      var feesTotal = Ti.UI.createLabel(receiptStyles.feesTotal);
      feesTotal.text = '$' + app.formatCurrency(sale.service_fees) + ' in fees';
      detailsView.add(feesTotal);

      self.add(detailsView);

      var table = Ti.UI.createTableView(receiptStyles.table);
      var tableData = [];    

      for(i=0; i < sale.tickets.length; i++){
        ticket = sale.tickets[i]

        var row = Ti.UI.createTableViewRow(receiptStyles.row);

        var projectThumb = Ti.UI.createImageView(receiptStyles.projectThumb);
        projectThumb.image = ticket.project_thumbnail
        row.add(projectThumb);            

        var title;
        (ticket.project_title.length >= 30) ? title = ticket.project_title.substr(0,30) + "..." : title = ticket.project_title;

        var projectTitle = Ti.UI.createLabel(receiptStyles.projectTitle);
        projectTitle.text = title;
        row.add(projectTitle);

        var projectInfo = Ti.UI.createLabel(receiptStyles.projectInfo);
        projectInfo.text = ticket.performance_info + ' \u00B7 $' + app.formatCurrency(ticket.cost);
        if(ticket.discount){projectInfo.text += ' \u00B7 ' + ticket.discount};
        row.add(projectInfo);

        row.height = row.toImage().height + 8;       

        tableData.push(row);
      }

      table.setData(tableData);
      self.add(table);
    })
  }

  return self;
}

module.exports = ReceiptWindow;