function ReviewsWindow(user_id, project){

  var styles = require('modules/styles/styles');
  var reviewsStyles = require('modules/styles/reviews');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var table = Ti.UI.createTableView(reviewsStyles.table);
  var page = 1
  var rows_per_page = 9
  
  self.load = function(){
    url = getUrl();

    var reviewsObj = require('modules/models/reviews');
    new reviewsObj(url, function(reviews){
      if(reviews.length > 0){
        loadReviews(reviews);
      }
      else{
        noDataLabel = Ti.UI.createLabel(styles.noDataLabel);
        noDataLabel.text = "No reviews listed...";
        self.add(noDataLabel);
        spinner.hide();
      }
    });

    function loadReviews(reviews){

      var titleView = Ti.UI.createView(styles.titleView);
      titleView.top = 50;

      var project_title;
      var subtitle;
      var title;

      if(user_id){
        title = 'REVIEWS BY ' + reviews[0].reviewer_first_name.toUpperCase() + " " + reviews[0].reviewer_last_name.substr(0,1).toUpperCase();
        subtitle = 'sorted by date posted';
      }
      else if(project){
        (reviews[0].project_title.length >= 50) ?  project_title = reviews[0].project_title.substr(0,50) + "..." :  project_title = reviews[0].project_title;
        title = 'SHOW REVIEWS ';
        subtitle = 'for ' + project_title.toLowerCase();
      }
      else{
        title = 'RECENT REVIEWS';
        subtitle = 'sorted by date posted';
      }

      var titleLabel = Ti.UI.createLabel(styles.titleLabel);
      titleLabel.text = title;
      titleView.add(titleLabel);

      var subTitleLabel = Ti.UI.createLabel(styles.subTitleLabel);
      subTitleLabel.text = subtitle;
      titleView.add(subTitleLabel);

      self.add(titleView);

      var total_results = reviews[0].total_results;

      var tableData = [];

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
        (review.project_title.length >= 30) ? project_title = review.project_title.substr(0,30) + "..." : project_title = review.project_title;

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
          blurb.text = review.body.substr(0,130).replace(/\n/gm, '').replace(/\r/gm, ' ') + '...';
        }
        row.add(blurb);

        var carrotImage = Ti.UI.createImageView(reviewsStyles.carrotImage);
        row.add(carrotImage);

        row.height = row.toImage().height + 8;

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
    }

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

      var reviewsObj = require('modules/models/reviews');
      new reviewsObj(url, function(reviews){
        loadReviews(reviews);
      });
    }

    function getUrl(){
      if(user_id){
        url = app.api_url + "reviews?user_id=" + user_id;
      }
      else if(project){    
        url = app.api_url + "reviews/" + project.id;
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