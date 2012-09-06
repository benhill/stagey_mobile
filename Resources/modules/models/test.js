function Test(){

  this.test_alert = function(){
    alert('foo');
  };


};

this.alert_me = function(){
  return this.test_alert();
};

 
module.exports = Test;