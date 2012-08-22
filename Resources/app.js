Ti.include("helper.js");
Ti.UI.backgroundColor = '#dddddd';
var tabGroup = Titanium.UI.createTabGroup(); 
var homeWin = Titanium.UI.createWindow({
  title:'Home',
  backgroundColor:'#fff',
  url:'home.js',
  layout:'vertical',
  barColor:barColor
});
var homeTab = Titanium.UI.createTab({
  icon:'icons/home_30.png',
  title:'Home',
  window:homeWin
});
tabGroup.addTab(homeTab);
var nearbyWin = Titanium.UI.createWindow({
  title:'Nearby',
  backgroundColor:'#fff',
  url:'map.js',
  barColor:barColor
});
var nearbyTab = Titanium.UI.createTab({
  icon:'icons/nearby_30.png',
  title:'Nearby',
  window:nearbyWin
});
tabGroup.addTab(nearbyTab);
var favoritesWin = Ti.UI.createWindow({
  title:'Favorites',
  backgroundColor:'#fff',
  url:'projects.js',
  barColor:barColor
});
var favoritesTab = Titanium.UI.createTab({
  icon:'icons/favorites_30.png',
  title:'Favorites',
  window:favoritesWin
});
tabGroup.addTab(favoritesTab);
var searchWin = Titanium.UI.createWindow({
  title:'Search',
  backgroundColor:'#fff',
  url:'search.js',
  barColor:barColor
});
var searchTab = Titanium.UI.createTab({
  icon:'icons/search_30.png',
  title:'Search',
  window:searchWin
});
tabGroup.addTab(searchTab);
tabGroup.open();
Ti.API.info("module is => " + sharekit);
sharekit.configure({
  my_app_name: 'stagey',
  my_app_url: 'http://www.stagey.net',
  share_menu_alphabetical_order: true,
  hide_more_button: false,
  shared_with_signature: false,
  sharers_plist_name: '/Sharers.plist',
  twitter_consumer_key: '0b8vwDL8LYPLmyNDRyjXA',
  twitter_consumer_secret: 'Va533q2nMEPAx9QYXNbiP7BcWUHW6XGAJAoaBsBJg',
  twitter_callback_url: 'http://0x82.com/auth/twitter/callback',
  facebook_key: '396565060404796',
  facebook_secret: '4a745067aa494dec416dcf2e9f78e296',
  facebook_use_session_proxy: false,
  facebook_session_proxy_url: '',
  authorizeWithFBAppAuth:'YES',
  safariAuth:'NO',
  evernote_user_store_url: 'https://sandbox.evernote.com/edam/user',
  evernote_net_store_url: 'http://sandbox.evernote.com/edam/note/',
  evernote_consumer_key: 'benhill',
  evernote_secret: 'fab3cc8c0ba19eda',
  linked_in_consumer_key: '6yz412ppfaj6',
  linked_in_secret: 'hKc1seyRJq61BjKi',
  linked_in_callback_url: 'http://linkedin.com',
  bar_style: "UIBarStyleDefault",
  form_font_color_red: -1,
  form_font_color_green: -1,
  form_font_color_blue: -1,
  form_bg_color_red: -1,
  form_bg_color_green: -1,
  form_bg_color_blue: -1,
  ipad_modal_presentation_style: "UIModalPresentationFormSheet",
  ipad_modal_transition_style: "UIModalTransitionStyleCoverVertical",
  use_placeholders: true,
  max_fav_count: 3,
  allow_offline: true,
  allow_auto_share: true
});