const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (config) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        zlib: require.resolve("browserify-zlib"),
        querystring: require.resolve("querystring-es3"),
        stream: require.resolve("stream-browserify"),
        path: require.resolve("path-browserify"),
        crypto: require.resolve("crypto-browserify"),
        http: require.resolve("stream-http"),
        process: require.resolve("process/browser"),
        fs: false, // `fs` is not available in the browser
        net: false, // `net` is not available in the browser
      };

      config.plugins = (config.plugins || []).concat([
        new webpack.IgnorePlugin({
          resourceRegExp: /process\/browser/,
          contextRegExp: /axios/,
        }),
        new webpack.IgnorePlugin({
          resourceRegExp: /axios\/lib\/utils/,
          contextRegExp: /axios/,
        }),
        new webpack.IgnorePlugin({
          resourceRegExp: /axios\/lib\/core/,
          contextRegExp: /axios/,
        }),
      ]);
      config.target = 'web';
      return config;
    },
  },
};
