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
        height:'70dp'
      });
      row.link = 'review.js';
      row.review = review;
      var image = Ti.UI.createImageView({
        image:review.reviewer_image_url,
        width:45,
        height:45,
        left:5,
        top:10,
        borderColor:'black',
        borderWidth:1
      });
      row.add(image);
      var nameLabel = Ti.UI.createLabel({
        text:review.reviewer_first_name + " " + review.reviewer_last_name.substr(0,1),
        width:'100%',
        height:45,
        left:60,
        top:-7,
        font:{fontSize:'13', fontWeight:'bold'}
      });
      row.add(nameLabel);
      var date = Ti.UI.createLabel({
        text:review.time_passed + " ago",
        height:45,
        left:225,
        top:-7,
        font:{fontSize:'10'}
      });
      row.add(date);
      var blurb = Ti.UI.createLabel({
        text:review.body.substr(0,80) + '...',
        height:45,
        left:60,
        top:17,
        width:250,
        font:{fontSize:'11'}
      });
      row.add(blurb);
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
reviewsTable.addEventListener('click', function(e){
  showClickEventInfo(e);
});
function showClickEventInfo(e, islongclick) { 
  var review = e.rowData.review;
  if (e.rowData.link){
    var reviewWindow = Titanium.UI.createWindow({
      url:e.rowData.link,
      backButtonTitle:'back',
      layout:'vertical',
      title:project.title,
      review:review
    });
  }
  projectsTab.open(reviewWindow);
}
xhr.open("GET", url);
xhr.send();
reviewsWin.add(reviewsTable);
reviewsWin.open();