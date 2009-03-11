(function($) {
  var defaults = function() {
    return {
        token: '',
        metric: '',
        dashHost: 'http://dash-api.fiveruns.com'
    };
  };
  
  var apiUrl = function(options) {
    return options.dashHost + 
           '/apps/' + 
           options.token + 
           '/data-v1.js?callback=?';
  };
  
  var extractParams = function(options) {
    params = {};
    
    for (name in options) {
      switch (name) {
        case 'window':
          params['window'] = options['window'];
          break;
        case 'metric':
          params['metric_name'] = options['metric'];
        default:
          // Skip it
          break;
      }
    }
    
    return params;
  };
  
  $.fn.dash = function(options, callback) {
    var options = $.extend(defaults(), options ? options : {});
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
            var value = obj.data.reverse().pop().pop();
            callback.apply(el, [value]);
            break;
          default:
            throw "Invalid Dash fetch option";
            break;
        };
      });
    });
    
    return this;
  };
  
})(jQuery);
