const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
  },
  mode: 'development',
  module: { /*module is where webpack determines which loader to use. */
    rules: [{
    test: /\.(js|jsx)$/,/*Here we instruct webpack to transform files ending with .js extension using the babel-loader, except those inside the node_modules directory*/
      exclude: /node_modules/,
      loader: 'babel-loader', /*Loaders allow webpack to process files (javascript and non-javascript files) and convert them into valid modules to be consumed by our application and added to the dependency graph.*/
      //babel-loader will try to find the babel configuration file —this babel.config.json
      //The code in the babel.config.json file instructs babel-loader to use @babel/preset-env and @babel/preset-react presets that we have installed earlier when transpiling our code.
    },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|svg|ttf|woff)$/,
        use: [
          'file-loader' //we use file-loader to load images (png and jpg files)
        ],
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
    alias: {
      Shared: path.join(__dirname, 'shared-components/src/components')
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'), /*The devServer key describes the configurations that can be made to webpack-dev-server. Here, we tell webpack-dev-server to serve files from our public directory*/
    compress: true,
    index: 'index.html',
    port: 5000
  }
}