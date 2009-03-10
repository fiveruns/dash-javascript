---
layout: default
title: dash-javascript 0.5.0
---

`dash-javascript` makes it easy to fetch data from Dash for use in your application. You can fetch the latest value for any metric, fetch the values for a metric between some time range using a specific time window, or you can fetch data and metadata related to some metric within a time range and window.

The current version of `dash-javascript` is 0.5.0.

## Dependencies

jQuery &gt;= 1.3.1 (may work with jQuery 1.2.6)

## Examples

For the impatient:

* Use `.dash(options, callback)` to fetch data from Dash. 
* Required keys are `token`, `fetch`, and `metric`.
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

$('#demo1').dash({fetch: 'series', token: token, metric: 'cpu'},
  function(values) {
    $(this).append(values.join(','));
  });

{% endhighlight %}

<div id="demo1">
  Recent CPU values:
</div>

Fetching metadata and metric data:

{% highlight javascript %}
$('#demo2').dash({fetch: 'all', token: token, metric: 'cpu'},
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

The `dash` method takes a parameters object and a callback function. The value of the `fetch` key determines the data that is returned to your callback function.

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

In addition to `fetch`, other parameters are respected:

<table>
  <thead>
    <th>Parameter name</th>
    <th>Required/Default</th>
    <th>Meaning</th>
  </thead>
  
  <tbody>
    <tr>
      <td><code>metric</code></td>
      <td><strong>Yes</strong></td>
      <td>The name of the metric to fetch. This is specified when you define a recipe.</td>
    </tr>
    <tr>
      <td><code>token</code></td>
      <td><strong>Yes</strong></td>
      <td>This is the read token for your Dash application.</td>
    </tr>
    <tr>
      <td><code>window</code></td>
      <td>No/1 hour</td>
      <td>
        <p>
          This specifies the time window to use when fetching results. Dash stores metric data in different rollup intervals. This parameter specifies which roll-up to use.
        </p>
        
        <dl>
          <dt>0</dt>
          <dd>1 hour</dd>
          <dt>1</dt>
          <dd>12 hours</dd>
          <dt>2</dt>
          <dd>24 hours</dd>
          <dt>3</dt>
          <dd>48 hours</dd>
          <dt>4</dt>
          <dd>1 week</dd>
        </dl>
        
        <p>
          Note that you can, theoretically, request hour-resolution data for the past week, but you will still only get 60 data points.
        </p>
        
      </td>
    </tr>
    <tr>
      <td><code>start_at</code></td>
      <td>No/most recent</td>
      <td>This specifies a timestamp for the first data point you'd like to fetch.</td>
    </tr>
    <tr>
      <td><code>stop_at</code></td>
      <td>No/most recent</td>
      <td>This specifies a timestamp for the last data point you'd like to fetch.</td>
    </tr>
  </tbody>
</table>

### The Dash response object

The Dash API returns a JSON object. When the `fetch` parameter is `latest` or `series`, this object is filtered before your callback function is called. When you specify `all`, you will get the raw object.

<table>
  <thead>
    <th>Attribute name</th>
    <th>Description</th>
  </thead>
  
  <tbody>
    <tr>
      <td><code>metric</code></td>
      <td>The human-friendly description of the metric.</td>
    </tr>
    <tr>
      <td><code>app</code></td>
      <td>The name of the application this metric belongs to.</td>
    </tr>
    <tr>
      <td><code>data</code></td>
      <td>An array of two-tuples. Each entry in the array is a data point. The tuple is of the form <code>[timestamp, metric value].</code></td>
    </tr>
    <tr>
      <td><code>unit</code></td>
      <td>A label for the units of the fetched metric. For example, <code>cpu</code> is in "%", <code>vsz</code> (virtual memory size) is in kilobytes, etc.</td>
    </tr>
  </tbody>
</table>

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
    
    $('#demo0').dash({fetch: 'latest', token: token, metric: 'cpu'},
      function(value) {
        $(this).append(value);
      });
    
    $('#demo1').dash({fetch: 'series', token: token, metric: 'cpu'},
      function(values) {
        $(this).append(values.join(','));
      });
      
    $('#demo2').dash({fetch: 'all', token: token, metric: 'cpu'},
      function(obj) {
        $(this).children('h4').replaceWith("<h4>" + obj.metric + " from " + obj.app + "</h4>");
        $(this).children('.values').append("Most recent value: " + obj.data.reverse()[0][1]);
      });
  });
  
</script>
