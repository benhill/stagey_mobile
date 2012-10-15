function Header(){

  var styles = require('modules/styles/styles');
  var pickerStyles = require('modules/styles/select_box');

  var headerView = Ti.UI.createView({
    top:0,
    height:50,
    width:'100%',
    backgroundColor:'black'
  })

  var headerLabel = Ti.UI.createLabel({
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    text:'Hello',
    color:'white'
  })

  headerView.add(headerLabel)


	return headerView;
}

module.exports = Header;