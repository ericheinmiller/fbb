import React from 'react';

export default ({email, content}) => (
  <div className="post">
    <h3 className="post__title">
      { email }
    </h3>
    <p className="post__content">
      { content }
    </p>
  </div>
);
