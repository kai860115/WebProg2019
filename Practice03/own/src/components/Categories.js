import React from 'react';

class Categories extends React.Component {
  render() {
    return (
      <div className='categories-container white' style={{margin: '10px'}}>
        <div style={{padding: '10px'}}>
          <h2 style={{margin:0}}>Categories</h2>
        </div>
        <div style={{padding: '10px', textAlign: 'left'}}>
          <ul>
            {
              this.props.categories.map(e => <li>{e}</li>)
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default Categories;