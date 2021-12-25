import './loading.scss';

import gif from '../../../assets/loading-dog.gif';
const Loading = (): JSX.Element => {
  
  return (
    <div className="logOut-container">
      <h1 className="logOut-title">Going Places!</h1>
      <img alt="dog walking gif" className="logOut-gif" src={gif} />
    </div>
  );
};
export default Loading;
