function ReviewWindow(title, containingTab, review_id){

  var styles = require('modules/styles/styles');
  var reviewStyles = require('modules/styles/review');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;
  var reviewScroll = Ti.UI.createScrollView(reviewStyles.reviewScroll);
  var wrapper = Ti.UI.createView(reviewStyles.wrapper);
  var reviewerWrapper = Ti.UI.createView(reviewStyles.reviewerWrapper);
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

    var image = Ti.UI.createImageView(reviewStyles.image);
    image.image = review.reviewer_image_url;
    reviewerWrapper.add(image);

    var nameLabel = Ti.UI.createLabel(reviewStyles.nameLabel);
    nameLabel.text = review.reviewer_first_name + " " + review.reviewer_last_name;
    reviewerWrapper.add(nameLabel);

    var projectLabel = Ti.UI.createLabel(reviewStyles.projectLabel);
    projectLabel.text = "on " + ((review.project_title.length >= 25) ? title = review.project_title.substr(0,25) + "..." : title = review.project_title);
    reviewerWrapper.add(projectLabel);

    var info = Ti.UI.createLabel(reviewStyles.info);
    info.text = review.rating_text + " \u00B7 " + review.time_passed + " ago";
    reviewerWrapper.add(info);

    var line = Ti.UI.createView(reviewStyles.line);
    reviewerWrapper.add(line);

    reviewerWrapper.addEventListener('click', function(e){
      if(!review.anonymous){
        var params = ['User', containingTab, review.fringe_user_id];
        app.openWindow('user', containingTab, params);
      }
    });

    wrapper.add (reviewerWrapper);

    var bodyWrapper = Ti.UI.createView(reviewStyles.bodyWrapper);

    var body = Ti.UI.createLabel(reviewStyles.body);
    body.text = review.body,
    bodyWrapper.add(body);

    var helpful =  Ti.UI.createButton(reviewStyles.helpful);
    if(Ti.App.currentUser){bodyWrapper.add(helpful);}

    helpful.addEventListener('click', function(e){
      make_helpful(true);
    });

    var not_helpful =  Ti.UI.createButton(reviewStyles.not_helpful);
    if(Ti.App.currentUser){bodyWrapper.add(not_helpful);}

    not_helpful.addEventListener('click', function(e){
      make_helpful(false);
    });

    var view_project =  Ti.UI.createButton(reviewStyles.view_project);
    bodyWrapper.add(view_project);

    view_project.addEventListener('click', function(e){
      var params = ['Project', containingTab, review.project_id];
      app.openWindow('project', containingTab, params);
    });

    wrapper.add(bodyWrapper);
    
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