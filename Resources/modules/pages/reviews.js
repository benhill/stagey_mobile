function ReviewsWindow(user_id, project){

  var styles = require('modules/styles/styles');
  var reviewsStyles = require('modules/styles/reviews');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var table = Ti.UI.createTableView(reviewsStyles.table);
  var page = 1
  var rows_per_page = 9
  
  self.load = function(){
    url = getUrl();

    var xhr =  Ti.Network.createHTTPClient({
      onload: function(){ 
        var tableData = []

        reviews = JSON.parse(this.responseText).reviews;

        if (reviews.length > 0){var total_results = reviews[0].total_results;}

        for(i = 0; i < reviews.length; i++){
          review = reviews[i];

          var row = Ti.UI.createTableViewRow(reviewsStyles.row);
          row.link = 'review.js';      
          row.review = review;   

          var imageLabel = Ti.UI.createImageView(reviewsStyles.imageLabel);
          if(user_id || project == null){
            imageLabel.image = review.project_image_url;
          }
          else{
            imageLabel.image = review.reviewer_image_url;
          }
          row.add(imageLabel);
          
          var project_title;
          (review.project_title.length >= 30) ? project_title = review.project_title.substr(0,25) + "..." : project_title = review.project_title;

          var reviewer_name;
          reviewer_name = review.reviewer_first_name + " " + review.reviewer_last_name.substr(0,1);

          var nameLabel = Ti.UI.createLabel(reviewsStyles.nameLabel);
          if(user_id || project == null){
            nameLabel.text = project_title;
          }
          else{
            nameLabel.text = reviewer_name;
          }
          row.add(nameLabel);

          var date = Ti.UI.createLabel(reviewsStyles.date);
          date.text = review.time_passed + " ago";
          if(project == null && user_id == null){date.text += " by " + reviewer_name};
          row.add(date);

          var blurb = Ti.UI.createLabel(reviewsStyles.blurb);
          if(review.body){
            blurb.text = review.body.substr(0,80).replace(/\n/gm, '').replace(/\r/gm, ' ') + '...';
          }
          row.add(blurb);

          tableData.push(row);

          row.addEventListener('click', function(e){
            loadReview(e);
          });      

        };

        var row = Ti.UI.createTableViewRow(reviewsStyles.moreRow);

        var moreLabel = Ti.UI.createLabel(reviewsStyles.moreLabel);

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
        self.add(table);
        spinner.hide();
      },
      onerror: function(){
        Ti.API.debug("STATUS: " + this.status);
        Ti.API.debug("TEXT:   " + this.responseText);
        Ti.API.debug("ERROR:  " + e.error);
        alert('There was an error retrieving the remote data. Try again.');
      },
      timeout:5000
    });

    function loadReview(e, islongclick) { 
      app.openWindow('Show Review', 'review', [e.rowData.review.id]);
    }

    function loadMore(e,islongclick){

      table.deleteRow(rows_per_page * (page-1),{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE})

      var row = Ti.UI.createTableViewRow(reviewsStyles.moreRow);

      var spinner = Ti.UI.createActivityIndicator(reviewsStyles.spinner);
      row.add(spinner);
      spinner.show();

      table.appendRow(row);
      table.scrollToIndex((page * rows_per_page) - rows_per_page);

      if(user_id){var url = getUrl() + "&page=" + page;}
      else{var url = getUrl() + "?page=" + page;}  

      xhr.open("GET", url);
      xhr.send();
    }

    xhr.open("GET", url);
    xhr.send();

    function getUrl(){
      if(user_id){
        url = app.api_url + "reviews?user_id=" + user_id + ".json"
      }
      else if(project){    
        url = app.api_url + "reviews/" + project.id + ".json"
      }
      else{
        url = app.api_url + "reviews.json"
      }
      return url
    }

    self.add(spinner);
    spinner.show();
  }

  return self;
}

module.exports = ReviewsWindow;