function Icon(text, image, window, object, auth_required, third_param){
  this.text = text;
  this.image = image;
  this.window = window;
  this.object = object;
  this.auth_required = auth_required;
  this.third_param = third_param;
}

module.exports = Icon