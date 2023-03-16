# Code Analysis and Optimization Chrome Extension

This Google Chrome extension analyzes code differences in pull requests on Bitbucket or Github and provides feedback using ChatGPT by OpenAI. It helps developers identify potential bugs, optimize code, add relevant comments, and improve security.

## Features

- Analyze code differences in pull requests on Bitbucket or Github
- Utilize ChatGPT API to identify bugs and optimizations
- Provide suggestions for comments and security improvements
- Seamless integration with the Bitbucket and Github interfaces

## Installation

### Prerequisites

- Google Chrome browser
- A Bitbucket or Github account with access to repositories containing pull requests
- An OpenAI account with access to the ChatGPT API
- A ChatGPT API key

### Steps

1. Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/code-analysis-chrome-extension.git
```
2. Open Google Chrome and navigate to chrome://extensions/.
3. Enable "Developer mode" in the top-right corner of the page.
4. Click the "Load unpacked" button and select the cloned repository folder.
5. The extension should now be visible in your extensions list and available for use when browsing Bitbucket and Github.
6. Change the name of the `.env.example` file to `.env` and add your ChatGPT API key to the file.
  - Help finding your ChatGPT API key: https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key

## Usage

1. Navigate to a pull request on Bitbucket or Github.
2. The extension will automatically analyze the code differences and provide feedback on potential bugs, optimizations, comments, and security improvements.
3. Review the generated feedback and apply the suggested changes to improve your code.

## Contributing

We welcome contributions to improve and expand the functionality of this Chrome extension. To contribute, please follow these steps:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Make your changes and ensure that your code is properly documented.
3. Test your changes thoroughly to ensure that they don't introduce new issues.
4. Submit a pull request with a clear description of your changes and any relevant issue numbers.

We appreciate your contributions and will review your pull request as soon as possible.

## Attribution
This Chrome extension uses the ChatGPT API by OpenAI for code analysis and optimization suggestions. The extension is not officially affiliated with or endorsed by OpenAI, Bitbucket or Github.

App icons generated here: https://appicons.ai/app/generator/step1


