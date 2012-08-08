Ti.include("helper.js");
var projectTab = Ti.UI.currentTab;
var userWin = Ti.UI.currentWindow;
var userScroll = Titanium.UI.createScrollView({
    contentWidth:'auto',
    contentHeight:'auto',
    touchEnabled:true,
    scrollType:'vertical',
    verticalBounce:true,
    showVerticalScrollIndicator:true,
    width:'auto',
    height:350,
    top:0
});
var wrapper = Ti.UI.createView({
  height:'auto',
  width:'auto',
  top:0
});
var url = "http://www.gwahir.com:3000/api/user/" + userWin.user_id + ".json";
var xhr =  Ti.Network.createHTTPClient({
  onload: function(){    
    var user = JSON.parse(this.responseText);
  	var image = Ti.UI.createImageView({
  	  image:user.thumbnail_url,
  	  width:45,
  	  height:45,
  	  left:5,
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
  	var profile = Ti.UI.createLabel({
  	  text:(user.profile ? user.profile : 'No profile information available.'),
  	  height:'auto',
  	  width:'245',
  	  left:65,
  	  top:10,
  	  font:{fontSize:'11'}
  	});
  	wrapper.add(profile);
  	userScroll.add(wrapper);
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
userWin.add(userScroll);
userWin.open();