Ti.include("helper.js");
var projectTab = Ti.UI.currentTab;
var projectWin = Titanium.UI.currentWindow;
var url = "http://www.gwahir.com:3000/api/project/" + projectWin.project_id + ".json";
var json, project;
var image_place = 0;
var xhr = Ti.Network.createHTTPClient({
  onload: function(){    
    var projectScroll = Titanium.UI.createScrollView({
      contentWidth:'95%',
      contentHeight:1100,
      top:5,
      left:0,
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
    var imageCollection = project.images.slice(0,4);
    for (var i = 0; i < imageCollection.length; i++) {      
      if(i > 0 && i % 6 === 0){image_place = 0;}
      var img = Ti.UI.createImageView({
        maxZoomScale:5,
        image: imageCollection[i].thumbnail_path,
        width:70,
        height:70,
        left:image_place * 77,        
        layout:'absolute',
        full_image_path: imageCollection[i].image_path,
        borderRadius:10,
        borderWidth:0
      });
      image_place ++;
      galleryView.add(img);            
      img.addEventListener('click', function(e){
        var imageWin = Titanium.UI.createWindow({
          backgroundColor:'white',
          url:'image.js',
          image:e.source.full_image_path
        });                
        imageWin.open();
      });
    }
    projectScroll.add(galleryView);
    var moreImagesLabel = Ti.UI.createLabel({
      top:9,
      left:220,
      text:'more images',
      width:'auto',
      height:'auto',
      font:{fontSize:14}
    }); 
    if(project.images.length > 4){
      projectScroll.add(moreImagesLabel);
      moreImagesLabel.addEventListener('click', function(e){
        galleryWin = Ti.UI.createWindow({
          images:project.images,
          title:project.title,
          backgroundColor:'white',
          url:'gallery.js'
        });
        projectTab.open(galleryWin);
      });
    }
    var descriptionLabel = Ti.UI.createLabel({
      text:project.description,
      top:10,
      bottom:10,
      left:5,
      font:{fontSize:10},
      height:'auto',
      width: '95%'
    });
    projectScroll.add(descriptionLabel);
    performancesLabel = Ti.UI.createLabel({
      text:"View Performances",
      top:10,
      left:5,
      font:{fontSize:14},
      height:'auto',
      width:'95%'
    });        
    projectScroll.add(performancesLabel);    
    performancesLabel.addEventListener('click', function(e){
      perfWin = Titanium.UI.createWindow({
        title:project.title,
        backgroundColor:'white',
        url:'performances.js',
        project:project
      });
      projectTab.open(perfWin);
    });    
    var reviewsLabel = Ti.UI.createLabel({
      text:"View Reviews",
      font:{fontSize:14},
      left:5,
      top:10,
      height:'auto',
      width:'95%'
    });
    projectScroll.add(reviewsLabel);
    reviewsLabel.addEventListener('click', function(e){
      reviewsWin = Ti.UI.createWindow({        
        title:project.title,
        url:'reviews.js',
        backgroundColor:'white',
        project:project
      });
      projectTab.open(reviewsWin);
    });
    var teamLabel = Ti.UI.createLabel({
      text:"Project Team",
      font:{fontSize:14},
      left:5,
      top:10,
      height:'auto',
      width:'95%'
    });
    projectScroll.add(teamLabel);
    teamLabel.addEventListener('click', function(e){
      reviewsWin = Ti.UI.createWindow({        
        title:project.title,
        url:'users.js',
        backgroundColor:'white',
        users:project.team
      });
      projectTab.open(reviewsWin);
    });
    var tagsList = 'tagged under:\n'
    for(i=0;i < project.tags.length;i++){
      tagsList += project.tags[i].name;
      if(i != project.tags.length-1){tagsList +=  ' ' + String.fromCharCode(183) + ' '}
    }
    var tagsLabel = Ti.UI.createLabel({
      text:tagsList,
      height:'auto',
      width:'auto',
      top:10,
      left:5,
      font:{fontSize:10}
    })    
    projectScroll.add(tagsLabel);
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