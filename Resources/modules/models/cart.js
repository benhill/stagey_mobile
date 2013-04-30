var app = require('modules/core');

function Cart(user_id){
  this.user_id = user_id;
};

Cart.prototype.add_to_cart = function(performance_id, quantity, pwyc_price, callback) {
  url = Ti.App.api_url + 'add_to_cart?user_id=' + this.user_id + '&performance_id=' + performance_id + '&quantity=' + quantity;
  if(pwyc_price){url += '&pwyc_price=' + pwyc_price}

  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout, enableKeepAlive:false
  });

  xhr.onload = function(){
    callback(JSON.parse(this.responseText));
  };

  xhr.onerror = function(e){
    app.throwError(this, e);
  };

  xhr.open('POST', url);
  xhr.send({'token': Ti.App.token});
};

Cart.prototype.get = function(callback) {
  url = Ti.App.api_url + 'cart_contents/' + this.user_id;

  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout, enableKeepAlive:false
  });

  xhr.onload = function(){
    callback(JSON.parse(this.responseText).contents);
  };

  xhr.onerror = function(e){
    app.throwError(this, e);
  };

  xhr.open('POST', url);
  xhr.send({'token': Ti.App.token});
};

Cart.prototype.apply_discount_code = function(code_name, callback) {
  url = Ti.App.api_url + 'apply_discount_code?user_id=' + this.user_id + '&code_name=' + code_name;

  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout, enableKeepAlive:false
  });

  xhr.onload = function(){
    callback(JSON.parse(this.responseText));
  };

  xhr.onerror = function(e){
    app.throwError(this, e);
  };

  try{
    xhr.open('POST', url);
    xhr.send({'token': Ti.App.token});}
  catch(e){};
};

Cart.prototype.purchase = function(cc_first_name, cc_last_name, cc_number, cc_month, cc_year, csv, subscribe, callback) {
  if(Ti.Platform.name == 'iPhone OS'){source = "iphone";}
  else{source = "android"}

  url = Ti.App.secure_api_url + 'purchase_tickets?user_id=' + this.user_id + '&source=' + source + '&subscribe=' + subscribe;

  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout, enableKeepAlive:false
  });

  xhr.onload = function(){
    callback(JSON.parse(this.responseText));
  };

  xhr.onerror = function(e){
    app.throwError(this, e);
  };

  try{
    xhr.open('POST', url);
    xhr.send({ "cc_first_name": cc_first_name, "cc_last_name": cc_last_name, "cc_number": cc_number, "cc_month": cc_month, "cc_year": cc_year, "csv": csv, "token": Ti.App.token});}
  catch(e){};
};

module.exports = Cart;