var searchWin = Titanium.UI.currentWindow;
var searchTitle = Titanium.UI.createLabel({
  text: "Search Terms",
  height:'auto',
  width:'auto',            
  font:{fontSize:20},
  left:5,
  top:100
});    
searchWin.add(searchTitle);
var searchField = Titanium.UI.createTextField({  
  height:35,
  top:10,
  left:5,
  width:'90%',
  borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
searchWin.add(searchField);
var searchButton =  Ti.UI.createButton({
  title:'search',
  style:Ti.UI.iPhone.SystemButtonStyle.BORDERED,
  height:30,
  width: 80,
  left:5
});
searchWin.add(searchButton);
searchButton.addEventListener('click', function(e){  
  var url = "http://www.gwahir.com:3000/api/search_projects.json?search_terms=" + searchField.value;
  xhr.open("GET", url);
  xhr.send();
});
var xhr = Ti.Network.createHTTPClient({
  onload: function(){     
    projects = JSON.parse(this.responseText).projects;
    projectsWin = Titanium.UI.createWindow({
      url:'projects.js',      
      projects: projects
    });
    searchWin.activeTab.open(projectsWin);
  },
  onerror: function(e) {
    Ti.API.debug("STATUS: " + this.status);
    Ti.API.debug("TEXT:   " + this.responseText);
    Ti.API.debug("ERROR:  " + e.error);
    alert('There was an error retrieving the remote data. Try again.');
  },
  timeout:5000
})