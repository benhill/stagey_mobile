function ProjectWindow(title, containingTab, project_id){

  var styles = require('modules/styles/styles');
  var projectStyles = require('modules/styles/project');

  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;
  var projectObj = require('modules/models/project');
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var sharekit = require('com.0x82.sharekit');  
  var Icon = require('modules/models/icons');
  var reviewObj = require('modules/models/review');
  var json, project, iconsView;
  var image_place = 0;
  var make_fav_text = "Make Favorite";
  var remove_fav_text = "Remove Favorite"
  var is_favorite;

  self.load = function(){
    var url = "http://www.gwahir.com:3000/api/project/" + project_id + ".json?event_id=7";
    if(Ti.App.currentUser){url += '&email=' + Ti.App.currentUser.email}

    new projectObj(url, function(project){
      loadProject(project);
    });

    function loadProject(project){      
      var projectScroll = Ti.UI.createScrollView(projectStyles.projectScroll);

      if(Ti.App.make_favorite == project.id){
        Ti.App.make_favorite = null;
        if(!project.is_favorite){toggleFavorite();}
      }

      var title = Ti.UI.createLabel(projectStyles.title);
      title.text = project.title;
      projectScroll.add(title);

      var subTitle = Ti.UI.createLabel(projectStyles.subTitle);
      subTitle.text = project.company + " \u00B7 ages " + project.age_restriction + "+ \u00B7 " + project.duration + " \u00B7 " + project.cost_range
      projectScroll.add(subTitle);    

      var galleryView = Ti.UI.createView(projectStyles.galleryView);      

      var imageCollection = project.images.slice(0,4);      

      for (var i = 0; i < imageCollection.length; i++) {

        if(i > 0 && i % 6 === 0){image_place = 0;}

        var img = Ti.UI.createImageView(projectStyles.img);
        img.left = image_place * 77,        
        img.image = imageCollection[i].image.thumbnail_path,
        img.full_image_path = imageCollection[i].image.image_path,

        image_place ++;

        galleryView.add(img);            

        img.addEventListener('click', function(e){
          var imageObj = require('modules/pages/image');
          var imageWindow = new imageObj(containingTab, e.source.full_image_path);
          containingTab.open(imageWindow);
        });
      }

      projectScroll.add(galleryView);

      var moreImagesLabel = Ti.UI.createLabel(projectStyles.moreImagesLabel);

      if(project.images.length > 4){
        projectScroll.add(moreImagesLabel);

        moreImagesLabel.addEventListener('click', function(e){
          var galleryObj = require('modules/pages/gallery');
          var galleryWindow = new galleryObj(project.title, containingTab, project.images);
          containingTab.open(galleryWindow);          
        });
      }

      var descriptionLabel = Ti.UI.createLabel(projectStyles.descriptionLabel);
      descriptionLabel.text = project.description + ' (read more)',

      projectScroll.add(descriptionLabel);

      descriptionLabel.addEventListener('click', function(e){
        var descObj = require('modules/pages/project_description');
        var descWindow = new descObj('Show Description', containingTab, project.id);
        containingTab.open(descWindow);
      });

      var line = Ti.UI.createView(projectStyles.line);
      projectScroll.add(line);

      var icons = [];
      var left = 0;

      var buy_ticket = new Icon('Buy Ticket', 'iphone/purchase_24.png', 'performances', project);
      icons.push(buy_ticket);

      if(project.reviewed_by_me){
        var add_review = new Icon('My Review', 'iphone/reviews_24.png', 'add_review', project);
      }
      else{
        var add_review = new Icon('Add Review', 'iphone/reviews_24.png', 'add_review', project, true);
      }
      icons.push(add_review);

      if(project.is_favorite){
        var make_favorite = new Icon(remove_fav_text, 'iphone/favorite_24.png', 'favorite', project);
        is_favorite = true
      }
      else{
        var make_favorite = new Icon(make_fav_text, 'iphone/favorite_24.png', 'favorite', project);
        is_favorite = false
      }
      icons.push(make_favorite);

      var share = new Icon('Share', 'iphone/share_24.png', '', project);
      icons.push(share);    

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

        left += 75; 
      }

      function runIconEvent(e, islongclick){
        var favTextView = iconsView.children[2].children[1]
        var favImgView = iconsView.children[2].children[0]
        if(e.source.icon.text == 'Share'){
          sharekit.share({
            title:'I am checking out this show a show on stagey.net',
            view:e.source,
            link:'www.gwahir.com:3000/projects/' + e.source.icon.object.id
          });
        }
        else if(e.source.icon.window == 'favorite' && !is_favorite){  
          favTextView.text = remove_fav_text;
          favImgView.text = remove_fav_text;
          is_favorite = true;
          toggleFavorite();          
        }
        else if(e.source.icon.window == 'favorite' && is_favorite){
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
          var windowObj = require('modules/pages/' + e.source.icon.window);
          var newWindow = new windowObj(e.source.icon.text, containingTab, e.source.icon.object);

          if(Ti.App.currentUser || e.source.icon.auth_required == false){
            containingTab.open(newWindow);
            newWindow.load();
          }
          else{
            var loginObj = require('modules/pages/login');
            var loginWindow = new loginObj('Login', containingTab, newWindow);
            containingTab.open(loginWindow);
          }
        }
      }

      function loadReview(review){
        var reviewObj = require('modules/pages/review');
        var reviewWindow = new reviewObj('Show Review', containingTab, review, project);
        containingTab.open(reviewWindow);
      }

      projectScroll.add(iconsView);

      var line = Ti.UI.createView(projectStyles.line);
      projectScroll.add(line);

      var reviewView = Ti.UI.createView(projectStyles.reviewView);

      var reviewUserThumb = Ti.UI.createImageView(projectStyles.reviewUserThumb);
      reviewUserThumb.image = project.top_review_user_thumbnail_path,
      reviewView.add(reviewUserThumb);

      var reviewsLabel = Ti.UI.createLabel(projectStyles.reviewsLabel);
      reviewView.add(reviewsLabel);

      var reviewsLabelName = Ti.UI.createLabel(projectStyles.reviewsLabelName);
      reviewsLabelName.text = project.top_review_user_full_name + ': \"' + project.top_review_blurb + '\"',
      reviewView.add(reviewsLabelName);

      var line = Ti.UI.createView(projectStyles.line);
      line.top = 70,
      reviewView.add(line);

      if(project.top_review_blurb){projectScroll.add(reviewView);}

      reviewView.addEventListener('click', function(e){
        var reviewsObj = require('modules/pages/reviews');
        var reviewsWindow = new reviewsObj('Reviews', containingTab, project);
        containingTab.open(reviewsWindow);
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

      projectScroll.add(teamView);

      teamView.addEventListener('click', function(e){
        var usersObj = require('modules/pages/users');
        var usersWindow = new usersObj('Project Team', containingTab, project.team);
        containingTab.open(usersWindow);
      });

      function loadIconWin(e, islongclick){ 
        var newWindow = Ti.UI.createWindow({
          title:e.source.text,
          backgroundColor:'#fff',
          url:e.source.window
        });      
        currentTab.open(newWindow);
      }

      var line = Ti.UI.createView(projectStyles.line);
      projectScroll.add(line);

      var tagsList = 'tagged under:\n'

      for(i=0;i < project.tags.length;i++){
        tagsList += project.tags[i].name;
        if(i != project.tags.length-1){tagsList +=  ' ' + String.fromCharCode(183) + ' '}
      }

      var tagsLabel = Ti.UI.createLabel(projectStyles.tagsLabel);
      tagsLabel.text = tagsList;

      if(project.tags.length > 0){
        projectScroll.add(tagsLabel);
      }

      self.add(projectScroll);
      self.remove(spinner);      
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
        url = "http://www.gwahir.com:3000/api/toggle_favorite.json?project_id=" + project_id + "&email=" + Ti.App.currentUser.email + "&password=" + Ti.App.userPassword;
        favXhr.open("GET", url);
        favXhr.send();
      }
      else{
        Ti.App.make_favorite = project_id;
        var loginObj = require('modules/pages/login');
        var loginWindow = new loginObj('Login', containingTab, self);
        containingTab.open(loginWindow);
      }
    }
  }

  return self;
}

module.exports = ProjectWindow;