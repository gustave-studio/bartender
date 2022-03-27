import React from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
} from 'react-share';

const ShareButton = function () {
  return (
    <div className="share_button_container">
      <TwitterShareButton
        url="https://bartender-58c12.web.app/"
      >
        <TwitterIcon size={50} round />
      </TwitterShareButton>
      <FacebookShareButton
        url="https://bartender-58c12.web.app/"
      >
        <FacebookIcon size={50} round />
      </FacebookShareButton>
      <LineShareButton url="https://bartender-58c12.web.app/">
        <LineIcon size={50} round />
      </LineShareButton>
    </div>
  );
};

export default ShareButton;
