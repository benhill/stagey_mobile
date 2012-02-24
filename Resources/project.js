var win = Titanium.UI.currentWindow;
var url = "http://www.gwahir.com:3000/api/project/" + Titanium.UI.currentWindow.project_id + ".json"

var xhr = Ti.Network.createHTTPClient({
  onload: function(){

    project = JSON.parse(this.responseText);

    var projectImage = Titanium.UI.createImageView({
      image:project.image_url
    })

    win.add(projectImage);

    var title = Titanium.UI.createLabel({
      id:'font_label_test',
      text:project.title,
      top:0,
      height:170,
      textAlign:'center'
    });

    win.add(title);

    var company = Titanium.UI.createLabel({
      id:'font_label_test',
      text:project.company,
      top:15,
      height:170,
      textAlign:'center'
    });

    win.add(company);

    win.open();
  },
  timeout:5000
});

xhr.open("GET", url);
xhr.send();