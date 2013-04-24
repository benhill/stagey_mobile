styles = {

  emailLabel: {
    height:45,
    width:305,
    top:60,
    left:5,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText:'Email Address'
  },

  firstNameLabel: {
    height:45,
    width:150,
    top:115,
    left:5,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText:'First Name'
  },

  lastNameLabel: {
    height:45,
    width:150,
    top:115,
    left:165,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText:'Last Name'
  },

  passwordLabel: {
    height:45,
    width:305,
    top:170,
    left:5,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    passwordMask:true,
    hintText:"Password"
  },

  addUserButton: {
    title: 'Create Account',
    bottom:10,
    width:300
  }

}

exports.emailLabel = styles.emailLabel;
exports.firstNameLabel = styles.firstNameLabel;
exports.lastNameLabel = styles.lastNameLabel;
exports.passwordLabel = styles.passwordLabel;
exports.addUserButton = styles.addUserButton;