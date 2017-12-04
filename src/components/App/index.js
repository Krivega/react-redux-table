import React from 'react';
import Content from 'containers/Content';
import './style.css';

const App = ({ children }) => (
  <div className="app">
    <div className="container">
      <Content />
    </div>
  </div>
);

export default App;
