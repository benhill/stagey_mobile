var projectWin = Titanium.UI.currentWindow;
var url = "http://www.gwahir.com:3000/api/project/" + projectWin.project_id + ".json";
var json, project;
var image_top = 0;
var image_place = 0;
var xhr = Ti.Network.createHTTPClient({
  onload: function(){     
    var projectScroll = Titanium.UI.createScrollView({
      contentWidth:'auto',
      contentHeight:1100,
      top:0,
      height:800,
      showVerticalScrollIndicator:true,
      showHorizontalScrollIndicator:true,
      layout:'vertical'
    });
    project = JSON.parse(this.responseText);
    var title = Titanium.UI.createLabel({
      text:project.title,
      height:'auto',
      width:'auto',            
      font:{fontSize:20},
      left:5
    });    
    projectScroll.add(title);
    var subTitle = Titanium.UI.createLabel({
      text:project.company + " \u00B7 ages " + project.age_restriction + "+ \u00B7 " + project.duration + " \u00B7 " + project.cost_range,
      height:'auto',
      width:'auto',            
      left:5,
      font:{fontSize:10}      
    });
    projectScroll.add(subTitle);
    var galleryView = Ti.UI.createView({
      height:'auto',
      width:'auto',
      top:5,
      left:5   
    });
    var imageCollection = project.images;        
    for (var i = 0; i < imageCollection.length; i++) {      
      if(i > 0 && i % 6 === 0){image_place = 0;image_top += 50;}
      var img = Ti.UI.createImageView({
        maxZoomScale:5,
        image: project.images[i].thumbnail_path,
        width: 45,
        height: 45,
        left: image_place * 50,
        top: image_top,
        layout:'absolute',
        full_image_path: project.images[i].image_path
      });
      image_place ++;
      galleryView.add(img);            
      img.addEventListener('click', function(e){
        var imageWin = Titanium.UI.createWindow({
          backgroundColor: 'white',
          url: 'image.js',
          image: e.source.full_image_path
        });                
        imageWin.open();
      });
    }    
    projectScroll.add(galleryView);
    var description = Ti.UI.createLabel({
      text: project.description,
      top:5,
      left:5,
      font:{fontSize:10},
      height:'auto',
      width: '95%'
    });
    projectScroll.add(description);
    var performances = Ti.UI.createView({
      top:10,
      layout:'vertical'
    });
    var last_space;
    for (var i = 0; i < project.performances.length; i++) {      
      var performance = project.performances[i];
      var spaceLabel = Ti.UI.createLabel({
        text:performance.venue + " (" + performance.space + ")",
        font:{fontSize:10, fontWeight:'bold'},
        height:'auto',
        width: '95%',
        top:5
      });
      if(performance.space != last_space){performances.add(spaceLabel)}
      var performanceLabel = Ti.UI.createLabel({
        text:performance.date + "@" + performance.time + " \u00B7 " + performance.cost + " \u00B7 " + performance.duration, 
        font:{fontSize:10},
        height:'auto',
        width:'95%',
        top:5
      });      
      performances.add(performanceLabel);
      last_space = performance.space;
    }    
    projectScroll.add(performances);
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