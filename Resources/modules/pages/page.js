function PageWindow(page_id){

  var app = require('modules/core');
  var styles = require('modules/styles/styles');
  var pageStyles = require('modules/styles/page');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var pageScroll = Ti.UI.createScrollView(pageStyles.pageScroll);
  var wrapper = Ti.UI.createView(pageStyles.wrapper);  
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);

  self.load = function(){
    spinner.show();
    self.add(spinner);

    var pageObj = require('modules/models/page');
    new pageObj(page_id, function(page){
      loadPage(page);
    })
  }

  function loadPage(page){

    var titleView = Ti.UI.createView(styles.titleView);
    titleView.top = 0;
    titleView.layout = 'absolute';
    titleView.zIndex = 1000;
        
    var nameLabel = Ti.UI.createLabel(pageStyles.nameLabel);
    (page.title >= 40) ? title = page.title.substr(0,40) + "..." : title = page.title;
    nameLabel.text = title.toUpperCase();
    titleView.add(nameLabel);

    var projectLabel = Ti.UI.createLabel(pageStyles.projectLabel);
    projectLabel.text = "posted by " + page.project_title + " on " + page.formatted_date
    titleView.add(projectLabel);

    titleView.addEventListener('click', function(e){
      app.openWindow('Project', 'project', [page.project_id]);
    });

    pageScroll.add(titleView);

    var bodyWrapper = Ti.UI.createView(pageStyles.bodyWrapper);

    var body = Ti.UI.createLabel(pageStyles.body);
    body.text = page.body,
    bodyWrapper.add(body);

    wrapper.add(bodyWrapper);    

    var buttonsWrapper = Ti.UI.createView(pageStyles.buttonsWrapper)
    
    var view_project =  Ti.UI.createButton(pageStyles.view_project);
    buttonsWrapper.add(view_project);

    view_project.addEventListener('click', function(e){
      app.openWindow('Project', 'project', [page.project_id]);
    });

    self.add(buttonsWrapper);
    
    pageScroll.add(wrapper);

    self.add(pageScroll);

    spinner.hide();
  }

  return self;
}

module.exports = PageWindow;