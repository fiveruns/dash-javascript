(function($) {
  var defaults = function() {
    return {
      apiToken: '',
      metric: '',
      dashHost: 'http://dash.fiveruns.com'
    };
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

  $.dash = {
    fetchLatest: function(options, callback) {
      options = $.extend(defaults(), options ? options : {});
      
      $.getJSON(apiUrl(options), extractParams(options), function(obj) {
        var value = obj.data.pop().pop();
        var label = obj.metric;
        callback({value: value, label: label});
      });
    },
    
    fetch: function(options, callback) {
      options = $.extend(defaults(), options ? options : {});
      
      $.getJSON(apiUrl(options), extractParams(options), function(obj) {
        var data = obj.data;
        callback(data);
      });
    }
  };
})(jQuery);
