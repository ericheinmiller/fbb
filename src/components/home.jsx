import React from 'react';

export default (props) => {
  const handleMouseDown = () => {
    console.log('logging out');
    props.setLoggedIn(false);
    localStorage.setItem('user', null);
  };

  return (
    <div onMouseDown={() => handleMouseDown()} className="home">
      <button className='logout'>
        Logout
      </button>
    </div>
  );
};
