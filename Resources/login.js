Ti.include("helper.js");
currentWin = Ti.UI.currentWindow;
currentTab = Ti.UI.currentTab;
var email = Ti.UI.createTextField({ 
	color:'#336699', 
  height:35, 
  width:300, 
  top:10,
  left:5,
  clearOnEdit:true,
  borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
currentWin.add(email);
var emailLabel = Ti.UI.createLabel({
  text:'email address',
  height:Titanium.UI.SIZE,
  width:Titanium.UI.SIZE,
  font:{fontSize:14},
  left:10,
  top:50
});
currentWin.add(emailLabel);
var password = Ti.UI.createTextField({
  color:'#336699', 
  height:35, 
  width:300, 
  top:80,
  left:5,
  clearOnEdit:true,
  borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  passwordMask:true
});
currentWin.add(password);
password.addEventListener('return', function(e){
  loginUser();
});
var passwordLabel = Ti.UI.createLabel({
  text:'password',
  height:Titanium.UI.SIZE,
  width:Titanium.UI.SIZE,
  font:{fontSize:14},
  left:10,
  top:120
});
currentWin.add(passwordLabel);
var loginButton = Ti.UI.createButton({ 
  title: 'Login',
  top:160,
  left:5
}); 
currentWin.add(loginButton);
loginButton.addEventListener('click',function(e) { 
  Ti.API.info("You clicked the button"); 
});
loginButton.addEventListener('click', function(e){
  loginUser();
});
function loginUser(){
  var url = "http://www.gwahir.com:3000/api/login.json?email=" + email.value + "&password=" + password.value;
  xhr.open("GET", url);
  xhr.send();
}
var xhr = Ti.Network.createHTTPClient({
  onload: function(){
    authenticated = JSON.parse(this.responseText)
    if(authenticated){
      Ti.App.Properties.setBool('authenticated', true);
      Ti.App.Properties.setString('email', email.value);
      Ti.App.Properties.setString('password', 'password.value');
      homeWin = Titanium.UI.createWindow({
        url:'home.js',
        barColor:barColor,
        layout:'vertical'
      });
      currentTab.open(homeWin)
    }
    else {
      alert('login failed');
    }
  },
  onerror: function(e) {
    Ti.API.debug("STATUS: " + this.status);
    Ti.API.debug("TEXT:   " + this.responseText);
    Ti.API.debug("ERROR:  " + e.error);
    alert('There was an error retrieving the remote data. Try again.');
  },
  timeout:5000
})
currentWin.open();