function Icon(text, image, window, object, auth_required){
  this.text = text;
  this.image = image;
  this.window = window;
  this.object = object;
  this.auth_required = auth_required;
}

module.exports = Icon