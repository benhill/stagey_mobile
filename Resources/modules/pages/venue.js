function VenueWindow(title, containingTab, venue_id){

  var styles = require('modules/styles/styles');
  var venueStyles = require('modules/styles/venue')

  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;
  var venueObj = require('modules/models/venue');
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var url = app.api_url + "venue/" + venue_id + ".json?event_id=7";
  var json, venue;
  var image_top = 0;
  var image_place = 0;
  self.load = function(){
    new venueObj(url, function(venue){
      loadVenue(venue);
    });
  }

  function loadVenue(venue){
    var venueDistObj = require('modules/models/venue_distance');

    new venueDistObj(venue.id, function(miles_away){
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
        img.image = venue.images[i].image.thumbnail_path;
        img.left = image_place * 77;
        img.top = image_top;
        img.full_image_path = venue.images[i].image.image_path;
        image_place ++;

        galleryView.add(img);            

        img.addEventListener('click', function(e){
          var params = [containingTab, e.source.full_image_path];
          app.openWindow('image', containingTab, params);
        });

      } 

      venueScroll.add(galleryView);

      var moreImagesLabel = Ti.UI.createLabel(venueStyles.moreImagesLabel);

      if(venue.images.length > 4){

        venueScroll.add(moreImagesLabel);

        moreImagesLabel.addEventListener('click', function(e){
          params = [venue.name, containingTab, venue.images];
          app.openWindow('gallery', containingTab, params);
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

      var distance = Ti.UI.createLabel(venueStyles.distance);
      distance.text = miles_away + ' miles away'
      mapView.add(distance);

      venueScroll.add(mapView);

      mapView.addEventListener('click', function(e){
        params = ['project', containingTab, venue];
        app.openWindow('map', containingTab, params);
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
          var params = ['Shows', containingTab, 'venue', null, null, venue.id];
          app.openWindow('projects', containingTab, params);
        });

        var line = Ti.UI.createView(venueStyles.lien);
        venueScroll.add(line);
      }

      self.add(venueScroll);
      self.remove(spinner);
    }); 
  };

  self.add(spinner);
  spinner.show();

  return self;
}

module.exports = VenueWindow;