function VenueWindow(venue_id){

  var styles = require('modules/styles/styles');
  var venueStyles = require('modules/styles/venue')
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var venueObj = require('modules/models/venue');
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var url = app.api_url + "venue/" + venue_id;
  var json, venue;
  var image_top = 0;
  var image_place = 0;
  var table = Ti.UI.createTableView(venueStyles.table);
  var tableData = [];  

  self.load = function(){
    new venueObj(url, function(venue){
      loadVenue(venue);
    });
  }

  function loadVenue(venue){
    
    var venueDistObj = require('modules/models/venue_distance');

    new venueDistObj(venue.id, function(miles_away){

      var venueWrapper = Titanium.UI.createView(venueStyles.venueWrapper);

      var titleView = Ti.UI.createView(styles.titleView);
      titleView.top = 0;

      var titleLabel = Ti.UI.createLabel(styles.titleLabel);
      titleLabel.width = '95%';
      titleLabel.text = venue.name.toUpperCase();
      if(venue.presenter.length == 0){titleLabel.bottom = 10};
      titleView.add(titleLabel);

      var subTitleLabel = Ti.UI.createLabel(styles.subTitleLabel);
      subTitleLabel.text = "presented by " + venue.presenter;
      if(venue.presenter.length > 0){titleView.add(subTitleLabel)};

      venueWrapper.add(titleView);      

      var allGalleryView = Ti.UI.createView(venueStyles.allGalleryView);
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

      allGalleryView.add(galleryView);

      var moreImagesLabel = Ti.UI.createLabel(venueStyles.moreImagesLabel);

      if(venue.images.length > 4){

        allGalleryView.add(moreImagesLabel);

        moreImagesLabel.addEventListener('click', function(e){
          app.openWindow(venue.name, 'gallery', [venue.images]);
        });
      }

      var row = Ti.UI.createTableViewRow(venueStyles.row);
      row.selectedBackgroundColor = '#F4F1F1';
      row.add(allGalleryView);
      if(imageCollection.length > 0){tableData.push(row)};

      var description = Ti.UI.createLabel(venueStyles.description);
      description.text = venue.description;
      
      var row = Ti.UI.createTableViewRow(venueStyles.row);
      row.selectedBackgroundColor = '#F4F1F1';
      row.add(description);
      if(venue.description.length > 0){tableData.push(row)};
      
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

        var carrotImage = Ti.UI.createImageView(venueStyles.carrotImage);
        projectsView.add(carrotImage);

        var row = Ti.UI.createTableViewRow(venueStyles.row);
        row.add(projectsView);
        tableData.push(row);

        projectsView.addEventListener('click', function(e){
          var params = ['venue', null, null, venue.id];
          app.openWindow('Shows', 'projects', params);
        });
        
      }

      var addressView = Ti.UI.createView(venueStyles.addressView);

      var addressLabel = Ti.UI.createLabel(venueStyles.addressLabel);      
      addressView.add(addressLabel);

      var address = Ti.UI.createLabel(venueStyles.address);
      address.text = venue.address + '\n' + venue.city + ', ' + venue.state + ' ' + venue.postal + '\n' + String(miles_away) + ' miles away';
      addressView.add(address);
      
      var annotation = Ti.Map.createAnnotation(venueStyles.annotation);
      annotation.latitude = venue.lat;
      annotation.longitude = venue.lng;
      annotation.title = venue.name;
      annotation.subtitle = venue.address;

      var mapView = Titanium.Map.createView(venueStyles.mapView);
      mapView.annotations = [annotation];
      mapView.region = {latitude:venue.lat, longitude:venue.lng, latitudeDelta:0.01, longitudeDelta:0.01};      
      
      var locationWrapper = Ti.UI.createView(venueStyles.locationWrapper);
      locationWrapper.add(addressView);
      locationWrapper.add(mapView);

      var row = Ti.UI.createTableViewRow(venueStyles.row);
      row.selectedBackgroundColor = '#F4F1F1';
      row.add(locationWrapper);
      tableData.push(row);

      table.setData(tableData);
      venueWrapper.add(table);
      
      self.add(venueWrapper);
      self.remove(spinner);
    }); 
  };

  self.add(spinner);
  spinner.show();

  return self;
}

module.exports = VenueWindow;