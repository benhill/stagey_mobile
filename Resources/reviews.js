Ti.include("helper.js");
var table = Ti.UI.createTableView();
var currentWin = Ti.UI.currentWindow;
var currentTab = Ti.UI.currentTab;
var project = currentWin.project;
var url = "http://www.gwahir.com:3000/api/reviews/" + project.id + ".json"
var page = 1
var rows_per_page = 9
var xhr =  Ti.Network.createHTTPClient({
	onload: function(){ 
    var tableData = []
    reviews = JSON.parse(this.responseText).reviews;
    if (reviews.length > 0){
      var total_results = reviews[0].total_results;
    }
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
        text:review.body.substr(0,80).replace(/\n/gm, '').replace(/\r/gm, ' ') + '...',
        height:45,
        left:60,
        top:17,
        width:250,
        font:{fontSize:'11'}
      });
      row.add(blurb);
      tableData.push(row);
      row.addEventListener('click', function(e){
        loadReview(e);
      });      
    };
    var row = Ti.UI.createTableViewRow({
      height:60
    });
    var moreLabel = Ti.UI.createLabel({
      text:"LOAD MORE",
      height:Ti.UI.SIZE,
      width:Ti.UI.SIZE,            
      top:20,        
      left:100,
      font:{fontSize:14, fontWeight:'bold'}
    });
    row.add(moreLabel);
    row.addEventListener('click', function(e){
      page += 1;
      loadMore(e);
    });
    if(page * rows_per_page < total_results){
      tableData.push(row);
    }
    if(page > 1){
      table.deleteRow(rows_per_page * (page-1),{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE})
      for(var i = 0; i < tableData.length; i++){
        table.appendRow(tableData[i]);
      }
      table.scrollToIndex((page * rows_per_page) - rows_per_page);
    }
    else {
      table.setData(tableData);
      currentWin.add(table);
    }    
    currentWin.add(table);
    spinner.hide();
  },
  onerror: function(){
    Ti.API.debug("STATUS: " + this.status);
    Ti.API.debug("TEXT:   " + this.responseText);
    Ti.API.debug("ERROR:  " + e.error);
    alert('There was an error retrieving the remote data. Try again.');
  },
  timeout:5000
});
function loadReview(e, islongclick) { 
  var review = e.rowData.review;
  if (e.rowData.link){
    var reviewWindow = Titanium.UI.createWindow({
      url:e.rowData.link,
      backButtonTitle:'back',
      layout:'vertical',
      title:'Show Review',
      project:project,
      review:review,
      barColor:barColor
    });
  }
  currentTab.open(reviewWindow);
}
function loadMore(e,islongclick){
  table.deleteRow(rows_per_page * (page-1),{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE})
  var row = Ti.UI.createTableViewRow({
    height:60
  });
  var spinner = Ti.UI.createActivityIndicator({
    width:50,
    height:50,      
    message: 'loading...',
    color: 'black',
    style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
  })
  row.add(spinner);
  spinner.show();
  table.appendRow(row);
  table.scrollToIndex((page * rows_per_page) - rows_per_page);
  var url = "http://www.gwahir.com:3000/api/reviews/" + project.id + ".json" + "?page=" + page;
  xhr.open("GET", url);
  xhr.send();
}
xhr.open("GET", url);
xhr.send();
currentWin.add(spinner);
spinner.show();
currentWin.open();