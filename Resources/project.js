var win = Titanium.UI.currentWindow;
var url = "http://www.gwahir.com:3000/api/project/" + win.project_id + ".json";
var json, project;
var image_top = 60;
var image_place = 0;

var xhr = Ti.Network.createHTTPClient({
  onload: function(){     
    project = JSON.parse(this.responseText);

    var title = Titanium.UI.createLabel({
      text:project.title,
      height:'auto',
      width:'auto',            
      font:{fontSize:20},
      top:5,
      left:5
    });
    win.add(title);
    
    var subTitle = Titanium.UI.createLabel({
      text:project.company + " \u00B7 ages " + project.age_restriction + "+ \u00B7 " + project.duration + " \u00B7 " + project.cost_range,
      height:'auto',
      width:'auto',            
      font:{fontSize:10},
      top:25,
      left:5
    });
    win.add(subTitle);

    var imageCollection = project.images;        
    for (var i = 0; i < imageCollection.length; i++) {      
      if(i > 0 && i % 6 === 0){image_place = 0;image_top += 50;}
      var img = Ti.UI.createImageView({
        maxZoomScale:5,
        image:project.images[i].thumbnail_path,
        width:45,
        height:45,
        left: image_place * 50 + 5,
        top: image_top
      });
      image_place ++;
      win.add(img);      
    }
    win.open();    
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