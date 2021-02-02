import React from 'react';

import Menu from './components/menu';
import Header from './components/header/Header';

import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Header />
      </div>
    )
  }
}

export default App;