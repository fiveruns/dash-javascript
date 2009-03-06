(function($) {
  var defaults = {
      apiToken: '',
      metric: '',
      dashHost: 'http://dash.fiveruns.com'
  };
  
  var apiUrl = function(options) {
    return options.dashHost + 
           '/apps/' + 
           options.apiToken + 
           '/data-v1.js?callback=?';
  };
  
  var extractParams = function(options) {
    var paramNames = ['start_at', 'stop_at', 'window', 'metric_name'];
    params = {};
    
    for (name in options) {
      if (jQuery.inArray(name, paramNames) > 0) {
        params[name] = options[name];
      }
    }
    
    return params;
  };
  
  $.fn.dash = function(options, callback) {
    var options = $.extend(defaults, options ? options : {});
    var el = this;
    
    this.each(function() {
      $.getJSON(apiUrl(options), extractParams(options), function(obj) {
        switch (options.fetch) {
          case "all":
            callback.apply(el, [obj]);
            break;
          case "series":
            var datum = $.map(obj.data, function(i) { return i[1]; });
            callback.apply(el, [datum]);
            break;
          case "latest":
            var value = obj.data.pop().pop();
            callback.apply(el, [value]);
            break;
          default:
            // Raise an error
            break;
        };
      });
    });
    
    return this;
  };
  
})(jQuery);
