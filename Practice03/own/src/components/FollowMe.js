import React from 'react';

class FellowMe extends React.Component {
  render() {
    return (
      <div className='fellowme-container white' style={{margin: '10px'}}>
        <div style={{padding: '10px'}}>
          <h2 style={{margin:0}}>Fellow Me</h2>
        </div>
        <div style={{padding: '10px'}}>
          <p>
            <i class="fab fa-facebook fa-2x" style={{color: '#3b5998'}}></i>&nbsp;&nbsp;
            <i class="fab fa-google-plus-square fa-2x" style={{color: '#d3492c'}}></i>&nbsp;&nbsp;
            <i class="fab fa-twitter-square fa-2x" style={{color: '#00abe3'}}></i>
          </p>
        </div>
      </div>
    )
  }
}

export default FellowMe;