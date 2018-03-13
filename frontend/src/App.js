import React from 'react';
import './App.css';

// import components
import Top from './components/top/top';
import Past from './components/past/past';
import Exchange from './components/exchange/exchange';

class App extends React.Component {
  render() {
    return (
      <div>
        <Top/>
        <Exchange/>
        <Past/>
      </div>
    );
  }
}

export default App;
