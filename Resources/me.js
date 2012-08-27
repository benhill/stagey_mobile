Ti.include("helper.js"); 
var currentUser = JSON.parse(Ti.App.Properties.getString('currentUser'));

var wrapper = Ti.UI.createView({
  height:'100%',
  width:'100%',
  top:0
});

var url = "http://www.gwahir.com:3000/api/user/" + currentUser.id + ".json";

var xhr =  Ti.Network.createHTTPClient({
  onload: function(){
    
    var user = JSON.parse(this.responseText);

    var image = Ti.UI.createImageView({
      image:user.thumbnail_url,
      width:45,
      height:45,
      left:10,
      top:10,
      borderColor:'black',
      borderWidth:1
    });

    image.addEventListener('click', function(e){
      var imageWin = Titanium.UI.createWindow({
        backgroundColor: 'white',
        url: 'image.js',
        image: user.image_url
      });                
      imageWin.open();
    });

    wrapper.add(image);   

    var name = Ti.UI.createLabel({
      text:(currentUser.first_name + " " + currentUser.last_name),
      height:Ti.UI.SIZE,
      width:300,
      left:70,
      top:20,
      font:{fontSize:'14', fontWeight:'bold'}
    });

    wrapper.add(name);

    var profile = Ti.UI.createLabel({
      text:(currentUser.profile ? currentUser.profile : 'No profile information available.'),
      height:Ti.UI.SIZE,
      width:300,
      left:10,
      top:70,
      font:{fontSize:'12'}
    });

    var logoutButton = Ti.UI.createButton({ 
      title: 'Logout',
      top:70,
      left:10,
      width:300
    });

    wrapper.add(logoutButton);

    logoutButton.addEventListener('click', function(e){
      logout();
    });

    currentWin.add(wrapper);
},
  onerror: function(){
    Ti.API.debug("STATUS: " + this.status);
    Ti.API.debug("TEXT:   " + this.responseText);
    Ti.API.debug("ERROR:  " + e.error);
    alert('There was an error retrieving the remote data. Try again.');
  },
  timeout:5000
});

xhr.open("GET", url);
xhr.send();

function logout(){
  Ti.include("helper.js");
  Ti.App.Properties.setString('currentUser', null);
  Ti.App.currentUser = null
  homeWin = Titanium.UI.createWindow({
    url:'home.js',
    barColor:barColor,
    layout:'vertical'
  });
  currentTab.open(homeWin);
}