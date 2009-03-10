# FiveRuns Dash API for JavaScript

This is a jQuery plugin that fetches data from your apps in Dash for display in your browser-based applications.

You are looking at version 0.5.0.

## Dependencies

This was developed against jQuery 1.3.1, but will probably work with jQuery 1.2.6 as well.

## Installation

1. Put jquery.dash.js on your webserver.
2. Load jquery.dash.js in your page: <script src="/path/to/javascripts/jquery.dash.js" type="text/javascript" charset="utf-8"></script>
3. There is no step 3

## Usage

The short version:
    
    $('#demo0').dash({fetch: 'latest', apiToken: token, 'metric_name': 'cpu'},
      function(value) {
        $(this).append(value);
    });

The long version: see the [dash-javascript website for deeper details](http://fiveruns.github.com/dash-javascript/).

## Limitations

* For the time being, we support only read access to Dash from browser-based apps. This is due to scalability concerns and the awkwardness of writing data in cross-domain browser-based applications.

## Authors

The FiveRuns Development Team and Dash community

## Contributing

As an open source project, we welcome community contributors!

The best way to contribute is by sending pull requests via GitHub. The official repository for this project is:

    http://github.com/fiveruns/dash-javascript
    
## Support

Please join the [dash-users Google Group](http://groups.google.com/group/dash-users "dash-users |
  Google Groups").

You can also contact us via Twitter, Campfire or email; see the main [help page](http://dash.fiveruns.com/help) for details. 

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