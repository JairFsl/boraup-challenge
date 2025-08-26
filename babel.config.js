module.exports = function (api) {
  api.cache(true);

  const plugins = ["react-native-reanimated/plugin"];

  if (process.env.APP_ENV === 'production' || process.env.APP_ENV === 'preview') {
    plugins.push(["transform-remove-console"]);
  }

  return {
    presets: ['babel-preset-expo'],
    plugins: plugins
  };
};
