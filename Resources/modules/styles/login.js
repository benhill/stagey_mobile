styles = {
 
  email: {
    color:'#336699', 
    height:45, 
    width:300, 
    top:10,
    left:5,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText:'Email Address'
  },

  password: {
    color:'#336699', 
    height:45, 
    width:300, 
    top:55,
    left:5,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    passwordMask:true,
    hintText:"Password"
  },

  loginButton: {
    title: 'Login',
    top:100,
    left:5
  },

  addUserLabel: {
    top:150,
    left:5,
    text:'Create an Account',
    width:Ti.UI.SIZE,
    height:Ti.UI.SIZE,
    font:{fontSize:14},
    color:'black'
  }

}

exports.email = styles.email;
exports.password = styles.password;
exports.loginButton = styles.loginButton;
exports.addUserLabel = styles.addUserLabel;