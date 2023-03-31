import React from 'react';
import ReactDOM from 'react-dom';
import Container from './components/Container';

function injectReactComponent(site : 'github' | 'bitbucket') {

  document.getElementById('my-react-component-container')?.remove();

  // Create a container for the React component
  const container = document.createElement('div');
  container.setAttribute('id', 'my-react-component-container');
  document.body.appendChild(container);

  // Render the React component
  ReactDOM.render(<Container site={site} />, container);
}

export default injectReactComponent;
