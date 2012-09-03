function VenueWindow(title, containingTab, venue_id){

  var styles = require('modules/styles/styles');
  var venueStyles = require('modules/styles/venue')

  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var url = "http://www.gwahir.com:3000/api/venue/" + venue_id + ".json?event_id=7";
  var json, venue;
  var image_top = 0;
  var image_place = 0;

  var xhr = Ti.Network.createHTTPClient({
    onload: function(){     

      venue = JSON.parse(this.responseText);

      var venueScroll = Titanium.UI.createScrollView(venueStyles.venueScroll);

      var name = Titanium.UI.createLabel(venueStyles.name);
      name.text = venue.name;
      venueScroll.add(name);

      var presenter = Ti.UI.createLabel(venueStyles.presenter);
      presenter.text = "presented by " + venue.presenter;
      if(venue.presenter){venueScroll.add(presenter)};

      var galleryView = Ti.UI.createView(venueStyles.galleryView);    

      var imageCollection = venue.images.slice(0,4);

      for (var i = 0; i < imageCollection.length; i++) {

        if(i > 0 && i % 6 === 0){image_place = 0;image_top += 50;}

        var img = Ti.UI.createImageView(venueStyles.img);
        img.image = venue.images[i].thumbnail_path;
        img.left = image_place * 77;
        img.top = image_top;
        img.full_image_path = venue.images[i].image_path;
        image_place ++;

        galleryView.add(img);            

        img.addEventListener('click', function(e){
          var imageObj = require('modules/pages/image');
          var imageWindow = new imageObj(containingTab, e.source.full_image_path);
          containingTab.open(imageWindow);

        });

      } 

      venueScroll.add(galleryView);

      var moreImagesLabel = Ti.UI.createLabel(venueStyles.moreImagesLabel);

      if(venue.images.length > 4){

        venueScroll.add(moreImagesLabel);

        moreImagesLabel.addEventListener('click', function(e){

          galleryWin = Ti.UI.createWindow({
            images:venue.images,
            title:venue.title,
            backgroundColor:'white',
            url:'gallery.js'
          });

          venuesTab.open(galleryWin);

        });
      }

      var description = Ti.UI.createLabel(venueStyles.description);
      description.text = venue.description;
      venueScroll.add(description);

      var line = Ti.UI.createView(venueStyles.line);
      venueScroll.add(line);

      var mapView = Ti.UI.createView(venueStyles.mapView);

      var mapLabel = Ti.UI.createLabel(venueStyles.mapLabel);      
      mapView.add(mapLabel);

      var address = Ti.UI.createLabel(venueStyles.address);
      address.text = venue.address + "\n" + venue.city + ", " + venue.state + " " + venue.postal;
      mapView.add(address);

      venueScroll.add(mapView);

      mapView.addEventListener('click', function(e){
        var mapObj = require('modules/pages/map');
        var mapWindow = new mapObj('project', containingTab, venue)
        containingTab.open(mapWindow);
      });

      var line = Ti.UI.createView(venueStyles.line);
      venueScroll.add(line);

      if(venue.number_of_shows > 0){

        var projectsView = Ti.UI.createView(venueStyles.projectsView);

        var projectThumb = Ti.UI.createImageView(venueStyles.projectThumb);
        projectThumb.image = venue.random_show_image_url;
        projectsView.add(projectThumb);

        var projectLabel = Ti.UI.createLabel(venueStyles.projectLabel);
        projectLabel.text = "View " + venue.number_of_shows + " Shows at this Venue",
        projectsView.add(projectLabel);

        var titleLabel = Ti.UI.createLabel(venueStyles.titleLabel);
        titleLabel.text = 'including ' + venue.random_show_title;
        projectsView.add(titleLabel);

        venueScroll.add(projectsView);

        projectsView.addEventListener('click', function(e){
          var projectsObj = require('modules/pages/projects');
          var projectsWindow = new projectsObj('Shows', containingTab, null, null, venue.id)
          containingTab.open(projectsWindow);
        });

        var line = Ti.UI.createView(venueStyles.lien);
        venueScroll.add(line);
      }

      self.add(venueScroll);
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

  self.add(spinner);
  spinner.show();

  xhr.open("GET", url);
  xhr.send();

  return self;
}

module.exports = VenueWindow;