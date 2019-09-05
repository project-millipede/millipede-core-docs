import path from 'path';
import webpack from 'webpack';

// import * as options from './remarkReactComponents';

const webpackConfig: webpack.Configuration = {
  mode: 'production',

  // Fixes npm packages that depend on `fs` module
  node: {
    fs: 'empty'
  },

  // The context is two levels out, because next does currently not support
  // configurations (next.config) in typescript
  context: path.resolve(__dirname, '../../'),

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },

  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.mdx$/,
        use: [path.join(__dirname, './loader/mdx-custom-loader')]
        // use: [
        //   {
        //     loader: 'babel-loader'
        //   },
        //   {
        //     loader: path.join(__dirname, './loader/mdx-custom-loader'),
        //     options: {
        //       remarkPlugins: [
        //         // options
        //       ]
        //     }
        //   }
        // ]
      },
      {
        test: /\.md$/,
        use: 'raw-loader'
      }
    ]
  },

  plugins: []
};

// const webpackConfig: webpack.Configuration = merge(baseWebpackConfig, webpackDevConfig);
// export default webpackConfig;

export default webpackConfig;