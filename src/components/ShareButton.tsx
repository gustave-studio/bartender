import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
} from 'react-share';

// type ShareButtonProps = {
//   resetState(): void;
//   setResponseData: React.Dispatch<React.SetStateAction<Array<never>>>;
// }

const ShareButton = function () {
  return (
    <>
      <TwitterShareButton
        url={'https://bartender-58c12.web.app/'}
      >
      <TwitterIcon size={50} round />
      </TwitterShareButton>
      <FacebookShareButton
        url={'https://bartender-58c12.web.app/'}
      >
      <FacebookIcon size={50} round />
      </FacebookShareButton>
      <LineShareButton url={'https://bartender-58c12.web.app/'}>
        <LineIcon size={50} round />
      </LineShareButton>

    </>
  );
};

export default ShareButton;
