function ProjectsWindow(mode, startProjects, cat_id, venue_id){

  var styles = require('modules/styles/styles');
  var projectsStyles = require('modules/styles/projects');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var projectsObj = require('modules/models/projects');
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var table = Titanium.UI.createTableView(projectsStyles.table);
  var currentTab = Ti.UI.currentTab;
  var page = 1
  var rows_per_page = 9
  var seed, total_results, startProjects;

  self.load = function(){

    var url = setUrl();

    new projectsObj(url, function(results){
      if(startProjects && startProjects.length == 0){
        var noResultsLabel = Ti.UI.createLabel(projectsStyles.noResultsLabel);
        self.add(noResultsLabel);
        spinner.hide();
      }
      else{
      	loadProjects(results);        
      }
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

        (project.title.length >= 25) ? title = project.title.substr(0,25) + "..." : title = project.title;

        projectsStyles.nameLabel.text = title.toLowerCase();
        projectsStyles.nameLabel.project_id = project.id;
        var nameLabel = Ti.UI.createLabel(projectsStyles.nameLabel);
        row.add(nameLabel);

        var infoLabel = Ti.UI.createLabel(projectsStyles.infoLabel);
        infoLabel.text = project.cat_name 
        if(project.cost_range){infoLabel.text += " \u00B7 " + project.cost_range + " \u00B7 " + project.duration};
        infoLabel.project_id = project.id;
        row.add(infoLabel);

        var carrotImage = Ti.UI.createImageView(projectsStyles.carrotImage);
        carrotImage.project_id = project.id;
        row.add(carrotImage);

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
      app.openWindow('Project', 'project', [e.source.project_id])
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
      url = app.api_url + "projects?venue_id=" + venue_id;
    }  
    else if(mode == 'cat'){
      url = app.api_url + "projects?cat_id=" + cat_id;
    }
    else if(mode == 'favorites'){    
      url = app.api_url + "favorites?email=" + Ti.App.currentUser.email + "&password=" + Ti.App.userPassword;
    }
    else {
      url = app.api_url + "projects";
    }

    return url;
  }
  
  return self;
}

module.exports = ProjectsWindow;