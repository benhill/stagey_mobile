Ti.include("helper.js");
var projectTab = Ti.UI.currentTab;
var reviewWin = Ti.UI.currentWindow;
var review = reviewWin.review;
var project = reviewWin.project;
var reviewScroll = Titanium.UI.createScrollView({
  contentWidth:'auto',
  contentHeight:'auto',
  touchEnabled:true,
  scrollType:'vertical',
  verticalBounce:true,
  showVerticalScrollIndicator:true,
  width:'auto',
  height:350,
  top:0,
  left:0
});
var wrapper = Ti.UI.createView({
  height:'auto',
  width:'auto',
  top:0,
  left:0
});
var reviewerWrapper = Ti.UI.createView({
  height:'auto',
  width:'auto',
  top:0,
  left:0
});
var image = Ti.UI.createImageView({
  image:review.reviewer_image_url,
  width:55,
  height:55,
  left:10,
  top:10,
  borderColor:'black',
  borderWidth:1
});
reviewerWrapper.add(image);
var nameLabel = Ti.UI.createLabel({
  text:review.reviewer_first_name + " " + review.reviewer_last_name,
  width:'100%',
  height:45,
  left:75,
  top:-7,
  font:{fontSize:13, fontWeight:'bold'}
});
reviewerWrapper.add(nameLabel);
var project = Ti.UI.createLabel({
  text:"on " + ((project.title.length >= 30) ? title = project.title.substr(0,42) + "..." : title = project.title),
  height:45,  
  top:11,
  font:{fontSize:10, fontWeight:'bold'},
  right:0,
  left:75
});
reviewerWrapper.add(project);
var info = Ti.UI.createLabel({
  text:review.rating_text + " \u00B7 " + review.time_passed + " ago",
  height:47,
  top:26,
  font:{fontSize:10, fontWeight:'bold'},
  right:0,
  left:75
});
reviewerWrapper.add(info);
var line = Ti.UI.createView({
  width:320,
  height:1,
  top:72,
  backgroundColor:'gray'
});
reviewerWrapper.add(line);
reviewerWrapper.addEventListener('click', function(e){        
  var userWin = Titanium.UI.createWindow({
    url:'user.js',
    backButtonTitle:'back',
    layout:'vertical',
    user_id:review.fringe_user_id,
    title:"User Profile"
  });
  projectTab.open(userWin);  
});
wrapper.add (reviewerWrapper);
var body = Ti.UI.createLabel({
  text:review.body,
  height:'auto',
  width:300,
  left:10,
  top:77,
  font:{fontSize:'12'}
});
wrapper.add(body);
reviewScroll.add(wrapper);
reviewWin.add(reviewScroll);
reviewWin.open();