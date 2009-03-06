---
layout: default
title: dash-javascript
---
      
<div class="description">
  Access data from your apps in Dash from JavaScript.
</div>

**Important!** I applaud your enthusiasm, but you're early. This is a work in progress and may change a lot in the next couple days.

## Dependencies

jQuery &gt;= 1.3.1 (may work with jQuery 1.2.6)

## Examples

`dash-javascript` makes it easy to fetch data from Dash for use in your application. You can fetch the latest value for any metric, fetch the values for a metric between some time range using a specific time window, or you can fetch data and metadata related to some metric within a time range and window.

### For the impatient

* Use `.dash(options, callback)` to fetch data from Dash. 
* Required keys are `api_token`, `fetch`, and `metric_name`.
* Depending on which `fetch` parameter you use, your callback function will either receive a single value, an array of values, or an object.
* In your callback, `this` will refer to an element matching your selector.

Fetching the most recent value for the `cpu` metric:

{% highlight html %}
<div id="demo0">
  Latest CPU value: 
</div>
{% endhighlight %}

{% highlight javascript %}
$('#demo0').dash({fetch: 'latest', apiToken: token, 'metric_name': 'cpu'},
  function(value) {
    $(this).append(value);
});
{% endhighlight %}

<div id="demo0">
  Latest CPU value: 
</div>

Fetching a data series:

{% highlight html %}
<div id="demo1">
  Recent CPU values:
</div>
{% endhighlight %}

{% highlight javascript %}

$('#demo1').dash({fetch: 'series', apiToken: token, 'metric_name': 'cpu'},
  function(values) {
    $(this).append(values.join(','));
  });

{% endhighlight %}

<div id="demo1">
  Recent CPU values:
</div>

Fetching metadata and metric data:

{% highlight javascript %}
$('#demo2').dash({fetch: 'all', apiToken: token, 'metric_name': 'cpu'},
  function(obj) {
    $(this).children('h4').replaceWith("<h4>" + obj.metric + " from " + obj.app + "</h4>");
    $(this).children('.values').append("Most recent value: " + obj.data[0][1]);
  });
{% endhighlight %}

{% highlight html %}
<div id="demo2">
  <h4>Placeholder</h4>
  
  <p class="values"></p>
</div>
{% endhighlight %}

<div id="demo2">
  <h4>Placeholder</h4>
  
  <p class="values"></p>
</div>

### Dash options

<table>
  <thead>
    <th>`fetch` option</th>
    <th>Callback arguments</th>
  </thead>
  
  <tbody>
    <tr>
      <td>`latest`</td>
      <td>The latest value for the specified metric.</td>
    </tr>
    <tr>
      <td>`series`</td>
      <td>An array of data values for the specified metric.</td>
    </tr>
    <tr>
      <td>`all`</td>
      <td>Metric metadata plus the data values.</td>
    </tr>
  </tbody>
</table>

### The Dash response object

## Contact

FiveRuns Development Team (dev@fiveruns.com)

## Download

You can download this project in either <a href="http://github.com/fiveruns/dash-javascript/zipball/master">zip</a> or <a href="http://github.com/fiveruns/dash-javascript/tarball/master">tar</a> formats.

You can also clone the project with <a href="http://git-scm.com">Git</a> by running:

    $ git clone git://github.com/fiveruns/dash-javascript

See the [README](http://github.com/fiveruns/dash-javascript/tree/master "fiveruns's dash-javascript at master - GitHub") file for license and author info.

<script type="text/javascript" charset="utf-8">
  
  $(function() {
    var token = 'b1b546e3b454d17cd7a61987e9d8087c2eca0336';
    
    $('#demo0').dash({fetch: 'latest', apiToken: token, 'metric_name': 'cpu'},
      function(value) {
        $(this).append(value);
      });
    
    $('#demo1').dash({fetch: 'series', apiToken: token, 'metric_name': 'cpu'},
      function(values) {
        $(this).append(values.join(','));
      });
      
    $('#demo2').dash({fetch: 'all', apiToken: token, 'metric_name': 'cpu'},
      function(obj) {
        $(this).children('h4').replaceWith("<h4>" + obj.metric + " from " + obj.app + "</h4>");
        $(this).children('.values').append("Most recent value: " + obj.data[0][1]);
      });
  });
  
</script>
