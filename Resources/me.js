Ti.include("helper.js");

var logoutButton = Ti.UI.createButton({ 
  title: 'Logout',
  top:40,
  left:10,
  width:300
}); 

currentWin.add(logoutButton);

logoutButton.addEventListener('click', function(e){
  logout();
});

function logout(){
  Ti.include("helper.js");
  Ti.App.Properties.setString('email', null);
  Ti.App.Properties.setString('password', null);
  homeWin = Titanium.UI.createWindow({
    url:'home.js',
    barColor:barColor,
    layout:'vertical'
  });
  currentTab.open(homeWin);
}