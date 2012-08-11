Ti.include("helper.js");
var projectTab = Ti.UI.currentTab;
var reviewWin = Ti.UI.currentWindow;
var review = reviewWin.review;
var reviewScroll = Titanium.UI.createScrollView({
  contentWidth:'auto',
  contentHeight:'auto',
  touchEnabled:true,
  scrollType:'vertical',
  verticalBounce:true,
  showVerticalScrollIndicator:true,
  width:'auto',
  height:350,
  top:0
});
var wrapper = Ti.UI.createView({
  height:'auto',
  width:'auto',
  top:0
});
var image = Ti.UI.createImageView({
  image:review.reviewer_image_url,
  width:45,
  height:45,
  left:5,
  top:10,
  borderColor:'black',
  borderWidth:1
});
wrapper.add(image);
var nameLabel = Ti.UI.createLabel({
  text:review.reviewer_first_name + " " + review.reviewer_last_name.substr(0,1),
  width:'100%',
  height:45,
  left:60,
  top:-7,
  font:{fontSize:'13', fontWeight:'bold'}
});
wrapper.add(nameLabel);
var date = Ti.UI.createLabel({
  text:review.time_passed + " ago",
  height:45,
  left:215,
  top:-7,
  font:{fontSize:'10'}
});
wrapper.add(date);
var rating = Ti.UI.createLabel({
  text:review.rating_text,
  height:'auto',
  width:'250',
  left:60,
  top:25,
  font:{fontSize:'11'}
});
wrapper.add(rating);
var body = Ti.UI.createLabel({
  text:review.body,
  height:'auto',
  width:'245',
  left:60,
  top:45,
  font:{fontSize:'11'}
});
wrapper.add(body);
reviewScroll.add(wrapper);
reviewWin.add(reviewScroll);
reviewWin.open();