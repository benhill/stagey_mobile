Ti.include("helper.js");
Ti.App.Properties.setString('email', null);
Ti.App.Properties.setString('password', null);
homeWin = Titanium.UI.createWindow({
  url:'home.js',
  barColor:barColor,
  layout:'vertical'
});
currentTab.open(homeWin);