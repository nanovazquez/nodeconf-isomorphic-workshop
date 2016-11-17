var http = require('http');
var browserify = require('browserify');
var literalify = require('literalify');

var React = require('react');
var ReactDOMServer = require('react-dom/server');
var DOM = React.DOM, body = DOM.body, div = DOM.div, script = DOM.script;
var App = React.createFactory(require('./App'));

var port = process.env.port || 3000;
http.createServer(function(req, res) {
  if (req.url == '/') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    var props = { items: ['Item 0', 'Item 1', 'Item 2', 'Item 3'] };

    var html = ReactDOMServer.renderToStaticMarkup(body(null,

      div({id: 'content', dangerouslySetInnerHTML: {__html:
        ReactDOMServer.renderToString(App(props))
      }}),

      script({dangerouslySetInnerHTML: {__html:
        'var APP_PROPS = ' + JSON.stringify(props) + ';'
      }}),

      script({src: '//cdnjs.cloudflare.com/ajax/libs/react/15.3.0/react.min.js'}),
      script({src: '//cdnjs.cloudflare.com/ajax/libs/react/15.3.0/react-dom.min.js'}),

     script({src: '/bundle.js'})
    ));

    res.end(html);

  // This endpoint is hit when the browser is requesting bundle.js from the page above
  } else if (req.url == '/bundle.js') {

    res.setHeader('Content-Type', 'text/javascript')

    browserify()
      .add('./browser.js')
      .transform(literalify.configure({
        'react': 'window.React',
        'react-dom': 'window.ReactDOM',
      }))
      .bundle()
      .pipe(res);
  } else {
    res.statusCode = 404;
    res.end();
  }
}).listen(port, function(err) {
  if (err) throw err;
  console.log('Listening on http://0.0.0.0:' + port);
});
