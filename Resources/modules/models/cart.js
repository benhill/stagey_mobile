function Cart(user_id){
  this.user_id = user_id;
};

Cart.prototype.add_to_cart = function(performance_id, quantity, callback) {

  url = app.api_url + 'add_to_cart?user_id=' + this.user_id + '&performance_id=' + performance_id + '&quantity=' + quantity

  var xhr = Ti.Network.createHTTPClient({
    timeout: 15000
  });

  xhr.onload = function(){    
    callback(this.responseText);
  };

  xhr.onerror = function(){ 
    Ti.API.info('Error');
  };

  xhr.open('GET', url);
  xhr.send();  
};

Cart.prototype.get = function(callback) {
  url = app.api_url + 'cart_contents/' + this.user_id

  var xhr = Ti.Network.createHTTPClient({
    timeout: 15000
  });

  xhr.onload = function(){    
    callback(JSON.parse(this.responseText).contents);
  };

  xhr.onerror = function(){ 
    Ti.API.info('Error');
  };

  xhr.open('GET', url);
  xhr.send();  
};

Cart.prototype.purchase = function(cc_first_name, cc_last_name, cc_number, cc_month, cc_year, csv, callback) {  
  url = app.api_url + 'purchase_tickets?user_id=' + this.user_id + '&cc_first_name=' + cc_first_name + '&cc_last_name=' + cc_last_name + '&cc_number=' + cc_number + '&cc_month=' + cc_month + '&cc_year=' + cc_year + '&csv=' + csv

  var xhr = Ti.Network.createHTTPClient({
    timeout: 15000
  });

  xhr.onload = function(){    
    callback(JSON.parse(this.responseText));
  };

  xhr.onerror = function(){ 
    Ti.API.info('Error');
  };

  xhr.open('GET', url);
  xhr.send();  
};
 
module.exports = Cart;