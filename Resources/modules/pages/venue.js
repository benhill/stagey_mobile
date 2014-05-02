function VenueWindow(venue_id){

  var app = require('modules/core');
  var styles = require('modules/styles/styles');
  var venueStyles = require('modules/styles/venue')
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var venueObj = require('modules/models/venue');
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var url = Ti.App.api_url + "venue/" + venue_id;
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

    var venueWrapper = Titanium.UI.createView(venueStyles.venueWrapper);

    var titleView = Ti.UI.createView(styles.titleView);
    titleView.top = 15;

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
        app.openWindow(self, 'Image', 'image', [e.source.full_image_path]);
      });

    }

    allGalleryView.add(galleryView);

    var moreImagesLabel = Ti.UI.createLabel(venueStyles.moreImagesLabel);

    if(venue.images.length > 4){

      allGalleryView.add(moreImagesLabel);

      moreImagesLabel.addEventListener('click', function(e){
        app.openWindow(self, venue.name, 'gallery', ['venue', venue.id]);
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
      projectsView.add(projectThumb);

      var projectLabel = Ti.UI.createLabel(venueStyles.projectLabel);
      projectLabel.text = "View Shows at this Venue",
      projectsView.add(projectLabel);

      var titleLabel = Ti.UI.createLabel(venueStyles.titleLabel);
      projectsView.add(titleLabel);

      var carrotImage = Ti.UI.createImageView(venueStyles.carrotImage);
      carrotImage.image = 'http://stagey-mobile.s3.amazonaws.com/more-arrow.png';
      projectsView.add(carrotImage);

      var row = Ti.UI.createTableViewRow(venueStyles.row);
      row.add(projectsView);
      tableData.push(row);

      projectsView.addEventListener('click', function(e){
        var params = ['venue', null, null, venue.id];
        app.openWindow(self, 'Shows', 'projects', params);
      });

      var projectObj = require('modules/models/random_project');
      new projectObj(venue.id, function(project){
        titleLabel.text = 'including ' + project.title;
        projectThumb.image = project.primary_thumbnail_url;
      });

    }

    var addressView = Ti.UI.createView(venueStyles.addressView);

    var addressLabel = Ti.UI.createLabel(venueStyles.addressLabel);
    addressView.add(addressLabel);

    var address = Ti.UI.createLabel(venueStyles.address);
    addressView.add(address);

    var carrotImage = Ti.UI.createImageView(venueStyles.carrotImage);
    carrotImage.image = 'http://stagey-mobile.s3.amazonaws.com/more-arrow.png';
    addressView.add(carrotImage);

    var row = Ti.UI.createTableViewRow(venueStyles.row);
    row.selectedBackgroundColor = '#F4F1F1';
    row.add(addressView);
    tableData.push(row);

    if(Ti.Platform.name == 'iPhone OS'){
      row.addEventListener('click',function(){
        Ti.Platform.openURL('http://maps.apple.com/?q=' + venue.address + ", " + venue.city + ", " + venue.state + " " + venue.postal);
      });
    }
    else{
      row.addEventListener('click',function(){
        var intent = Ti.Android.createIntent({
          action: Ti.Android.ACTION_VIEW,
          data:'geo:0,0+?q=' + venue.address + ", " + venue.city + ", " + venue.state + " " + venue.postal
        });
        Ti.Android.currentActivity.startActivity(intent);
      });
    }

    table.setData(tableData);
    venueWrapper.add(table);

    self.add(venueWrapper);
    self.remove(spinner);

    new venueDistObj(venue.id, function(miles_away){
      address.text = venue.address + '\n' + venue.city + ', ' + venue.state + ' ' + venue.postal + '\n' + String(miles_away) + ' miles away';
    });
  };

  self.add(spinner);
  spinner.show();

  return self;
}

module.exports = VenueWindow;