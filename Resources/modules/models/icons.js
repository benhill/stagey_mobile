function Icon(text, image, window, object, auth_required, third_param, id){
  this.text = text;
  this.image = image;
  this.window = window;
  this.object = object;
  this.auth_required = auth_required;
  this.third_param = third_param;
  this.id = id;
}

module.exports = Icon