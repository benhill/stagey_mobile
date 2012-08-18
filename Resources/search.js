Ti.include("helper.js");
var searchWin = Titanium.UI.currentWindow;
var currentTab = Titanium.UI.currentTab;
var xhr = Ti.Network.createHTTPClient({
  onload: function(){    
    projects = JSON.parse(this.responseText).projects;
    projectsWin = Titanium.UI.createWindow({
      url:'projects.js',      
      projects: projects,
      barColor:barColor
    });    
    currentTab.open(projectsWin);
  },
  onerror: function(e) {
    Ti.API.debug("STATUS: " + this.status);
    Ti.API.debug("TEXT:   " + this.responseText);
    Ti.API.debug("ERROR:  " + e.error);
    alert('There was an error retrieving the remote data. Try again.');
  },
  timeout:5000
})
var searchField = Titanium.UI.createTextField({  
  height:35,
  top:10,
  left:5,
  width:'85%',
  borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
  value:default_search_text,
  clearOnEdit:true,
  color:'gray'
});
searchField.addEventListener('return', function(e){
  runSearch(searchField.value);
});
searchField.addEventListener('focus', function(e){
  e.source.color = 'black'
});
searchWin.add(searchField);
var searchButton =  Ti.UI.createImageView({
  image:'icons/search_24.png',
  width:24,
  height:24,
  top:12,    
  left:285
});
searchWin.add(searchButton);
if(searchWin.search_terms){
  searchField.value = searchWin.search_terms;
  searchField.color = 'black';
  runSearch(searchWin.search_terms);
}
searchButton.addEventListener('click', function(e){  
  runSearch(searchField.value);
});
function runSearch(terms){
  var url = "http://www.gwahir.com:3000/api/search_projects.json?search_terms=" + terms;
  xhr.open("GET", url);
  xhr.send();
}