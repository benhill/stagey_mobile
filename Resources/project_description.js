Ti.include("helper.js");
var projectTab = Ti.UI.currentTab;
var projectWin = Titanium.UI.currentWindow;
var url = "http://www.gwahir.com:3000/api/project_description/" + projectWin.project_id + ".json";
var xhr = Ti.Network.createHTTPClient({
  onload: function(){
    var projectScroll = Titanium.UI.createScrollView({
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
    project = JSON.parse(this.responseText);
    var descriptionLabel = Titanium.UI.createLabel({
      text:project.description,
      height:'auto',
      width:'300',
      left:8,
      top:10,
      font:{fontSize:'12'}
    });    
    wrapper.add(descriptionLabel);
    projectScroll.add(wrapper);
    projectWin.add(projectScroll);
    projectWin.open();
  },
  onerror: function(e) {
    Ti.API.debug("STATUS: " + this.status);
    Ti.API.debug("TEXT:   " + this.responseText);
    Ti.API.debug("ERROR:  " + e.error);
    alert('There was an error retrieving the remote data. Try again.');
  },
  timeout:5000
});
xhr.open("GET", url);
xhr.send();