function ButtonBar(tabNames, callback){

  var currbutton;
  var width = String(100/tabNames.length) + '%';
  var buttons = [];
  
  var buttonBarStyles = require('modules/styles/button_bar');

  var buttonBar = Ti.UI.createView(buttonBarStyles.buttonBar);

  for(var i=0; i < tabNames.length; i++){    

    tabName = tabNames[i];

    var button = Ti.UI.createView(buttonBarStyles.button);
    button.width = width;

    var buttonLabel = Ti.UI.createLabel(buttonBarStyles.buttonLabel);
    buttonLabel.text = tabName;
    button.add(buttonLabel);

    buttonBar.add(button);    

    if(i==0){selectButton(button)};

    buttons.push(button);

    button.addEventListener('click', function(e){
      selectButton(e.source);
    })
  } 

  function selectButton(button){
    if(currbutton){
      currbutton.backgroundColor = 'black';
      currbutton.children[0].color = 'gray';
    }
    
    button.toString == "[object TiUILabel]" ? newbutton = button.parent : newbutton = button;
    newbutton.backgroundColor = 'white';
    newbutton.children[0].font = {fontWeight:'bold'}
    newbutton.children[0].color = 'black';    
    currbutton = newbutton;
    callback(newbutton.children[0].text);
  }  

  return buttonBar
}

module.exports = ButtonBar;