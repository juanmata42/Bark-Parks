import './group-card.scss';
import React, { useState } from 'react';
import BarkBtn from '../BarkBtn/BarkBtn';
import { useDispatch, useSelector } from 'react-redux';
import { editMeetups, joinGroup, leaveGroup } from '../../../actions/groups';
import CustomPopup from '../park-card/custom-popup';

type GroupCardProps = {
  selectedFile: string;
  name: string;
  description: string;
  meetups: { frequency: string; time: string; dogSpotId: string }[];
  id: string;
  members: any[];
  setGroupsList: Function;
  groupsList: any[];
};
export default function GroupCard({
  selectedFile,
  name,
  description,
  meetups,
  id,
  members,
  setGroupsList,
  groupsList,
}: GroupCardProps): JSX.Element {
  const dispatch = useDispatch();
  const userStorage = JSON.parse(localStorage.getItem('user') || '{}');
  const parkList = useSelector((state: any) => state.dogspots.dogspots);
  const users = useSelector((state: any) => state.users.users);
  const user = useSelector((state: any) => state.user.user);
  function userGetter(memberId: string) {
    return users.find((user: any) => user._id === memberId);
  }
  function nameAndPhoto(thisUserId: string) {
    let user: any = userGetter(thisUserId);
    return {
      name: user.name,
      profilePhoto: user.profilePhoto,
    };
  }
  const [meetupsList, setMeetupsList] = useState(meetups);
  const [membersList, setMembersList] = useState(members);
  function parkGetter(meetup: any) {
    return parkList.find((park: any) => park._id === meetup.dogSpotId);
  }
  const [visibility, setVisibility] = useState(false);
  const popupCloseHandler = (e: any) => {
    setVisibility(e);
  };
  const [meetup, setmeetup] = useState({
    frequency: '',
    time: '',
    dogSpotId: '',
  });
  const handleChangeMeetup = (e: any): void => {
    setmeetup({ ...meetup, [e.target.name]: e.target.value });
    console.log(groupsList);
  };
  const handleAddMeetup = (e: any) => {
    e.preventDefault();
    dispatch(
      editMeetups(
        { userId: user._id, groupId: id, meetup: meetup },
        userStorage.data.token
      )
    );
    setMeetupsList([...meetupsList, meetup]);
  };
  const clear = () => {
    setAddFriend('');
  };
  const [addFriend, setAddFriend] = useState('');
  const handleChangeFriend = (e: any) => {
    setAddFriend(e.target.value);
  };
  const handleAddFriend = (e: any) => {
    e.preventDefault();
    dispatch(
      joinGroup({ groupId: id, userId: addFriend }, userStorage.data.token)
    );
    setMembersList([...membersList, addFriend]);
    clear();
  };
  function membersPictures(members: any[]) {
    let friendsPics: any[] = [];
    members.forEach((memberId) => {
      friendsPics.push(nameAndPhoto(memberId));
    });
    return friendsPics
      .slice(0, 4)
      .map((friend) => (
        <img
          className="group__member__profilePhoto"
          src={friend.profilePhoto}
          key={friend._id}
        />
      ));
  }
  function handleLeaveGroup(e: any) {
    e.preventDefault();
    dispatch(
      leaveGroup({ userId: user._id, groupId: id }, userStorage.data.token)
    );
    setGroupsList(groupsList.filter((group: any) => group._id !== id));
  }
  return (
    <div className="group-card">
      <button
        className="leave-group-btn filter-dark"
        onClick={handleLeaveGroup}
      >
        <svg
          width={25}
          height={23}
          viewBox="0 0 562.89 511.64"
          fillRule="evenodd"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              style={{
                stroke: 'none',
                strokeWidth: 1.33333,
              }}
              d="M245.643.066c-2.82.142-5.633.51-8.43 1.114-44.756 9.644-68.444 75.905-52.906 147.996 15.537 72.085 64.416 122.712 109.17 113.072 44.757-9.653 68.446-75.914 52.906-148.006C331.817 46.656 287.947-2.058 245.643.066zM503.758.13c-42.305-2.123-86.172 46.59-100.733 114.176-15.526 72.09 8.145 138.356 52.899 147.996 22.064 4.759 45.11-5.181 64.69-25.07l-57.837-81.374A59.72 59.72 0 0 1 477.11 72.25a59.72 59.72 0 0 1 83.012 14.332l9.59 13.602c-1.42-50.96-23.257-91.56-57.522-98.944A52.453 52.453 0 0 0 503.758.13zm65.953 100.055c.435 15.606-.974 32.152-4.617 49.054-7.877 36.552-24.344 67.536-44.48 87.992l44.882 63.149H408.51c24.197 9.718 43.195 28.225 50.265 42.148 9.474 18.66 30.663 49.265 53.364 77.291h47.982l-22.316 29.754c10.06 10.722 19.687 19.838 27.94 25.928 19.564 14.444 42.251 35.36 54.056 63.813l107.535-143.381a59.72 59.72 0 0 0 1.26-70.368c-31.241 62.044-86.41 97.323-126.371 79.297-41.74-18.826-51.001-88.574-20.684-155.828 12.143-26.924 28.82-49.245 47.1-65.26l-58.93-83.59zm58.93 83.59 99.888 141.687a59.72 59.72 0 0 1 .067.103c1.389-2.758 2.799-5.495 4.09-8.357 30.312-67.24 21.052-136.992-20.684-155.816-25.019-11.282-56.003-1.585-83.361 22.382zm-8.84 355.538-71.625 95.499a59.72 59.72 0 0 1-47.776 23.886 59.72 59.72 0 0 1-35.832-11.943 59.72 59.72 0 0 1-11.943-83.608l85.18-113.574c-8.441-8.995-17.13-19.215-25.666-29.754H237.963c-14.937 15.548-30.685 29.849-44.15 38.043-35.008 21.307-78.39 52.507-71.11 124.147 7.276 71.653 80.767 102.32 129.147 99.6 48.382-2.707 139.597-11.615 204.722-2.588 65.122 9.026 147.315 2.187 166.563-66.413 8.037-28.646 5.13-52.894-3.334-73.294zM237.963 419.818c23.9-24.876 45.68-52.973 52.402-64.584 17.156-29.614 36.138-46.518 55.037-54.855H184.576c7.787 48.334-5.25 90.486-36.277 104.482-37.587 16.955-88.628-13.27-120.56-68.54a59.72 59.72 0 0 0 54.624 83.497h155.6zM27.738 336.32a59.72 59.72 0 0 1 54.625-35.941h102.213c-2.687-16.682-7.819-34.09-15.597-51.346-30.316-67.221-88.724-106.461-130.461-87.642-41.738 18.824-50.996 88.576-20.68 155.816 3.015 6.687 6.374 13.01 9.9 19.113zm317.664-35.941h63.108c-18.88-7.583-40.89-9.802-63.108 0z"
              transform="scale(.75)"
            />
          </g>
        </svg>
      </button>
      <div className="group-card__top">
        <h2 className="group-card__title">{name}</h2>
        <div className="group-card__social">
          <img src={selectedFile} alt="group-pic" className="group__photo" />
          <div className="group__members">
            {members && membersPictures(membersList)}
            {members && membersList.length > 4 && (
              <h3 className="group__members__extra" key={id}>
                And {membersList.length - 4} more...
              </h3>
            )}
          </div>
        </div>
        <p className="group-card__description">{description}</p>
      </div>
      <div className="kennel-separator"></div>
      <div className="group-card__meetups">
        <h3 className="meetups-title">Meetups</h3>
        <ul className="meetups-list">
          {meetups &&
            meetupsList.map((meetup) => (
              <div
                key={`${meetup.time}${meetup.frequency}${
                  meetup.dogSpotId
                }${Date.now().toString()}`}
              >
                <li
                  onClick={(e) => setVisibility(!visibility)}
                  className="meetup"
                >
                  <svg
                    width={24}
                    height={24}
                    xmlns="http://www.w3.org/2000/svg"
                    className="filter-dark"
                  >
                    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2Zm0-2C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111a1.3 1.3 0 0 1-1.301-1.301c0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238z" />
                  </svg>
                  <p className="meetup-text">
                    {meetup.frequency}, {meetup.time},{' '}
                    {parkGetter(meetup)?.name}
                  </p>
                </li>
                <CustomPopup
                  onClose={popupCloseHandler}
                  showing={visibility}
                  parkId={meetup.dogSpotId}
                />
              </div>
            ))}
          <form
            autoComplete="off"
            className="meetup-form"
            onSubmit={handleAddMeetup}
          >
            <button className="meetup-form__btn" type="submit">
              <svg
                width={24}
                height={24}
                xmlns="http://www.w3.org/2000/svg"
                className="filter-dark"
              >
                <path d="M17.936-.02c-.882 0-1.719.192-2.475.53A11.994 11.994 0 0 0 12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12c0-1.202-.18-2.362-.51-3.457a6.057 6.057 0 0 0 .531-2.477A6.086 6.086 0 0 0 17.936-.02zM12 2c.453 0 .897.035 1.334.094a6.055 6.055 0 0 0-1.482 3.972 6.083 6.083 0 0 0 6.084 6.084c1.52 0 2.906-.56 3.972-1.48.058.435.092.879.092 1.33 0 5.514-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm5.014.967h1.87V5.1h2.151v1.87h-2.148v2.194h-1.871V6.971h-2.178V5.1h2.176V2.967zm-5.715 2.092a.16.16 0 0 0-.172.136c-.355 1.998-1.125 6.934-1.125 7.446a1.3 1.3 0 0 0 1.3 1.3c.503 0 4.64-.75 6.548-1.11.2-.04.2-.334-.002-.372l-5.395-1.012-.984-6.236a.176.176 0 0 0-.17-.152z" />
              </svg>
            </button>
            <input
              type="text"
              name="frequency"
              id="add-meetup-frequency"
              className="add-meetup-input"
              placeholder={'Frequency'}
              onChange={handleChangeMeetup}
            />
            <input
              type="text"
              name="time"
              id="add-meetup-time"
              className="add-meetup-input"
              placeholder={'Time'}
              onChange={handleChangeMeetup}
            />
            <input
              type="text"
              name="dogSpotId"
              id="add-meetup-parkId"
              className="add-meetup-input"
              placeholder={'Park #Id'}
              onChange={handleChangeMeetup}
            />
          </form>
        </ul>
      </div>
      <div className="kennel-separator"></div>
      <div className="group-card__bottom">
        <form
          autoComplete="off"
          className="group-add-friend__form"
          onSubmit={handleAddFriend}
        >
          <button type="submit" className="addFriendBtn filter-dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 27.963 27.963"
              width={50}
              height={50}
              xmlSpace="preserve"
            >
              <path d="M13.98 0C6.259 0 0 6.26 0 13.982s6.259 13.981 13.98 13.981c7.725 0 13.983-6.26 13.983-13.981C27.963 6.26 21.705 0 13.98 0zm7.122 16.059h-4.939v5.042h-4.299v-5.042H6.862V11.76h5.001v-4.9h4.299v4.9h4.939v4.299h.001z" />
            </svg>
          </button>
          <input
            type="text"
            name="friendId"
            id="add-friend-group-friendId"
            className="add-friend-group__friendId"
            placeholder={"Friend's #ID"}
            onChange={handleChangeFriend}
            value={addFriend}
          />
        </form>
      </div>
    </div>
  );
}
