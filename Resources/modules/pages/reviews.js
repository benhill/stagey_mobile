function ReviewsWindow(user_id, project_id){

  var app = require('modules/core');
  var styles = require('modules/styles/styles');
  var reviewsStyles = require('modules/styles/reviews');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var table = Ti.UI.createTableView(reviewsStyles.table);
  var page = 1
  var rows_per_page = 9
  var lastDistance = 0;
  var updating = false;
  var lastRow = rows_per_page;
  
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
        var fullName = (reviews[0].reviewer_first_name +  ' ' + reviews[0].reviewer_last_name).toUpperCase();
        if(fullName.length > 25){fullName = fullName.substr(0,24) + '...';}
        title = 'reviews by\n' + fullName;        
        if(Ti.Platform.name != 'iPhone OS'){titleView.height = 62;};
      }
      else if(project_id){
        (reviews[0].project_title.length >= 50) ?  project_title = reviews[0].project_title.substr(0,50) + "..." :  project_title = reviews[0].project_title;
        title = 'SHOW REVIEWS ';
        subtitle = 'for ' + project_title.toLowerCase();
      }
      else{
        title = 'RECENT REVIEWS';
        subtitle = 'sorted by date posted';
      }
      if(subtitle){subtitle.bottom = 10;};

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
        row = createRow(reviews[i]);
        tableData.push(row);
      };      

      function createRow(review){        

        var row = Ti.UI.createTableViewRow(reviewsStyles.row);        
        row.link = 'review.js';      
        row.review = review;   

        var imageLabel = Ti.UI.createImageView(reviewsStyles.imageLabel);
        if(user_id || project_id == null){imageLabel.image = review.project_image_url;}
        else{imageLabel.image = review.reviewer_image_url;}
        row.add(imageLabel);
        
        var project_title;
        (review.project_title.length >= 30) ? project_title = review.project_title.substr(0,30) + "..." : project_title = review.project_title;

        var reviewer_name;
        reviewer_name = review.reviewer_first_name + " " + review.reviewer_last_name.substr(0,1);

        var nameLabel = Ti.UI.createLabel(reviewsStyles.nameLabel);
        if(user_id || project_id == null){
          nameLabel.text = project_title;
        }
        else{
          nameLabel.text = reviewer_name;
        }
        row.add(nameLabel);

        var date = Ti.UI.createLabel(reviewsStyles.date);
        date.text = review.time_passed + " ago";
        if(project_id == null && user_id == null){date.text += " by " + (reviewer_name.length > 15 ? reviewer_name.substr(0,14) + '...' : reviewer_name)};
        row.add(date);

        var rating = Ti.UI.createLabel(reviewsStyles.rating);        
        if(review.rating_text){
          rating.text = "Rating: " + review.rating_text;
          row.add(rating);
        }

        var blurb = Ti.UI.createLabel(reviewsStyles.blurb);
        if(review.body){blurb.text = review.body.substr(0,200).replace(/(\r\n|\n|\r)/gm,"") + '...';}
        row.add(blurb);

        var carrotImage = Ti.UI.createImageView(reviewsStyles.carrotImage);
        carrotImage.image = 'http://stagey-mobile.s3.amazonaws.com/more-arrow.png';
        row.add(carrotImage);

        //if(Ti.Platform.name == 'iPhone OS'){row.height = row.toImage().height + 8;}        

        row.addEventListener('click', function(e){
          loadReview(e);
        });

        return row;
      }
      
      table.setData(tableData);
      self.add(table);

      var loadingRow = Ti.UI.createTableViewRow({title:"Loading...", color:'black'});   
      
      function beginUpdate(){        
        if(reviews[0].total_results > (page * rows_per_page)){
          page += 1;
          updating = true;

          table.appendRow(loadingRow);

          if(user_id){var url = getUrl() + "&page=" + page;}
          else{var url = getUrl() + "?page=" + page;}  

          new reviewsObj(url, function(reviews){
            var rows = [];
            for (var i = 0; i < reviews.length; i++){
              row = createRow(reviews[i]);
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
      
      self.add(table);
      spinner.hide();  
    }

    function loadReview(e, islongclick) { 
      app.openWindow(self, 'Show Review', 'review', [e.row.review.id]);
    }

    function getUrl(){
      if(user_id){
        url = app.api_url + "reviews?user_id=" + user_id;
      }
      else if(project_id){    
        url = app.api_url + "reviews/" + project_id;
      }
      else{
        url = app.api_url + "reviews"
      }
      return url
    }

    self.add(spinner);
    spinner.show();
  }

  return self;
}

module.exports = ReviewsWindow;