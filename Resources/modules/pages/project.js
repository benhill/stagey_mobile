function ProjectWindow(project_id){

  var app = require('modules/core');
  var styles = require('modules/styles/styles');
  var projectStyles = require('modules/styles/project');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var projectObj = require('modules/models/project');
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  if(Ti.Platform.name == 'iPhone OS'){var sharekit = require('com.0x82.sharekit');}
  var Icon = require('modules/models/icons');
  var reviewObj = require('modules/models/review');
  var json, project, iconsView;
  var image_place = 0;
  var make_fav_text = "Make Favorite";
  var remove_fav_text = "Remove Favorite"
  var is_favorite;
  var table = Ti.UI.createTableView(projectStyles.table);
  var tableData = [];  

  self.load = function(){
    var url = Ti.App.api_url + "project/" + project_id;
    if(Ti.App.currentUser){url += '?email=' + Ti.App.currentUser.email}

    new projectObj(url, function(project){
      loadProject(project);
    });

    function loadProject(project){

      var projectWrapper = Ti.UI.createView(projectStyles.projectWrapper);

      var titleView = Ti.UI.createView(styles.titleView);
      titleView.top = 0;

      var titleLabel = Ti.UI.createLabel(styles.titleLabel);
      titleLabel.text = project.title.toUpperCase();
      titleView.add(titleLabel);

      var subTitleLabel = Ti.UI.createLabel(styles.subTitleLabel);
      subTitleLabel.text = project.company + ' \u00B7 ages ' + project.age_restriction + '+' + (project.duration ? ' \u00B7 ' + project.duration : '') + (project.cost_range ? ' \u00B7 '  + project.cost_range : '')
      titleView.add(subTitleLabel);

      projectWrapper.add(titleView);

      var allGalleryView = Ti.UI.createView(projectStyles.allGalleryView);
      var galleryView = Ti.UI.createView(projectStyles.galleryView);
      
      var imageCollection = [];
      if(project.images.length > 0){imageCollection = project.images.slice(0,4)};    

      for (var i = 0; i < imageCollection.length; i++) {

        if(i > 0 && i % 6 === 0){image_place = 0;}

        var img = Ti.UI.createImageView(projectStyles.img);
        img.left = image_place * 77,        
        img.image = imageCollection[i].image.thumbnail_path,
        img.full_image_path = imageCollection[i].image.image_path,

        image_place ++;

        galleryView.add(img);            

        img.addEventListener('click', function(e){
          app.openWindow(self, 'Image', 'image', [e.source.full_image_path]);
        });
      } 

      allGalleryView.add(galleryView);

      var moreImagesLabel = Ti.UI.createLabel(projectStyles.moreImagesLabel);      

      if(project.images.length > 4){
        allGalleryView.add(moreImagesLabel);

        moreImagesLabel.addEventListener('click', function(e){
          app.openWindow(self, project.title, 'gallery', ['project', project.id]);
        });
      }

      var row = Ti.UI.createTableViewRow(projectStyles.row);
      row.add(allGalleryView);
      row.selectedBackgroundColor = '#F4F1F1';
      if(imageCollection.length > 0){tableData.push(row)};

      var descriptionLabel = Ti.UI.createLabel(projectStyles.descriptionLabel);
      descriptionLabel.text = project.description;
      
      var row = Ti.UI.createTableViewRow(projectStyles.row);
      row.add(descriptionLabel);
      row.selectedBackgroundColor = '#F4F1F1';
      if(project.description.length > 0){tableData.push(row)};
      
      var icons = [];
      var left = 0;

      var buy_ticket = new Icon('Showtimes', 'http://stagey-mobile.s3.amazonaws.com/purchase_24.png', 'performances', project, false);
      icons.push(buy_ticket);      
      
      var make_favorite = new Icon(make_fav_text, 'http://stagey-mobile.s3.amazonaws.com/favorite_24.png', 'favorite', project);
      is_favorite = false      
      icons.push(make_favorite);

      if(Ti.Platform.name == 'iPhone OS'){
        var share = new Icon('Share', 'http://stagey-mobile.s3.amazonaws.com/share_24.png', '', project, false, null, 'Share');
        icons.push(share);
      }
      else{
        var share = new Icon('Open in Browser', 'http://stagey-mobile.s3.amazonaws.com/share_24.png', '', project, false, null, 'Share');
        icons.push(share);  
      }

      iconsView = Ti.UI.createView(projectStyles.iconsView);

      for(var i = 0; i < icons.length; i++){      
        icon = icons[i];

        var iconView = Ti.UI.createView(projectStyles.iconView);        
        iconView.left = left;
        iconView.icon = icon;

        var iconImage = Ti.UI.createImageView(projectStyles.iconImage);        
        iconImage.icon = icon;
        iconImage.image = icon.image;
        iconView.add(iconImage);

        var iconText = Ti.UI.createLabel(projectStyles.iconText);
        iconText.text = icon.text;
        iconText.icon = icon;
        iconView.add(iconText);

        iconView.addEventListener('click', function(e){
         runIconEvent(e);
        })

        iconsView.add(iconView);

        left += 105; 
      }

      function runIconEvent(e, islongclick){
        var favTextView = iconsView.children[1].children[1];
        var favImgView = iconsView.children[1].children[0];
        if(e.source.icon.id == 'Share'){
          if(Ti.Platform.name == 'iPhone OS'){
            sharekit.share({
              title:'I am checking out this show at the Fringe',
              view:e.source,
              link:Ti.App.site_url + 'projects/' + e.source.icon.object.id
            });
          }
          else{            
            Ti.Platform.openURL(Ti.App.site_url + 'projects/' + project.id);            
          }
        }
        else if(e.source.icon.window == 'favorite' && iconsView.children[1].children[1].text == make_fav_text){          
          favTextView.text = remove_fav_text;
          favImgView.text = remove_fav_text;
          is_favorite = true;
          toggleFavorite();
        }
        else if(e.source.icon.window == 'favorite' && iconsView.children[1].children[1].text != make_fav_text){
          favTextView.text = make_fav_text;
          favImgView.text = make_fav_text;
          is_favorite = false;
          toggleFavorite();
        }
        else if(e.source.icon.text == 'My Review'){
          new reviewObj(project.reviewed_by_me, function(review){
            loadReview(review);
          })
        }
        else{          
          if(Ti.App.currentUser || e.source.icon.auth_required == false){
            app.openWindow(self, e.source.icon.text, e.source.icon.window, [e.source.icon.object])
          }
          else{
            var windowObj = require('modules/pages/' + e.source.icon.window);

            var newWindow = new windowObj(e.source.icon.object);
            newWindow.navBarHidden = true;

            var headerObj = require('modules/common/header');
            newWindow.add(new headerObj());

            app.openWindow(self, 'Login', 'Login', [newWindow])
          }
        }
      }

      function loadReview(review){
        app.openWindow(self, 'Show Review', 'review', [review.id]);
      }
      
      var row = Ti.UI.createTableViewRow(projectStyles.row);      
      row.add(iconsView);
      row.selectedBackgroundColor = '#F4F1F1';
      tableData.push(row);

      var reviewView = Ti.UI.createView(projectStyles.reviewView);

      var reviewUserThumb = Ti.UI.createImageView(projectStyles.reviewUserThumb);
      reviewUserThumb.image = project.top_review_user_thumbnail_path,
      reviewView.add(reviewUserThumb);

      var reviewsLabel = Ti.UI.createLabel(projectStyles.reviewsLabel);
      reviewView.add(reviewsLabel);

      var reviewsLabelName = Ti.UI.createLabel(projectStyles.reviewsLabelName);
      reviewsLabelName.text = project.top_review_user_full_name + ': \"' + project.top_review_blurb + '\"', 
      reviewView.add(reviewsLabelName);

      var carrotImage = Ti.UI.createImageView(projectStyles.carrotImage);
      carrotImage.image = 'http://stagey-mobile.s3.amazonaws.com/more-arrow.png';
      reviewView.add(carrotImage);

      if(Ti.Platform.name == 'iPhone OS'){reviewView.height = reviewView.toImage().height + 8;}
      else{reviewView.height = 90;}
      
      var row = Ti.UI.createTableViewRow(projectStyles.row);
      row.add(reviewView);
      if(project.top_review_blurb){tableData.push(row)};

      reviewView.addEventListener('click', function(e){
        app.openWindow(self, 'Reviews', 'reviews', [null, project.id]);
      });

      var teamView = Ti.UI.createView(projectStyles.teamView);

      var teamThumb = Ti.UI.createImageView(projectStyles.teamThumb);
      teamThumb.image = project.fringe_user.picture_url;
      teamView.add(teamThumb);

      var teamLabel = Ti.UI.createLabel(projectStyles.teamLabel);
      teamView.add(teamLabel);

      var teamLabelName = Ti.UI.createLabel(projectStyles.teamLabelName);
      teamLabelName.text = 'including ' + project.fringe_user.full_name,
      teamView.add(teamLabelName);

      var carrotImage = Ti.UI.createImageView(projectStyles.carrotImage);
      carrotImage.image = 'http://stagey-mobile.s3.amazonaws.com/more-arrow.png';
      teamView.add(carrotImage);
      
      var row = Ti.UI.createTableViewRow(projectStyles.row);
      row.add(teamView);
      tableData.push(row);

      teamView.addEventListener('click', function(e){
        app.openWindow(self, 'Project Team', 'users', [project.id]);
      });
  
      var tagsList = 'tagged under:\n'

      for(i=0;i < project.tags.length;i++){
        tagsList += project.tags[i].name;
        if(i != project.tags.length-1){tagsList +=  ' ' + String.fromCharCode(183) + ' '}
      }

      var tagsLabel = Ti.UI.createLabel(projectStyles.tagsLabel);
      tagsLabel.text = tagsList;

      if(project.tags.length > 0){        
        var row = Ti.UI.createTableViewRow(projectStyles.row);
        row.selectedBackgroundColor = '#F4F1F1';
        row.add(tagsLabel);
        tableData.push(row);
      }

      table.setData(tableData);
      projectWrapper.add(table);

      if(Ti.App.make_favorite == project.id){
        Ti.App.make_favorite = null;

        var favTextView = iconsView.children[1].children[1];
        var favImgView = iconsView.children[1].children[0];

        if(!project.is_favorite){
          favTextView.text = remove_fav_text;
          favImgView.text = remove_fav_text;
          is_favorite = true;
        }

        if(!project.is_favorite){toggleFavorite();}
      }

      self.add(projectWrapper);
      self.remove(spinner);


      if(Ti.App.currentUser){
        var favObj = require('modules/models/is_favorite');
        new favObj(Ti.App.currentUser.email, project.id, function(is_favorite){
          if(is_favorite){
            var favTextView = iconsView.children[1].children[1];
            var favImgView = iconsView.children[1].children[0];
            favTextView.text = remove_fav_text;
            favImgView.text = remove_fav_text;
            is_favorite = true;
          }
        })
      };

    };

    spinner.show();
    self.add(spinner);

    var favXhr = Ti.Network.createHTTPClient({
      onload: function(){
      },
      onerror: function(e) {
        Ti.API.debug("STATUS: " + this.status);
        Ti.API.debug("TEXT:   " + this.responseText);
        Ti.API.debug("ERROR:  " + e.error);
        alert('There was an error retrieving the remote data. Try again.');
      },
      timeout:8000
    }); 

    function toggleFavorite(){
      if(Ti.App.currentUser){
        url = Ti.App.api_url + "toggle_favorite?project_id=" + project_id + "&email=" + Ti.App.currentUser.email + "&password=" + Ti.App.userPassword;
        favXhr.open("GET", url);
        favXhr.send();
      }
      else{        
        Ti.App.make_favorite = project_id;

        var windowObj = require('modules/pages/project');
        var newWindow = new windowObj(project_id);
        newWindow.navBarHidden = true;

        var headerObj = require('modules/common/header');
        newWindow.add(new headerObj());

        app.openWindow(self, 'Login', 'login', [newWindow])
      }
    }

  }

  return self;
}

module.exports = ProjectWindow;