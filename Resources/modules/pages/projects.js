function ProjectsWindow(mode, startProjects, cat_id, venue_id, user_id){

  var app = require('modules/core');
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
  var lastDistance = 0;
  var updating = false;
  var lastRow = rows_per_page;

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
            
        for(i = 0; i < projects.length; i++){
          row = createRow(projects[i])
          tableData.push(row);
        }        

        function createRow(project){
          
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
          carrotImage.image = 'http://stagey-mobile.s3.amazonaws.com/more-arrow.png';
          carrotImage.project_id = project.id;
          row.add(carrotImage);

          row.addEventListener('click', function(e){
            loadProject(e);
          });

          return row;          
        }
    
        table.setData(tableData);
        self.add(table);

        var loadingRow = Ti.UI.createTableViewRow({title:"Loading...", color:'black'});   
      
        function beginUpdate(){          
          if(projects[0].total_results > (page * rows_per_page)){
            page += 1;
            updating = true;

            table.appendRow(loadingRow);

            var url = setUrl();
            url += "&seed=" + seed + "&page=" + page;

            new projectsObj(url, function(projects){
              var rows = [];
              for (var i = 0; i < projects.length; i++){
                row = createRow(projects[i]);
                rows.push(row);              
              }            
              endUpdate(rows);
            });
          }
        }

        function endUpdate(rows){                
          updating = false;        
          table.appendRow(rows);
          table.deleteRow(lastRow);
          lastRow += rows_per_page;
        }

        table.addEventListener('scroll',function(e){
          app.dynamic_scoller(e, beginUpdate, updating, lastDistance, page)
        });
      }
      else{
        noDataLabel = Ti.UI.createLabel(styles.noDataLabel);
        noDataLabel.text = "No projects listed...";
        self.add(noDataLabel);
      }  

      spinner.hide();  
    }

    function loadProject(e, islongclick){
      app.openWindow('Project', 'project', [e.source.project_id])
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
    else if(user_id != null){
      url = app.api_url + "projects?user_id=" + user_id;
    }
    else {
      url = app.api_url + "projects";
    }

    return url;
  }
  
  return self;
}

module.exports = ProjectsWindow;