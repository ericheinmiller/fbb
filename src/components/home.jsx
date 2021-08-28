import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './post.jsx';

export default (props) => {
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/getPosts')
      .then((response) => {
        setPosts(response.data.rows);
      });
  }, []);

  const handleMouseDown = () => {
    localStorage.setItem('user', null);
    props.setLoggedIn(false);
  };

  const handleOnChange = (e) => {
    setContent(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const userObject = JSON.parse(localStorage.getItem('user'));
      const postInfo = {
        content,
        id: userObject.id,
      };
      axios.post('http://localhost:8080/api/newPost', postInfo)
        .then((response) => {
          if (response.data === true) {
            setPosts([...posts, { content, email: userObject.email }]);
          } else {
            console.log('something went wrong sonny jim');
          }
        });
    }
  };

  return (
    <div className="home">
      <input value={content} onKeyDown={(e) => { handleKeyDown(e); }} onChange={(e) => { handleOnChange(e); }} placeholder="Type your message" />
      { posts ? posts.map(post => {
        return <Post email={post.email} content={post.content} />
      }) : null }
      <button onMouseDown={() => handleMouseDown()} className='logout'>
        Logout
      </button>
    </div>
  );
};
