Ti.include("helper.js");
var reviewsTable = Ti.UI.createTableView();
var reviewsData = []
var reviewsWin = Ti.UI.currentWindow;
var projectsTab = Ti.UI.currentTab;
var project = reviewsWin.project;
var url = "http://www.gwahir.com:3000/api/reviews/" + project.id + ".json"
var xhr =  Ti.Network.createHTTPClient({
	onload: function(){    
    reviews = JSON.parse(this.responseText).reviews;    
    for(i = 0; i < reviews.length; i++){
      review = reviews[i];
      var row = Ti.UI.createTableViewRow({
        height:'60dp'
      });
      var nameLabel = Ti.UI.createLabel({
        text: review.reviewer_name,
        width:'100%',
        height:45,
        left:5,
        top:10,
      });
      row.add(nameLabel);
      reviewsData.push(row);
    };
    reviewsTable.setData(reviewsData);
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
reviewsWin.add(reviewsTable);
reviewsWin.open();