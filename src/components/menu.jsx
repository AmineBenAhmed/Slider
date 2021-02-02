import React from 'react';

class Menu extends React.Component {
  constructor() {
    super()
  }

  render() {
    return(
      <div>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Our</li>
        </ul>
      </div>
    )
  }
}

export default Menu;