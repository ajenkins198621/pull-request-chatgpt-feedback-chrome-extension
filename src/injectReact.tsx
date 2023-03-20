import React from 'react';
import ReactDOM from 'react-dom';
import Container from './components/Container';

function injectReactComponent() {
  // Create a container for the React component
  const container = document.createElement('div');
  container.setAttribute('id', 'my-react-component-container');
  document.body.appendChild(container);

  // Render the React component
  ReactDOM.render(<Container />, container);
}

export default injectReactComponent;
