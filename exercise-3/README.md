## Exercise 3: Initial rendering time & bundle size

Consider a situation in which your bundle size is too big and yo need to improve the rendering time. What can you do? There are several options you can choose, here we are going to try a few:

* Separate the bundle in several bundles with a clear criteria (vendors bundle, a bundle per page, etc).
* Use [async and defer](http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html) to control your scripts lifecycle.
* Externalize those dependencies (and use a CDN).

But first, you need to identify the culprit :)

For that, we will use [webpack visualizer](https://www.npmjs.com/package/webpack-visualizer-plugin) that will help us to identify the modules that are taking too much space.

1. Under the folder **exercise-3/client-conference-schedule** run `npm install -D webpack-visualizer-plugin`.

1. Now, update the **webpack.config.prod.js** file to use this plugin. For that, add a require statement at the top and then add the **Visualizer** at the bottom of the plugin list.

  ```js
  ...
  var Visualizer = require('webpack-visualizer-plugin');
  ...

  module.exports = {
    ...
    plugins: [
      ...
      // Generate a manifest file which contains a mapping of all asset filenames
      // to their corresponding output file so that tools can pick it up without
      // having to parse `index.html`.
      new ManifestPlugin({
        fileName: 'asset-manifest.json'
      }),
      new Visualizer({ filename: './statistics.html' }),
    ],
    ...
  };
  ```

  In this case, c3 and d3 take ~20% of the bundle. Let's find a way to fix them.

1. Separate those dependencies as **vendor** dependencies, which will split the code in the bundle into 2 files. FOr that, add the following line inside the `entry` property in the **webpack.config.prod.js** file.

  ```js
  module.exports = {
    ...
    entry: {
      app: [require.resolve('./polyfills'), paths.appIndexJs],
      vendor: ["react-c3-component", "c3", "d3"]
    },
    ...
  };
  ```

  > **Note:** There are several benefits of doing this. One of them is that you separate your code (that changes often) from its dependencies (that doesn't change a lot), allowing you to cache both separately.

1. And then add the **CommonsChunkPlugin** as a new plugin to generate the new vendor bundle.

  ```js
  module.exports = {
    ...
    plugins: [
      new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
      ...
    ],
    ...
  };

  ```

1. Now, run `npm run build` again. You should see now a big reduction in the main bundle size.

  > **Note:** you can also repeat the same steps in the `webpack.config.dev.js` file.


