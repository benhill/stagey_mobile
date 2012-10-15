exports = {
 
  email: {
    color:'#336699', 
    height:35, 
    width:300, 
    top:60,
    left:5,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    hintText:'Email Address'
  },

  password: {
    color:'#336699', 
    height:35, 
    width:300, 
    top:105,
    left:5,
    clearOnEdit:true,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    passwordMask:true,
    hintText:"Password"
  },

  loginButton: {
    title: 'Login',
    top:150,
    left:5
  },

  addUserLabel: {
    top:200,
    left:5,
    text:'Create an Account',
    width:Ti.UI.SIZE,
    height:Ti.UI.SIZE,
    font:{fontSize:14}
  }

}