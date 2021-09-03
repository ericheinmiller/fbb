import React from 'react';
import Icon from '../Icon.png';

export default ({email, content, date}) => {
  const theDate = new Date(Date.parse(date));
  console.log('This is the date from arguments: ', date);
  return (
    <div className="post">
      <div className="post-header">
        <img className="post-Icon" alt="Icon" src={Icon} />
        <p className="post__title">
          { email }
        </p>
        <p className="post__date">
          { `${theDate.getMonth()}/${theDate.getDay()}/${theDate.getFullYear()}` }
        </p>
      </div>
      <p className="post__content">
        { content }
      </p>
    </div>
  );
};
