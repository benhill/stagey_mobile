function ReviewWindow(review_id){

  var app = require('modules/core');
  var styles = require('modules/styles/styles');
  var reviewStyles = require('modules/styles/review');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var reviewScroll = Ti.UI.createScrollView(reviewStyles.reviewScroll);
  var wrapper = Ti.UI.createView(reviewStyles.wrapper);  
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);

  self.load = function(){
    spinner.show();
    self.add(spinner);

    var reviewObj = require('modules/models/review');
    new reviewObj(review_id, function(review){
      loadReview(review);
    })
  }

  function loadReview(review){

    var titleView = Ti.UI.createView(styles.titleView);
    titleView.top = 0;
    titleView.layout = 'absolute';
    titleView.zIndex = 1000;
        
    var image = Ti.UI.createImageView(reviewStyles.image);
    image.image = review.reviewer_image_url;
    titleView.add(image);

    var nameLabel = Ti.UI.createLabel(reviewStyles.nameLabel);
    nameLabel.text = review.reviewer_first_name.toUpperCase() + " " + review.reviewer_last_name.toUpperCase();
    titleView.add(nameLabel);

    var projectLabel = Ti.UI.createLabel(reviewStyles.projectLabel);
    projectLabel.text = "on " + ((review.project_title.length >= 32) ? review.project_title.substr(0,32).toLowerCase() + "..." : review.project_title.toLowerCase());
    titleView.add(projectLabel);

    var info = Ti.UI.createLabel(reviewStyles.info);
    info.text = review.rating_text + " \u00B7 " + review.time_passed + " ago";
    titleView.add(info);    

    titleView.addEventListener('click', function(e){
      if(!review.anonymous){app.openWindow('User', 'user', [review.fringe_user_id]);}
    });

    reviewScroll.add(titleView);

    var bodyWrapper = Ti.UI.createView(reviewStyles.bodyWrapper);

    var body = Ti.UI.createLabel(reviewStyles.body);
    body.text = review.body,
    bodyWrapper.add(body);

    wrapper.add(bodyWrapper);

    var buttonsWrapper = Ti.UI.createView(reviewStyles.buttonsWrapper)
    
    var helpful =  Ti.UI.createButton(reviewStyles.helpful);
    if(Ti.App.currentUser){buttonsWrapper.add(helpful);}

    helpful.addEventListener('click', function(e){
      make_helpful(true);
    });

    var not_helpful =  Ti.UI.createButton(reviewStyles.not_helpful);
    if(Ti.App.currentUser){buttonsWrapper.add(not_helpful);}

    not_helpful.addEventListener('click', function(e){
      make_helpful(false);
    });

    var view_project =  Ti.UI.createButton(reviewStyles.view_project);
    buttonsWrapper.add(view_project);

    view_project.addEventListener('click', function(e){
      app.openWindow('Project', 'project', [review.project_id]);
    });

    self.add(buttonsWrapper);
    
    reviewScroll.add(wrapper);

    self.add(reviewScroll);

    spinner.hide();
  }

  function make_helpful(is_helpful){
    var helpfulObj = require('modules/models/make_review_helpful');
    new helpfulObj(review.id, Ti.App.currentUser.id, is_helpful, function(response){
      alert("Thanks for your feedback");
    })
  }

  return self;
}

module.exports = ReviewWindow;