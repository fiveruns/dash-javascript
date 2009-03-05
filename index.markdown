---
layout: default
title: dash-js
---
      
<div class="description">
  Access data from your apps in Dash from JavaScript.
</div>

## Dependencies

jQuery &gt;= 1.3.1 (may work with jQuery 1.2.6)

## Examples

`dash-js` makes it easy to fetch data from Dash for use in your application. You can fetch the latest value for any metric, fetch the values for a metric between some time range using a specific time window, or you can fetch data and metadata related to some metric within a time range and window.

### How dash-js uses callbacks

First, it's important to note that using `dash-js` is slightly different from other jQuery plugins you may have used. Because your app and Dash are on different domains, we can't use jQuery excellent AJAX support. Instead, we have to use JSON-P. However, we'd like to offer a nice API, so `dash-js` takes the immediate callback. It then calls your function, passing the data return from Dash.

What this means is what you'll want to use `$.dash.whatever` in such a way that the element you'd like to modify with Dash data is a closure on the function you pass to `$.dash.whatever`.

So, typically in jQuery, you'd do something like this:

{% highlight javascript %}
$('#something').dash.fetchSeries({'metric_name': 'cpu'}, function() { // do something });
{% endhighlight %}
But instead, you write this:
  
{% highlight javascript %}
function myUpdater(sel) {
  return function(datum) {
    $(sel).append(datum);
  }
}

$.dash.fetchSeries({'metric_name': 'cpu'}, myUpdater('#something'));
{% endhighlight %}

### `fetchLatest`

This method will give you the single latest value for the metric you specify.

{% highlight javascript %}
function update(sel) {
  return function(datum) {
    $(sel).append(datum);
  }
}

$.dash.fetchSeries({apiToken: 'ffff', 'metric_name': 'cpu'}, update('#cpuLatest'));  
{% endhighlight %}

<div class="demo">
  The latest CPU usage is: <span id="cpuLatest"></span>
</div>
<script type="text/javascript" charset="utf-8">

function update(sel) {
  return function(datum) {
    $(sel).append(datum);
  }
}

$.dash.fetchSeries({apiToken: 'ffff', 'metric_name': 'cpu'}, update('#cpuLatest'));  

</script>

### `fetchSeries`

### `fetch`

### Dash options

## Contact

FiveRuns Development Team (dev@fiveruns.com)

## Download

You can download this project in either <a href="http://github.com/fiveruns/dash-javascript/zipball/master">zip</a> or <a href="http://github.com/fiveruns/dash-javascript/tarball/master">tar</a> formats.

You can also clone the project with <a href="http://git-scm.com">Git</a> by running:

    $ git clone git://github.com/fiveruns/dash-javascript

## License

    # (The FiveRuns License)
    #
    # Copyright (c) 2006-2009 FiveRuns Corporation
    #
    # Permission is hereby granted, free of charge, to any person obtaining
    # a copy of this software and associated documentation files (the
    # 'Software'), to deal in the Software without restriction, including
    # without limitation the rights to use, copy, modify, merge, publish,
    # distribute, sublicense, and/or sell copies of the Software, and to
    # permit persons to whom the Software is furnished to do so, subject to
    # the following conditions:
    #
    # The above copyright notice and this permission notice shall be
    # included in all copies or substantial portions of the Software.
    #
    # THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
    # EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    # MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
    # IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
    # CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
    # TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
    # SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Authors

The FiveRuns Development Team
