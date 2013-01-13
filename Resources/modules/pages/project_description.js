function ProjectDescriptionWindow(project_id){

  var app = require('modules/core');
  var styles = require('modules/styles/styles');
  var descStyles = require('modules/styles/project_description');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var url = app.api_url + "project_description/" + project_id;

  self.load = function(){

    var xhr = Ti.Network.createHTTPClient({
      onload: function(){

        project = JSON.parse(this.responseText);

        var projectScroll = Titanium.UI.createScrollView(descStyles.projectScroll);

        var wrapper = Ti.UI.createView(descStyles.wrapper);

        var titleLabel = Titanium.UI.createLabel(descStyles.titleLabel);    
        titleLabel.text = project.title;
        wrapper.add(titleLabel);

        var line = Ti.UI.createView(descStyles.line);
        wrapper.add(line);      

        var descriptionLabel = Titanium.UI.createLabel(descStyles.descriptionLabel);    
        descriptionLabel.text = project.description;
        wrapper.add(descriptionLabel);

        projectScroll.add(wrapper);

        self.add(projectScroll);

        self.remove(spinner);

      },
      onerror: function(e) {
        Ti.API.debug("STATUS: " + this.status);
        Ti.API.debug("TEXT:   " + this.responseText);
        Ti.API.debug("ERROR:  " + e.error);
        alert('There was an error retrieving the remote data. Try again.');
      },
      timeout:5000

    });

    spinner.show();
    self.add(spinner);

    xhr.open("GET", url);
    xhr.send();
  }

  return self;
}

module.exports = ProjectDescriptionWindow;