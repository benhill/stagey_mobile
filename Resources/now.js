var url = "http://www.gwahir.com:3000/api/performances/7.json";

var nowWin = Titanium.UI.currentWindow;

var nowTab = Titanium.UI.currentTab;

var nowScroll = Titanium.UI.createScrollView({
  contentWidth:'auto',
  contentHeight:1100,
  top:0,
  height:800,
  showVerticalScrollIndicator:true,
  showHorizontalScrollIndicator:true,
  layout:'vertical'
});

var xhr = Ti.Network.createHTTPClient({
  onload: function(){      
    var performances = JSON.parse(this.responseText).performances;
    var nowView = Ti.UI.createView({        
      width:'auto',
      height:2000,
      top:0,
      layout:'vertical'        
    });
    for (var i = 0; i < performances.length; i++) {       
      var performance = performances[i];
      var projectTitle = Titanium.UI.createLabel({
        text:performance.project_name,
        height:'auto',
        width:'auto',            
        top:10,  
        left:5,
        font:{fontSize:14}      
      });   
      nowView.add(projectTitle);
      var projectInfo = Titanium.UI.createLabel({
        text:performance.info,
        height:'auto',
        width:'auto',            
        top:0,  
        left:5,
        font:{fontSize:10}      
      });   
      nowView.add(projectInfo);    
      var mapLabel = Ti.UI.createLabel({
        text: "map",
        top:0,
        left:5,
        font:{fontSize:12},
        height:'auto',
        width: '95%'
      });
      nowView.add(mapLabel);

      mapLabel.addEventListener('click', function(e){
        var venue_xhr = Ti.Network.createHTTPClient({
          onload: function(){     
            var venue = JSON.parse(this.responseText);  
            var mapWin = Titanium.UI.createWindow({
              backgroundColor:'white',
              venue_id: venue.id,
              url:'map.js',
              venue:venue
            });              
            nowTab.open(mapWin);
          },
          onerror: function(e) {
            Ti.API.debug("STATUS: " + this.status);
            Ti.API.debug("TEXT:   " + this.responseText);
            Ti.API.debug("ERROR:  " + e.error);
          },
          timeout:5000
        });
        var venue_url = "http://www.gwahir.com:3000/api/venue/" + performance.venue_id + ".json";
        venue_xhr.open("GET", venue_url);
        venue_xhr.send();  
      });              
    }

    nowScroll.add(nowView);
    nowWin.add(nowScroll);
    nowWin.open();    
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