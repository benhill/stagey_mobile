Ti.include("helper.js");
var usersWin = Ti.UI.currentWindow;
var projectsTab = Ti.UI.currentTab;
var users = usersWin.users;
var usersTable = Ti.UI.createTableView();
var usersData = [];
for(i = 0; i < users.length; i++){
  user = users[i];
  var row = Ti.UI.createTableViewRow({
    height:'60dp'
  });
  row.link = 'user.js';
  row.user = user;
  var image = Ti.UI.createImageView({
    image:user.image_url,
    width:45,
    height:45,
    left:5,
    top:10,
    borderColor:'black',
    borderWidth:1
  });
  row.add(image);
  var nameLabel = Ti.UI.createLabel({
    text:user.first_name + ' ' + user.last_name,
    width:'100%',
    height:45,
    left:60,
    top:-7,
    font:{fontSize:'13', fontWeight:'bold'}
  });
  row.add(nameLabel);
  var roleLabel = Ti.UI.createLabel({
    text:user.role,
    width:'100%',
    height:45,
    left:60,
    top:10,
    font:{fontSize:'13'}
  });
  row.add(roleLabel);
  usersData.push(row);
}
usersTable.addEventListener('click', function(e){  
  showClickEventInfo(e);
});
function showClickEventInfo(e, islongclick) { 
  var user = e.rowData.user;
  if (e.rowData.link){
    var userWin = Titanium.UI.createWindow({
      url:e.rowData.link,
      backButtonTitle:'back',
      layout:'vertical',
      title:user.first_name + ' ' + user.last_name,
      user_id:user.id
    });
  }
  projectsTab.open(userWin);
}
usersTable.setData(usersData);
usersWin.add(usersTable);
usersWin.open();