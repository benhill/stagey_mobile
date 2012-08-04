Ti.include("helper.js");
var projectTab = Ti.UI.currentTab;
var reviewWin = Ti.UI.currentWindow;
var review = reviewWin.review;
var reviewScroll = Titanium.UI.createScrollView({
  contentWidth:'95%',
  contentHeight:1100,
  top:5,
  left:0,
  height:800,
  showVerticalScrollIndicator:true,
  showHorizontalScrollIndicator:true
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
reviewScroll.add(image);
var nameLabel = Ti.UI.createLabel({
  text:review.reviewer_first_name + " " + review.reviewer_last_name.substr(0,1),
  width:'100%',
  height:45,
  left:60,
  top:-7,
  font:{fontSize:'13', fontWeight:'bold'}
});
reviewScroll.add(nameLabel);
var date = Ti.UI.createLabel({
  text:review.time_passed + " ago",
  height:45,
  left:225,
  top:-7,
  font:{fontSize:'10'}
});
reviewScroll.add(date);
var body = Ti.UI.createLabel({
  text:review.body,
  height:'auto',
  width:'250',
  left:60,
  top:30,
  font:{fontSize:'11'}
});
reviewScroll.add(body);
reviewWin.add(reviewScroll);
reviewWin.open();