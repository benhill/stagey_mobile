styles = {

	pickerView: {
    height:251,    
    zIndex:100
  },

  cancel: {
    title:'Cancel',
    style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
  },

  done: {
    title:'Done',
    style:Titanium.UI.iPhone.SystemButtonStyle.DONE
  },

  spacer: {
    systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
  },

  toolbar: {
    top:0    
  },

  picker: {
    top:43    
  },

  slide_in: {
    bottom:0
  },

  slide_out: {
    bottom:-251
  }

}

exports.pickerView = styles.pickerView;
exports.cancel = styles.cancel;
exports.done = styles.done;
exports.spacer = styles.spacer;
exports.toolbar = styles.toolbar;
exports.picker = styles.picker;
exports.slide_in = styles.slide_in;
exports.slide_out = styles.slide_out;