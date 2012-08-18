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
      width:'95%',       
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
          image:e.source.full_image_path,
          barColor:barColor
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
          url:'gallery.js',
          barColor:barColor
        });
        projectTab.open(galleryWin);
      });
    }
    var descriptionLabel = Ti.UI.createLabel({
      text:project.description + ' (read more)',
      top:15,
      bottom:7,
      left:5,
      font:{fontSize:10},
      height:'auto',
      width: '95%'
    });
    projectScroll.add(descriptionLabel);
    descriptionLabel.addEventListener('click', function(e){
      var descWin = Ti.UI.createWindow({
        title:project.title,
        backgroundColor:'white',
        url:'project_description.js',
        project_id:project.id,
        barColor:barColor
      });
      projectTab.open(descWin);
    });
    var line = Ti.UI.createView({
      width:320,
      height:1,
      top:5,
      backgroundColor:'gray'
    });
    projectScroll.add(line);
    var icons = [];
    var left = 0;
    var buy_ticket = new Icon('Buy Ticket', 'icons/purchase_24.png', 'performances.js', project);
    icons.push(buy_ticket);
    var add_review = new Icon('Add Review', 'icons/reviews_24.png', 'add_review.js', project);
    icons.push(add_review);
    var make_favorite = new Icon('Make Favorite', 'icons/favorite_24.png', 'make_favorite.js', project);
    icons.push(make_favorite);    
    var iconsView = Ti.UI.createView({
      top:0,
      left:0,
      height:60,
      layout:'absolute'
    });
    for(var i = 0; i < icons.length; i++){
      icon = icons[i];
      var iconView = Ti.UI.createView({
        left:left,
        width:100,
        height:35,
        layout:'vertical',
        window:icon.window,
        object:icon.object,
        text:icon.text
      });
      var iconImage = Ti.UI.createImageView({
        image:icon.image,
        height:24,
        width:24,
        top:0,
        window:icon.window,
        object:icon.object,
        text:icon.text
      });
      iconView.add(iconImage);
      var iconText = Ti.UI.createLabel({
        text:icon.text,
        height:'auto',
        width:100,
        font:{fontSize:10},
        left:0,
        top:5,
        textAlign:'center',
        window:icon.window,
        object:icon.object,
        text:icon.text
      });
      iconView.add(iconText);
      iconView.addEventListener('click', function(e){        
       runIconEvent(e)
      })
      iconsView.add(iconView);
      left += 100; 
    }
    function runIconEvent(e, islongclick){ 
      var newWindow = Titanium.UI.createWindow({
        title:e.source.text,
        backgroundColor:'#fff',
        url:e.source.window,
        object:e.source.object,
        barColor:barColor
      });  
      projectTab.open(newWindow);
    }
    projectScroll.add(iconsView);
    var line = Ti.UI.createView({
      width:320,
      height:1,
      top:5,
      backgroundColor:'gray'
    });
    projectScroll.add(line);
    var reviewView = Ti.UI.createView({      
      width:320,
      height:60,
      top:5
    });
    var reviewUserThumb = Ti.UI.createImageView({
      width:45,
      height:45,
      image:project.top_review_user_thumbnail_path,
      left:5,
      top:8
    });
    reviewView.add(reviewUserThumb);
    var reviewsLabel = Ti.UI.createLabel({
      text:"View All Reviews",
      font:{fontSize:14},
      left:60,
      top:5,
      height:'auto',
      width:'95%'
    });
    reviewView.add(reviewsLabel);
    var reviewsLabel = Ti.UI.createLabel({
      text:'\"' + project.top_review_blurb + '\"',
      font:{fontSize:10},
      left:60,
      top:23,
      height:'auto',
      width:250
    });
    reviewView.add(reviewsLabel);
    projectScroll.add(reviewView);
    reviewView.addEventListener('click', function(e){
      reviewsWin = Ti.UI.createWindow({        
        title:project.title,
        url:'reviews.js',
        backgroundColor:'white',
        project:project,
        barColor:barColor
      });
      projectTab.open(reviewsWin);
    });
    var line = Ti.UI.createView({
      width:320,
      height:1,
      top:5,
      backgroundColor:'gray'
    });
    projectScroll.add(line);
    var teamView = Ti.UI.createView({      
      width:320,
      height:60,
      top:5
    });
    var teamThumb = Ti.UI.createImageView({
      width:45,
      height:45,
      image:project.fringe_user.picture_url,
      left:5,
      top:8
    });
    teamView.add(teamThumb);
    var teamLabel = Ti.UI.createLabel({
      text:"View Project Team",
      font:{fontSize:14},
      left:60,
      top:5,
      height:'auto',
      width:'95%'
    });
    teamView.add(teamLabel);
    var teamLabel = Ti.UI.createLabel({
      text:'including ' + project.fringe_user.full_name,
      font:{fontSize:10},
      left:60,
      top:23,
      height:'auto',
      width:250
    });
    teamView.add(teamLabel);
    projectScroll.add(teamView);
    teamView.addEventListener('click', function(e){
      reviewsWin = Ti.UI.createWindow({        
        title:project.title,
        url:'users.js',
        backgroundColor:'white',
        users:project.team,
        barColor:barColor
      });
      projectTab.open(reviewsWin);
    });
    function loadIconWin(e, islongclick){ 
      var newWindow = Titanium.UI.createWindow({
        title:e.source.text,
        backgroundColor:'#fff',
        url:e.source.window,
        barColor:barColor
      });  
      currentTab.open(newWindow);
    }
    var line = Ti.UI.createView({
      width:320,
      height:1,
      top:5,
      backgroundColor:'gray'
    });
    projectScroll.add(line);
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