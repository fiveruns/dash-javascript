(function($) {
  
  var dashCache = {};
  var dashListeners = {};
  
  var defaults = function() {
    return {
        token: '',
        metric: '',
        window: 0,
        // dashHost: 'http://dash-api.fiveruns.com'
        dashHost: 'http://localhost:3000'
    };
  };
  
  var apiUrl = function(options) {
    return options.dashHost + 
           '/apps/' + 
           options.token +
           '/data-v1.js';
  };
  
  var extractParams = function(options) {
    params = {callback: '$.dashRouter'};
    
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
  
  var requestKey = function(token, metric, window) {
    return token + "-" + metric + "-" + window;
  };
  
  var addListener = function(params, callback) {
    var key = requestKey(params.token, params.metric, params.window);
    if (dashListeners[key] != null) {
      dashListeners[key].push(callback);
    } else {
      dashListeners[key] = [callback];
    }
  };
  
  $.dashRouter = function(obj) {
    var key = requestKey(obj.token, obj.metricName, obj.window);
    $.each(dashListeners[key], function(_, callback) { callback(obj); });
  };
  
  $.fn.dash = function(options, callback) {
    var options = $.extend(defaults(), options ? options : {});
    var el = this;
    var params = extractParams(options);
    
    var handler = function(obj) {
      console.log('borp');
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
    };
    
    addListener(options, handler);
    
    this.each(function() {
      $.ajax({type: 'GET',
              url: apiUrl(options),
              data: params,
              dataType: 'script',
              // success: handler,
              cache: true});
    });
    
    return this;
  };
  
})(jQuery);
