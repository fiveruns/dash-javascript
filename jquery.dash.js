(function($) {
  
  var dashListeners = {};
  
  var defaults = function() {
    return {
        token: '',
        metric: '',
        window: 0,
        dashHost: 'http://dash-api.fiveruns.com'
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
  
  var cacheKey = function(token, metric, window) {
    return token + "-" + metric + "-" + window;
  };
  
  var cacheKeyPending = function(params) {
    var key = cacheKey(params.token, params.metric, params.window);
    return dashListeners.hasOwnProperty(key) && dashListeners[key].length > 1;
  };
  
  var addListener = function(params, callback) {
    var key = cacheKey(params.token, params.metric, params.window);
    if (dashListeners[key] != null) {
      dashListeners[key].push(callback);
    } else {
      dashListeners[key] = [callback];
    }
  };
  
  $.dashRouter = function(obj) {
    var key = cacheKey(obj.token, obj.metricName, obj.window);
    $.each(dashListeners[key], function(_, callback) { callback(obj); });
    dashListeners[key] = [];
  };
  
  $.fn.dash = function(options, callback) {
    var options = $.extend(defaults(), options ? options : {});
    var el = this;
    var params = extractParams(options);
    
    var handler = function(obj) {
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
      if (!cacheKeyPending(options)) {
        $.ajax({type: 'GET',
                url: apiUrl(options),
                data: params,
                dataType: 'script',
                cache: true});
      }
    });
    
    return this;
  };
  
})(jQuery);
