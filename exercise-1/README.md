## Exercise 1: Server side rendering with React

> **Note:** for more information, see the [slides](https://slides.com/nanovazquez/workshop-isomorphic-apps/).

Now that we know how a client-side app works, it's time to make some changes to have an Isomorphic app. *Why isomorphic?* Because we want to handle the initial rendering on the server-side, allowing the app to continue working in the client-side as usual for the rest of the interactions.

We will take care of the following considerations:

* When the client requests our app, we will send the generated HTML to the client, already processed by React.
* We will also send the state of the app that was used to generate the HTML, so the client can use it as the initial state.
* Server-side **only job** on the server side is to provide the initial state of our app.

The final result will be a fully functional isomorphic app that will handle the initial rendering on the server and the rest on the client.

> **Note: in this exercise we will use React, but the same techniques can be used with other view frameworks that can render on the server.

### Setups steps

1. Run `npm i`.

### Server side

1. Create a file named **server.js** under the **begin/ssr-simple-app** folder.

1. For this example, we'll use a simple http server and browserify to package the client's code. Add the following requires at the top of the file:

  ```js
  var http = require('http');
  var browserify = require('browserify');
  var literalify = require('literalify');
  ```

1. Now, we are going to require **React** libraries that will take care of rendering the proper HTML markup on the server side. In addition, we will reference the **App.js** file, which contains the application itself. Add the following requires at the top of the file:

  ```js
  var React = require('react');
  var ReactDOMServer = require('react-dom/server');
  var DOM = React.DOM, body = DOM.body, div = DOM.div, script = DOM.script;
  var App = React.createFactory(require('./App'));
  ```

1. Now create the server. It will be responsable of handling 2 URLS: `/` and `/bundle.js`. For other requests, we will return a 404.

  ```js
  var port = process.env.port || 3000;
  http.createServer(function(req, res) {
    if (req.url == '/') {
      // Return application with data
    }
    else if (req.url == '/bundle.js') {
      // Return the bundle used in the browser
    } else {
      res.statusCode = 404;
      res.end();
    }
  }).listen(port, function(err) {
    if (err) throw err;
    console.log('Listening on http://0.0.0.0:' + port);
  });
  ```

#### Serve index page

1. Let's start with the index page. Since we will be sending HTML, add the following line under the first `if` statement to set the proper header:

  ```js
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  ```

1. Now, define a set of props that will be passed in to the React component and will be used to generate the HTML markup on the server side.

  ```js
  var props = { items: ['Item 0', 'Item 1', 'Item 2', 'Item 3'] };
  ```

  > **Note:** note that this can be fetched asynchronously from an API or a database.

1. Now it's time to wite the code that will generate the HTML sent to the client. For that, we will use **ReactDOMServer** and a few simple functions to create a proper HTML file. Paste the following code:

  ```js
  var html = ReactDOMServer.renderToStaticMarkup(body(null,
    // code will be added here in the next step
  ));
  ```

1. Inside the code added in the previous step, we will be adding:

  * A div element to contain the content.
  * Script tags to handle our props, react libraries and our bundle file.

  Let's start with the first one:

  ```js
  div({id: 'content', dangerouslySetInnerHTML: {__html:
    ReactDOMServer.renderToString(App(props));
  }}),
  ```

  Notice that this is where the actual server-side rendering occurs. Our props and our React component will be converted as a string with **ReactDOMServer.renderToString** and that will be set (in a dangerous way) to a `<div id="content">` element.

1. Now, let's send the properties to the client by using a global variable. We can sanitize the props here as well, but for simplicity we will send them with no extra effort.

  ```js
  script({dangerouslySetInnerHTML: {__html:
    'var APP_PROPS = ' + JSON.stringify(props) + ';'
  }}),
  ```

1. Add the REACT scripts, that will be retrieved from a CDN.

  ```js
  script({src: '//cdnjs.cloudflare.com/ajax/libs/react/15.3.0/react.min.js'}),
  script({src: '//cdnjs.cloudflare.com/ajax/libs/react/15.3.0/react-dom.min.js'}),
  ```

1. And add a script tag for the app's bundle file.

  ```js
  script({src: '/bundle.js'})
  ```

1. Finally, send the generated HTML to the client by adding the following line:

  ```js
  res.end(html);
  ```

#### Serve bundle file

1. Now, let's add the code to serve the bundle that will be used by the browsers. We will start adding code in the `else` statement.

  ```js
  http.createServer(function(req, res) {
    if (req.url == '/') {
      // Return application with data
    }
    else if (req.url == '/bundle.js') {
      // Return the bundle used in the browser
    } else {
      res.statusCode = 404;
      res.end();
    }
  ```

  The first thing we need to do is define the proper header. In this case, we are going to send javascript:

  ```js
  res.setHeader('Content-Type', 'text/javascript')
  ```

1. Now we invoke browserify's magic to package up the browser.js file (created in the next section) and its dependencies.
This is done on the fly for sample purposes, in real-world scenarios we will generate it beforehand and serve it via a CDN.

  ```js
  browserify()
    .add('./browser.js')
    .transform(literalify.configure({
      'react': 'window.React',
      'react-dom': 'window.ReactDOM',
    }))
    .bundle()
    .pipe(res);
  ```

  And now it's time of the client's code.

### Client side

1. Create a file named `browser.js` that will hold the client's code. Add the following requires:

  ```js
  var React = require('react');
  var ReactDOM = require('react-dom');
  var App = React.createFactory(require('./App'));
  ```

1. Now, add the following code to render our App in the browser. Notice that we are going to use the properties generated on the server-side. React will notice this and won't generate any DOM because of this.

  ```js
  ReactDOM.render(
    App(window.APP_PROPS),
    document.getElementById('content')
  );
  ```

  And we are done :) Run the app with `node server.js`. You should see the 3 items loaded in the page and you can add more items by pressing the button.
