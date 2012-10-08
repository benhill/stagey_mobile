function Cart(user_id){
  this.user_id = user_id;
};

Cart.prototype.add_to_cart = function(performance_id, quantity, pwyc_price, callback) {
  url = app.api_url + 'add_to_cart?user_id=' + this.user_id + '&performance_id=' + performance_id + '&quantity=' + quantity + '&email=' + Ti.App.currentUser.email + '&password=' + Ti.App.userPassword;
  if(pwyc_price){url += '&pwyc_price=' + pwyc_price}

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

Cart.prototype.get = function(callback) {
  url = app.api_url + 'cart_contents/' + this.user_id + '?email=' + Ti.App.currentUser.email + '&password=' + Ti.App.userPassword;

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

Cart.prototype.apply_discount_code = function(code_name, callback) {
  url = app.api_url + 'apply_discount_code?user_id=' + this.user_id + '&code_name=' + code_name + '&email=' + Ti.App.currentUser.email + '&password=' + Ti.App.userPassword

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

Cart.prototype.purchase = function(cc_first_name, cc_last_name, cc_number, cc_month, cc_year, csv, callback) {  
  url = app.api_url + 'purchase_tickets?user_id=' + this.user_id + '&cc_first_name=' + cc_first_name + '&cc_last_name=' + cc_last_name + '&cc_number=' + cc_number + '&cc_month=' + cc_month + '&cc_year=' + cc_year + '&csv=' + csv + '&email=' + Ti.App.currentUser.email + '&password=' + Ti.App.userPassword

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