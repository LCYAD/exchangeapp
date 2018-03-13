import React from 'react';
import './top.css';

class Top extends React.Component {
  render() {
    return (
      <div className="top-part">
        <i>Welcome to FX Exchange</i>
        <sub className="subscript-text">openexchange.org</sub>
      </div>
    );
  }
}

export default Top;