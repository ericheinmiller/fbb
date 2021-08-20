import React from 'react';
import Post from './post.jsx';

export default (props) => {
  const handleMouseDown = () => {
    console.log('logging out');
    props.setLoggedIn(false);
    localStorage.setItem('user', null);
  };

  return (
    <div className="home">
      <Post />
      <Post />
      <Post />
      <button onMouseDown={() => handleMouseDown()}className='logout'>
        Logout
      </button>
    </div>
  );
};
