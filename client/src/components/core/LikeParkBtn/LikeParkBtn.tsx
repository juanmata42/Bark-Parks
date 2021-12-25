import React, { useState } from 'react';
import './LikeParkBtn.scss';
import { favDogspot } from '../../../actions/user';
import { useDispatch } from 'react-redux';
const LikeParkBtn = ({
  isFav,
  dogspotId,
}: {
  isFav: boolean;
  dogspotId: string;
}): JSX.Element => {
  const dispatch = useDispatch();
  const [favorite, setFavorite] = useState(isFav);
  const userStorage = JSON.parse(localStorage.getItem('user') || '{}');
  const user = userStorage.data.user;
  const addFavorite = () => {
    dispatch(
      favDogspot(
        { dogspotId: dogspotId, userId: user._id },
        userStorage.data.token
      )
    );
    favorite === true ? setFavorite(false) : setFavorite(true);
  };

  return (
    <button className="LikeParkBtn" onClick={() => addFavorite()}>
      <svg
        width="80"
        height="100"
        viewBox="20 0 55 55"
        xmlns="http://www.w3.org/2000/svg"
        className={`header-icon ${
          favorite === true ? 'filter-green' : 'filter-dark'
        }`}
      >
        <path d="M32.16.006a15.72 15.72 0 00-13.02 7.648 12.821 12.821 0 015.872 7.162h43.64a12.836 12.836 0 015.871-7.162A15.75 15.75 0 0061.115.15a15.72 15.72 0 00-14.25 9A15.72 15.72 0 0032.16.006zm42.363 7.648a15.75 15.75 0 012.342 8.246c0 7.399-6.037 15.84-12.691 22.916h4.478a12.82 12.82 0 0012.18 8.836c7.076 0 12.828-5.756 12.828-12.836 0-2.908-1.016-5.736-2.844-8a12.77 12.77 0 002.844-8c0-7.08-5.752-12.836-12.828-12.836-2.278 0-4.434.61-6.309 1.674zm-10.35 31.162H29.556c8.186 8.704 17.31 15.334 17.31 15.334s9.123-6.63 17.309-15.334zm-34.618 0C22.9 31.741 16.865 23.3 16.865 15.9a15.72 15.72 0 012.276-8.246 12.753 12.753 0 00-6.309-1.674C5.756 5.98 0 11.736 0 18.816c0 2.908 1.02 5.732 2.844 8a12.785 12.785 0 00-2.844 8c0 7.08 5.752 12.836 12.832 12.836 5.596 0 10.48-3.628 12.18-8.836z" />
      </svg>
    </button>
  );
};
export default LikeParkBtn;
