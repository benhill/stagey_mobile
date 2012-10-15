function AddReviewWindow(title, containingTab, project){

  var styles = require('modules/styles/styles');
  var addReviewStyles = require('modules/styles/add_review');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;
  var addReviewObj = require('modules/models/add_review');

  self.load = function(){
    var buttonSave = Ti.UI.createButton(addReviewStyles.buttonSave);
    self.add(buttonSave);

    var tabRating = Titanium.UI.iOS.createTabbedBar(addReviewStyles.tabRating);
    self.add(tabRating);

    var labelBody = Ti.UI.createLabel(addReviewStyles.labelBody);
    self.add(labelBody);

    var textBody = Titanium.UI.createTextArea(addReviewStyles.textBody);
    self.add(textBody);

    buttonSave.addEventListener('click', function(e){
      new addReviewObj(project.id, tabRating.value, textBody.value, function(results){
        if(results.id){
          alert('The Review has been Added');
          
          params = ['Project', containingTab, project.id];
          app.openWindow('project', containingTab, params);
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