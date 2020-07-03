const path = require('path')

/**
 * This is a config override for create-react-app
 */
module.exports = {
  webpack: {
    // Allow webpack to load files outside of the src scope
    configure: webpackConfig => {
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
      );
      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
      return webpackConfig;
    },
    alias: {
      // Prevent an extraneous (parent) version of react to be loaded
      react: path.resolve('./node_modules/react')
    }
  }
}
