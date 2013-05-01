Ti.UI.orientation = Ti.UI.PORTRAIT;

var mobileConfigObj = require('modules/models/mobile_config');
new mobileConfigObj(function(config){
  Ti.App.api_url = config.api_url;
  Ti.App.secure_api_url = config.secure_api_url;
  Ti.App.site_url = config.site_url;

  Ti.App.subscription_opt_out = config.subscription_opt_out;

  if(Ti.App.Properties.getString('currentUser')){
    Ti.App.currentUser = JSON.parse(Ti.App.Properties.getString('currentUser'));
  }

  Ti.App.token = '8kj@!!00990j34AdABCDEF87979878!'
  Ti.API.info("module is => " + sharekit);

  if(Ti.Platform.name == 'iPhone OS'){

    var sharekit = require('com.0x82.sharekit');

    sharekit.configure({
      my_app_name: 'HollywoodFringe',
      my_app_url: 'http://www.hollywoodfringe.org',
      share_menu_alphabetical_order: true,
      hide_more_button: false,
      shared_with_signature: false,
      sharers_plist_name: '/Sharers.plist',
      twitter_consumer_key: 'FzLrxzD2hduXgfG6jzVCRw',
      twitter_consumer_secret: 'SrRHc8GmnzRvmmRmWhlSwGJ2mgcsFhclqAbwyHtA',
      twitter_callback_url: 'http://0x82.com/auth/twitter/callback',
      facebook_key: '396565060404796',
      facebook_secret: '4a745067aa494dec416dcf2e9f78e296',
      facebook_use_session_proxy: false,
      facebook_session_proxy_url: '',
      authorizeWithFBAppAuth:'YES',
      safariAuth:'NO',
      evernote_user_store_url: 'https://sandbox.evernote.com/stageyadmin/user',
      evernote_net_store_url: 'http://sandbox.evernote.com/stageyadmin/note/',
      evernote_consumer_key: 'stageyadmin',
      evernote_secret: '781d1352654f4e1f',
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

    var testflight = require("com.0x82.testflight");
    testflight.takeOff('6ea7c45a611258af025dea6d421f5d22_MTQ4NjYwMjAxMi0xMC0yOCAxNzowNjo1OC4wNjU1NTE');
  }

  Ti.Geolocation.purpose = "Receive User Location";

  require('modules/core').openWindow(null, 'Home', 'shows', []);
});