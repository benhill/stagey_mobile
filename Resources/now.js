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
      left:0,
      layout:'vertical'
    });
    for (var i = 0; i < performances.length; i++) {             
      var performance = performances[i];
      var projectThumb = Titanium.UI.createImageView({
        image:performance.project_thumbnail,
        width:45,
        height:45,
        left:5,
        top:10,
        borderColor:'black',
        borderWidth:1,
        project_id:performance.project_id
      });            
      nowView.add(projectThumb);      
      projectThumb.addEventListener('click', function(e){
        openProject(e);
      });
      var projectTitle = Titanium.UI.createLabel({
        text:performance.project_name,
        height:'auto',
        width:'auto',            
        top:-45,  
        left:60,
        font:{fontSize:14}      
      });   
      nowView.add(projectTitle);      
      var projectInfo = Titanium.UI.createLabel({
        text:performance.info,
        height:'auto',
        width:'auto',            
        top:0,  
        left:60,
        font:{fontSize:10}      
      });   
      nowView.add(projectInfo);    
      var mapLabel = Ti.UI.createLabel({
        text: "map",
        top:0,
        left:60,
        font:{fontSize:12},
        height:'auto',
        width:'auto',
        venue_id:performance.venue_id
      });
      nowView.add(mapLabel);
      mapLabel.addEventListener('click', function(e){
        openMap(e);
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

function openProject(e, islongclick){   
  var newWindow = Titanium.UI.createWindow({
    url:"project.js",
    layout:'vertical',
    project_id:e.source.project_id
  });
  nowTab.open(newWindow)  
}

function openMap(e,islongclick){
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
  var venue_url = "http://www.gwahir.com:3000/api/venue/" + e.source.venue_id + ".json";
  venue_xhr.open("GET", venue_url);
  venue_xhr.send();  
}

xhr.open("GET", url);
xhr.send();