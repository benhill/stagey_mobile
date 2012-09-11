function ReviewWindow(title, containingTab, review, project){

  var styles = require('modules/styles/styles');
  var reviewStyles = require('modules/styles/review');

  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;
  var reviewScroll = Ti.UI.createScrollView(reviewStyles.reviewScroll);
  var wrapper = Ti.UI.createView(reviewStyles.wrapper);
  var reviewerWrapper = Ti.UI.createView(reviewStyles.reviewerWrapper);

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
      var userObj = require('modules/pages/user');
      var userWindow = new userObj('User', containingTab, review.fringe_user_id);
      containingTab.open(userWindow);
    }
  });

  wrapper.add (reviewerWrapper);

  var body = Ti.UI.createLabel(reviewStyles.body);
  body.text = review.body,
  wrapper.add(body);

  reviewScroll.add(wrapper);

  self.add(reviewScroll);

  return self;
}

module.exports = ReviewWindow;