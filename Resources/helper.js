var barColor = 'black';
var default_search_text = 'search for a show';
function addKeyboardToolbar(textbox){
  var flexSpace = Ti.UI.createButton({
    systemButton:Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
    right:0
  });
  var doneButton = Ti.UI.createButton({
    systemButton:Ti.UI.iPhone.SystemButton.DONE,
    right:0
  });
  textbox.keyboardToolbar = [flexSpace, doneButton];
  textbox.addEventListener('focus', function(e) {
    textbox.keyboardToolbar = [flexSpace, doneButton];
    doneButton.activeFld = textbox;
  });
  doneButton.addEventListener('click', function(e) {
    e.source.activeFld.blur();
  });
};
function Icon(text, image, window, object){
   this.text = text;
   this.image = image;
   this.window = window;
   this.object = object;
}
var spinner = Ti.UI.createActivityIndicator({
  width:50,
  height:50,  
  top:150,
  message: 'loading...',
  color: 'black',
  style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
})
var sharekit = require('com.0x82.sharekit');
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