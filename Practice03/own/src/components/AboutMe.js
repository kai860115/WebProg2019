import React from 'react';
import './AboutMe.css';

class AboutMe extends React.Component {
  render() {
    return (
      <div className='aboutme-container white'>
        <div style={{padding: '10px'}}>
          <h2 style={{margin:0}}>About Me</h2>
        </div>
        <div style={{width: 175, height: 175, margin:"10px auto"}}>
          <img className='aboutme-img' src={require('../pictures/aboutme.jpg')} alt=''></img>
        </div>
        <div style={{padding: '10px'}}>
          <p>I am a golden retriever</p>
        </div>
      </div>
    )
  }
}

export default AboutMe;