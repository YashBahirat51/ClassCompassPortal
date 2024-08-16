
import React from 'react'; 
// Imports the React library, which is necessary to write JSX and create React components.

import ReactDOM from 'react-dom/client'; 
// Imports the ReactDOM library for rendering React components to the DOM. 
// The `client` is part of React 18, offering a new root API.

import '../src/components/styles/index.css'; 
// Imports the CSS file for global styling across the application.

import App from './App'; 
// Imports the main App component, which serves as the root component of the application.

const root = ReactDOM.createRoot(document.getElementById('root')); 
// Creates a root DOM node to render the React app. `getElementById('root')` selects the root element from the HTML file.

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// Renders the App component inside the root element. 
// `React.StrictMode` is a wrapper that activates additional checks and warnings for its descendants.

