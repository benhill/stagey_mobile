function VenueWindow(venue_id){

  var styles = require('modules/styles/styles');
  var venueStyles = require('modules/styles/venue')
  var self = Ti.UI.createWindow(styles.defaultWindow);
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

      var titleView = Ti.UI.createView(styles.titleView);
      titleView.top = 0;

      var titleLabel = Ti.UI.createLabel(styles.titleLabel);
      titleLabel.text = venue.name.toUpperCase();
      titleView.add(titleLabel);

      var subTitleLabel = Ti.UI.createLabel(styles.subTitleLabel);
      subTitleLabel.text = "presented by " + venue.presenter;
      titleView.add(subTitleLabel);

      venueScroll.add(titleView);

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
          app.openWindow('Image', 'image', [e.source.full_image_path]);
        });

      } 

      venueScroll.add(galleryView);

      var moreImagesLabel = Ti.UI.createLabel(venueStyles.moreImagesLabel);

      if(venue.images.length > 4){

        venueScroll.add(moreImagesLabel);

        moreImagesLabel.addEventListener('click', function(e){
          app.openWindow(venue.name, 'gallery', [venue.images]);
        });
      }

      var description = Ti.UI.createLabel(venueStyles.description);
      description.text = venue.description;
      venueScroll.add(description);

      
      if(venue.number_of_shows > 0){

        var line = Ti.UI.createView(venueStyles.line);
        venueScroll.add(line);

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

        var carrotImage = Ti.UI.createImageView(venueStyles.carrotImage);
        projectsView.add(carrotImage);

        venueScroll.add(projectsView);

        projectsView.addEventListener('click', function(e){
          var params = ['venue', null, null, venue.id];
          app.openWindow('Shows', 'projects', params);
        });
        
      }

      var line = Ti.UI.createView(venueStyles.line);
      venueScroll.add(line);

      var addressView = Ti.UI.createView(venueStyles.addressView);

      var addressLabel = Ti.UI.createLabel(venueStyles.addressLabel);      
      addressView.add(addressLabel);

      var address = Ti.UI.createLabel(venueStyles.address);
      address.text = venue.address + "\n" + venue.city + ", " + venue.state + " " + venue.postal;
      addressView.add(address);

      var distance = Ti.UI.createLabel(venueStyles.distance);
      distance.text = miles_away + ' miles away'
      addressView.add(distance);

      venueScroll.add(addressView);
      
      var annotation = Ti.Map.createAnnotation(venueStyles.annotation);
      annotation.latitude = venue.lat;
      annotation.longitude = venue.lng;
      annotation.title = venue.name;
      annotation.subtitle = venue.address;

      var mapView = Titanium.Map.createView(venueStyles.mapView);
      mapView.annotations = [annotation];
      mapView.region = {latitude:venue.lat, longitude:venue.lng, latitudeDelta:0.01, longitudeDelta:0.01};
      venueScroll.add(mapView);
      
      self.add(venueScroll);
      self.remove(spinner);
    }); 
  };

  self.add(spinner);
  spinner.show();

  return self;
}

module.exports = VenueWindow;