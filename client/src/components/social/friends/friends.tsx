import './friends.scss';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { KennelPlaceholder } from '../../kennel/placeholder';
import { addFriend, deleteFriend, getUserById } from '../../../actions/user';
import { getUsers } from '../../../actions/users';
import DogCard from '../../core/dog-card/dog-card';
const Friends = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // use this to take data from store const user = useSelector((state: any) => state.authReducer.authData.user);
  const userStorage = JSON.parse(localStorage.getItem('user') || '{}');
  if (
    userStorage &&
    Object.keys(userStorage).length === 0 &&
    Object.getPrototypeOf(userStorage) === Object.prototype
  ) {
    return <div>ERROR 404: NO USER FOUND</div>;
  }
  if (!useSelector((state: any) => state.user.user)) {
    navigate('/');
    return <div>ERROR 404: NO USER FOUND</div>;
  }
  useEffect(() => {
    dispatch(getUserById(userStorage.data.user._id, userStorage.data.token));
  }, []);

  const [user, setUser] = useState(
    useSelector((state: any) => state.user.user)
  );
  if (userStorage === true) {
    if (userStorage.data.user._id && !user._id) {
      setUser(userStorage.data.user);
    }
  }
  const users = useSelector((state: any) => state.users.users);
  const initialState = {
    friendId: 'friendId',
    text: 'Say something nice!',
    userId: user._id,
  };
  const friends = user.friends;
  function friendsGetter(friendId: string) {
    if (users.find((friend: any) => friend._id === friendId)) {
      return users.find((friend: any) => friend._id === friendId);
    }
    return user;
  }
  let friendsList: any[] = [];
  friends?.map((friend: any) => {
    friendsList.push(friendsGetter(friend));
  });
  const [form, setForm] = useState(initialState);
  const handleChange = (e: any): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const barkFriends = () => {
    const bark = new Audio(user.bark);
    bark.play();
  };
  const handleAddFriend = (e: any) => {
    e.preventDefault();
    dispatch(addFriend(form, userStorage.data.token));
    friendsListState.push(friendsGetter(form.friendId));
    setFriendsListState(friendsListState);
  };
  const [friendsListState, setFriendsListState] = useState(friendsList);

  return (
    <>
      <div className="parks-container page-with-subheader">
        <form
          autoComplete="off"
          className="add-friend__form"
          onSubmit={handleAddFriend}
        >
          <div className="add-friend__top">
            <button type="submit" className="addFriendBtn filter-dark">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 27.963 27.963"
                width={80}
                height={80}
                xmlSpace="preserve"
              >
                <path d="M13.98 0C6.259 0 0 6.26 0 13.982s6.259 13.981 13.98 13.981c7.725 0 13.983-6.26 13.983-13.981C27.963 6.26 21.705 0 13.98 0zm7.122 16.059h-4.939v5.042h-4.299v-5.042H6.862V11.76h5.001v-4.9h4.299v4.9h4.939v4.299h.001z" />
              </svg>
            </button>
            <h2 className="addFriendTitle">Send friend request</h2>
          </div>
          <div className="add-friend__bottom">
            <input
              type="text"
              name="friendId"
              id="add-friend-friendId"
              className="add-friend__friendId"
              placeholder={"Friend's #ID"}
              onChange={handleChange}
            />
            <textarea
              name="text"
              id="add-friend-text"
              className="add-friend__text"
              placeholder={'Say something nice!'}
              onChange={handleChange}
            />
          </div>
        </form>
        {friendsListState.map(
          ({
            profilePhoto,
            name,
            description,
            location,
            _id,
          }: {
            profilePhoto: string;
            name: string;
            description: string;
            location: string;
            _id: string;
          }) => (
            <DogCard
              profilePhoto={profilePhoto}
              name={name}
              description={description}
              location={location}
              id={_id}
              key={_id}
              friendsListState={friendsListState}
              setFriendsListState={setFriendsListState}
            />
          )
        )}
      </div>
    </>
  );
};
export default Friends;
