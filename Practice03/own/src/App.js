import React, { Component } from 'react';
import './App.css';
import Topbar from './components/Topbar';
import Banner from './components/Banner';
import Post from './components/Post';
import AboutMe from './components/AboutMe';
import Categories from './components/Categories';
import FellowMe from './components/FollowMe';

let posts = [
  {
    date: new Date(),
    title: 'first post',
    author: 'Kai',
    img_url: require("./pictures/dog.jpeg"),
    content: 'mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew ',
    tag: ['a', 'b'],
    comment: '7'
  },
  {
    date: new Date(),
    title: 'Second post',
    author: 'Kai',
    img_url: require("./pictures/dog.jpeg"),
    content: 'mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew mew ',
    tag: ['mew'],
    comment: '5'
  }  
];
let categories = [
  'beef', 'pork', 'vegetable', 
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Topbar />
          <Banner />
        </header>
        <main>
          <div className='main-left' style={{width: '50%'}}>
            {posts.map(e => <Post key={e.title} post={e}/>)}
          </div>
          <div className='main-right' style={{width: '25%'}}>
            <AboutMe />
            <Categories categories={categories}/>
            <FellowMe />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
