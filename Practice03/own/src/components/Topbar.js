import React from 'react';
import './Topbar.css';
let options = ["HOME", "FEATURE", "LIFESTYLE", "TRAVEL", "MUSIC", "ABOUT ME", "CONTRACT ME"];
let activeOption = "HOME";

class Topbar extends React.Component {
  render() {
    return (
      <div className='topbar-container'>
        <div className='topbar'>
          <ul className='topbar-options'>
            { options.map(e => <li className={ e === activeOption? 'active': '' } key={ e }>{ e }</li>) }
          </ul>
          <div className='search-icon'>
            <i className="fas fa-search "></i>
          </div>
      </div>

      </div>
    )
  }
}

export default Topbar;