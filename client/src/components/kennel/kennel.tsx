import './kennel.scss';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from './form';
import Post from './post';
import CustomPopup from '../core/park-card/custom-popup';
import Loading from '../core/layout/loading';
import { getUsers } from '../../actions/users';
import { getUserById } from '../../actions/user';
import { createPost } from '../../actions/posts';
import { deletePost } from '../../actions/posts';

const Kennel = (): JSX.Element => {
  const users = useSelector((state: any) => state.users.users);

  const navigate = useNavigate();

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
  const dispatch = useDispatch();
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
  const userId = user._id;
  const userPhoto = user.profilePhoto;
  const userName = user.name;
  const parks: any[] = useSelector((state: any) => state.dogspots.dogspots);
  const friends = user.friends;
  if (!users && !user && !parks) {
    return <Loading />;
  }
  let friendsList: any[] = [];
  let parksWithFriends: { _id: string; friendsIn: string[] }[] = [];
  function parksAndFriendsBuilder(friend: any) {
    if (friend.location) {
      if (parksWithFriends.some((park) => park._id === friend.location)) {
        parksWithFriends[
          parksWithFriends.findIndex((park) => park._id === friend.location)
        ].friendsIn.push(friend);
      } else {
        parksWithFriends.push({ _id: friend.location, friendsIn: [friend] });
      }
    }
  }
  function friendsGetter(friendId: string) {
    if (users.find((friend: any) => friend._id === friendId)) {
      return users.find((friend: any) => friend._id === friendId);
    }
    return user;
  }
  friends?.map((friend: any) => {
    friendsList.push(friendsGetter(friend));
  });
  friendsList?.map((friend: any) => parksAndFriendsBuilder(friend));
  function parkGetter(parkId: string) {
    return parks.find((park) => park._id === parkId);
  }

  function friendsPicturesInPark(friendsInPark: any[]) {
    return friendsInPark
      .slice(0, 4)
      .map((friend) => (
        <img
          className="friends-outside__friends__profilephoto"
          src={friend.profilePhoto}
          key={friend._id}
        />
      ));
  }
  function orderingPosts() {
    let friendPosts: any[] = [];
    for (let i = 0; i < friendsList.length; i++) {
      if (friendsList[i].posts) {
        friendPosts = friendPosts.concat(friendsList[i].posts);
      }
    }

    let allPosts = friendPosts.concat(user.posts);
    let orderedPosts = allPosts.sort((a, b) => {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return a.createdAt - b.createdAt;
    });
    orderedPosts = orderedPosts.reverse();
    return orderedPosts;
  }
  function nameAndPhoto(thisUserId: string) {
    let user: any = friendsGetter(thisUserId);
    return {
      name: user.name,
      profilePhoto: user.profilePhoto,
    };
  }
  const [visibility, setVisibility] = useState(false);
  const popupCloseHandler = (e: any) => {
    setVisibility(e);
  };
  const [postsList, setPostsList] = useState(orderingPosts());
  return (
    <>
      <header className="post-input">
        <Form
          userId={userId}
          userPic={userPhoto}
          userName={userName}
          setPostsList={setPostsList}
          postsList={postsList}
        />
        <div className="kennel-separator"></div>
      </header>
      <main className="kennel-body">
        <div className="friends-outside">
          {parksWithFriends.length === 0 ? (
            <h2 className="friends-ouside__title">
              You have no friends outside...
            </h2>
          ) : (
            <>
              <h2 className="friends-ouside__title">
                You have friends outside!
              </h2>
              <div className="friends-outside__container">
                {parksWithFriends &&
                  parksWithFriends.map((park) => (
                    <div className="friends-outside__body" key={park._id}>
                      <div
                        className="friends-outside__park"
                        onClick={(e) => setVisibility(!visibility)}
                      >
                        <img
                          className="friends-outside__park__photo"
                          src={parkGetter(park._id)?.selectedFile}
                        />
                        <h3 className="friends-outside__park__name">
                          {parkGetter(park._id)?.name}
                        </h3>
                      </div>
                      <CustomPopup
                        onClose={popupCloseHandler}
                        showing={visibility}
                        parkId={park._id}
                      />
                      <div className="friends-outside__friends">
                        {friendsPicturesInPark(park.friendsIn)}
                        {park.friendsIn.length > 4 && (
                          <h3 className="friends-outside__friends__extra">
                            And {park.friendsIn.length - 4} more...
                          </h3>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
        <div className="kennel-separator"></div>
        <div className="posts">
          {postsList.length === 0 ? (
            <h2 className="posts__title">No posts...yet</h2>
          ) : (
            postsList.length > 0 &&
            postsList.map((post) => (
              <Post
                key={post._id}
                profilePhoto={nameAndPhoto(post.creator).profilePhoto}
                name={nameAndPhoto(post.creator).name}
                message={post.message}
                selectedFile={post.selectedFile}
                userId={userId}
                postId={post._id}
                creatorId={post.creator}
                setPostsList={setPostsList}
                postsList={postsList}
              />
            ))
          )}
        </div>
      </main>
    </>
  );
};
export default connect(null, { getUserById, createPost, deletePost })(Kennel);
