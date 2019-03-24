import React from 'react';
import './Post.css';

const month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];


class Post extends React.Component {
  render() {
    return (
      <div className='post-container'>
        <div className='post-top'>
          <div className='date white'>
            <div className='d'>
              <p>{this.props.post.date.getDate()}</p>
            </div>
            <div className='m'>
              <p>{month[this.props.post.date.getMonth()]}</p>
            </div>
            <div className='y'>
              <p>{this.props.post.date.getFullYear()}</p>
            </div>
          </div>
          <div className='post-information white'>
            <div style={{paddingLeft: '5%', textAlign: 'left', width: "100%"}}>
              <h1>{this.props.post.title}</h1>
              <p>Written by <span style={{color: "orange"}}>{this.props.post.author}</span></p>
            </div>
          </div>
        </div>
        <div className='white'>
          <img className='post-img' src={this.props.post.img_url} alt=''/>
        </div>
        <div className='content white' style={{padding:"5px 20px", textAlign: 'left'}}>
          <p style={{lineHeight: 1.2, verticalAlign:"middle"}}>{this.props.post.content}</p>
          <button>read more</button>
        </div>

        <div className='post-bottom white' style={{padding:"5px 20px", textAlign: 'left'}}>
          <div className='tag'>
            {this.props.post.tag.map(e => (
              <p style={{display: 'inline-block'}} key={e}> <i className="fas fa-tag"></i> {e} &nbsp;&nbsp;<br /></p>
            ))}
          </div>
          <div className='comment'>
              <p>{this.props.post.comment} comments</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Post;