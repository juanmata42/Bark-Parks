import './dog-card.scss';
import React from 'react';
import BarkBtn from '../BarkBtn/BarkBtn';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFriend } from '../../../actions/user';
type DogCardProps = {
  profilePhoto: string;
  name: string;
  description: string;
  location: string;
  id: string;
  friendsListState: any[];
  setFriendsListState: Function;
};
export default function DogCard({
  profilePhoto,
  name,
  description,
  location,
  id,
  friendsListState,
  setFriendsListState,
}: DogCardProps): JSX.Element {
  const userStorage = JSON.parse(localStorage.getItem('user') || '{}');
  const dispatch = useDispatch();
  if (
    userStorage &&
    Object.keys(userStorage).length === 0 &&
    Object.getPrototypeOf(userStorage) === Object.prototype
  ) {
    return <div>ERROR 404: NO USER FOUND</div>;
  }
  const parks: any[] = useSelector((state: any) => state.dogspots.dogspots);
  const user = useSelector((state: any) => state.user.user);
  const handleDeleteFriend = () => {
    dispatch(
      deleteFriend({ userId: user._id, friendId: id }, userStorage.data.token)
    );
    console.log(friendsListState);
    friendsListState.splice(user.friends.indexOf(id), 1);
    console.log(friendsListState);
    setFriendsListState(friendsListState);
  };
  function parkGetter(parkId: string) {
    return parks.find((park) => park._id === parkId);
  }
  return (
    <div className="dog-card">
      <button className="delete-friend-btn" onClick={handleDeleteFriend}>
        X
      </button>
      <div className="dog-card__top">
        <img className="dog-card__pic" src={profilePhoto} alt={name} />
        <div className="dog-card__identity">
          <h2 className="dog-card__name">{name}</h2>
          <p className="dog-card-description">{description}</p>
        </div>
      </div>
      <div className="dog-card__bottom">
        {location && (
          <div className="dog-card__location">
            <h3 className="dog-card__location-title">I am here:</h3>
            <p className="dog-card__location-name">
              {parkGetter(location).name}
            </p>
          </div>
        )}
        <div className="dog-card__going">
          {location && (
            <>
              I'm coming!
              <BarkBtn id={location} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
