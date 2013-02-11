function AddReviewWindow(project){

  var app = require('modules/core');
  var styles = require('modules/styles/styles');
  var addReviewStyles = require('modules/styles/add_review');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var addReviewObj = require('modules/models/add_review');  

  self.load = function(){
    var buttonSave = Ti.UI.createButton(addReviewStyles.buttonSave);
    self.add(buttonSave);

    var tabBar = Ti.UI.createView(addReviewStyles.tabBar);
    self.add(tabBar);

    var tab1 = Ti.UI.createView(addReviewStyles.tab1);

    var tab1Label = Ti.UI.createLabel(addReviewStyles.tab1Label);
    tab1.add(tab1Label);
    tabBar.add(tab1);

    var spacer = Ti.UI.createView(addReviewStyles.spacer);
    tabBar.add(spacer);

    var tab2 = Ti.UI.createView(addReviewStyles.tab2);

    var tab2Label = Ti.UI.createLabel(addReviewStyles.tab2Label);
    tab2.add(tab2Label);
    tabBar.add(tab2);

    var spacer = Ti.UI.createView(addReviewStyles.spacer);
    tabBar.add(spacer);

    var tab3 = Ti.UI.createView(addReviewStyles.tab3);

    var tab3Label = Ti.UI.createLabel(addReviewStyles.tab3Label);
    tab3.add(tab3Label);
    tabBar.add(tab3);
     
    self.add(tabBar);

    var currTab = tab1;

    var tabs = [tab1, tab2, tab3];
    for(var i=0; i < tabs.length; i++){
      var tab = tabs[i];
      tab.addEventListener('click', function() {
        currTab.backgroundColor = 'black';
        currTab.children[0].color = 'gray';
        this.toString == "[object TiUILabel]" ? newTab = this.parent : newTab = this;
        newTab.backgroundColor = 'gray';
        newTab.children[0].color = 'white';
        currTab = newTab;
      });
    }

    var labelBody = Ti.UI.createLabel(addReviewStyles.labelBody);
    self.add(labelBody);

    var textBody = Titanium.UI.createTextArea(addReviewStyles.textBody);
    app.addKeyboardToolbar(textBody);
    self.add(textBody);

    buttonSave.addEventListener('click', function(e){
      new addReviewObj(project.id, currTab.value, textBody.value, function(results){
        if(results.id){
          alert('The Review has been Added');
          app.openWindow(self, 'Project', 'project', [project.id]);
        }
        else{
          alert('there was an issue adding this review');
        }
      });
    });
  }

  return(self);
}

module.exports = AddReviewWindow;