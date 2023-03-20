const path = require("path");

module.exports = (env, args) => {

  const isDevelopment = args.mode === 'development';

  return {
    entry: {
      popup: path.join(__dirname, "src/popup.ts"),
      contentScript: path.join(__dirname, "src/contentScript.ts"),
      background: path.join(__dirname, "src/background.ts"),
      fetchGithubDataContentScript: path.join(__dirname, "src/fetchGithubDataContentScript.ts"),
      container: path.join(__dirname, "src/components/Container.tsx"),
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'], // Add '.tsx' to the list of extensions
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].js",
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'], // Add '.tsx' to the list of extensions
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/, // Update the test regex to include '.tsx' files
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        // Add a rule for handling CSS
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    watch: isDevelopment, // Enable watch mode when running in development mode
  }
};
