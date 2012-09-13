function ProjectsWindow(title, containingTab, mode, startProjects){

  var styles = require('modules/styles/styles');
  var projectsStyles = require('modules/styles/projects');

  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;
  var projectsObj = require('modules/models/projects');
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var table = Titanium.UI.createTableView();
  var currentTab = Ti.UI.currentTab;
  var page = 1
  var rows_per_page = 9
  var seed, total_results, startProjects;

  self.load = function(){

    var url = setUrl();

    new projectsObj(url, function(results){
      loadProjects(results);
    });

    function loadProjects(results){
      startProjects ? projects = startProjects : projects = results;
      startProjects = null;
      var tableData = [];
        
      if (projects.length > 0){
        total_results = projects[0].total_results;
        seed = projects[0].seed;
      }

      for(i = 0; i < projects.length; i++){

        var project = projects[i];      
        var row = Ti.UI.createTableViewRow(projectsStyles.row);
        row.project_id = project.id;

        projectsStyles.projectThumb.image = project.thumbnail;
        projectsStyles.projectThumb.project_id = project.id;
        var projectThumb = Titanium.UI.createImageView(projectsStyles.projectThumb);  

        row.add(projectThumb);         

        (project.title.length >= 30) ? title = project.title.substr(0,25) + "..." : title = project.title;

        projectsStyles.nameLabel.text = title.toLowerCase();
        projectsStyles.nameLabel.project_id = project.id;
        var nameLabel = Ti.UI.createLabel(projectsStyles.nameLabel);

        row.add(nameLabel);

        projectsStyles.infoLabel.text = project.cat_name + " \u00B7 " + project.cost_range + " \u00B7 " + project.duration
        projectsStyles.infoLabel.project_id = project.id;
        var infoLabel = Ti.UI.createLabel(projectsStyles.infoLabel);

        row.add(infoLabel);
        tableData.push(row);

        row.addEventListener('click', function(e){
          loadProject(e);
        });
      }

      var row = Ti.UI.createTableViewRow(projectsStyles.row);
      var moreLabel = Ti.UI.createLabel(projectsStyles.moreLabel);
      row.add(moreLabel);

      row.addEventListener('click', function(e){
        page += 1;
        loadMore(e);
      });

      if(page * rows_per_page < total_results){
        tableData.push(row);
      }

      if(page > 1){      
        table.deleteRow(rows_per_page * (page-1),{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE})

        for(var i = 0; i < tableData.length; i++){
          table.appendRow(tableData[i]);
        }

        table.scrollToIndex((page * rows_per_page) - rows_per_page);
      }
      else {
        table.setData(tableData);
        self.add(table);
      }    

      spinner.hide();  
    }

    function loadProject(e, islongclick){
      var projectObj = require('modules/pages/project');
      var projectWindow = new projectObj('Project', containingTab, e.source.project_id);
      projectWindow.layout = 'vertical';
      containingTab.open(projectWindow);
      projectWindow.load();
    }

    function loadMore(e,islongclick){
      table.deleteRow(rows_per_page * (page-1),{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE})
      var row = Ti.UI.createTableViewRow(projectsStyles.row);
      var spinner = Ti.UI.createActivityIndicator(projectsStyles.spinner);

      row.add(spinner);
      spinner.show();

      table.appendRow(row);

      table.scrollToIndex((page * rows_per_page) - rows_per_page);
      
      var url = setUrl();
      url += "&seed=" + seed + "&page=" + page;

      new projectsObj(url, function(results){
        loadProjects(results);
      });
    }

    spinner.show();
    self.add(spinner);
  }

  function setUrl(){
    if(mode == 'venue'){
      url = "http://www.gwahir.com:3000/api/projects.json?venue_id=" + self.venue_id + "&event_id=7";
    }  
    else if(mode == 'cat'){
      url = "http://www.gwahir.com:3000/api/projects.json?cat_id=" + self.cat_id + "&event_id=7";
    }
    else if(mode == 'favorites'){    
      url = "http://www.gwahir.com:3000/api/favorites.json?email=" + Ti.App.currentUser.email + "&password=" + Ti.App.userPassword;
    }
    else {
      url = "http://www.gwahir.com:3000/api/projects.json&event_id=7";
    }

    return url;
  }
  
  return self;
}

module.exports = ProjectsWindow;