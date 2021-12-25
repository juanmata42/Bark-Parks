import './groups.scss';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGroup } from '../../../actions/groups';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../../../actions/user';
import GroupCard from '../../core/group-card/group-card';
import Loading from '../../core/layout/loading';
const Groups = (): JSX.Element => {
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
  const users = useSelector((state: any) => state.users.users) || [];
  const groups = useSelector((state: any) => state.groups.groups) || [];
  if (!groups) {
    return <Loading />;
  }
  const initialState = {
    userId: user._id,
    selectedFile:
      'https://i.pinimg.com/originals/5c/e5/e2/5ce5e2ceac058952506371f624c27e8f.jpg',
    name: "Group's name",
    creator: user._id,
    description: "Group's description",
  };
  const groupGetter = (groupId: string) => {
    return groups.find((group: any) => group._id === groupId);
  };
  const friendsList = users;

  let groupsObjectList: any[] = [];
  useEffect(() => {
    user.groups &&
      user.groups.map((groupId: any) =>
        groupsObjectList.push(groupGetter(groupId))
      );
  }, []);

  const [groupsList, setGroupsList] = useState(groupsObjectList);
  const [form, setForm] = useState(initialState);
  const handleChange = (e: any): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(groupsList[0]._id);
  };
  const handleCreateGroup = (e: any) => {
    e.preventDefault();
    dispatch(createGroup(form, userStorage.data.token));
    setGroupsList([...groups, form]);
  };

  return (
    <div className="parks-container page-with-subheader">
      <form
        autoComplete="off"
        className="create-group__form"
        onSubmit={handleCreateGroup}
      >
        <div className="create-group__top">
          <button type="submit" className="addGroupBtn">
            <svg
              width={100}
              height={100}
              viewBox="0 0 14.279 11.857"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                style={{
                  fill: '#46433c',
                  fillOpacity: 1,
                  strokeWidth: 0.264583,
                }}
                d="M126.781 75.684h3.675v.735h-3.675z"
                transform="translate(-116.9 -69.716)"
              />
              <path
                transform="rotate(-29.854 -189.205 184.393)"
                style={{
                  fill: '#46433c',
                  fillOpacity: 1,
                  strokeWidth: 0.264585,
                }}
                d="M72.46 126.989h3.675v.735H72.46z"
              />
              <path
                transform="rotate(-60.225 -118.552 65.922)"
                style={{
                  fill: '#46433c',
                  fillOpacity: 1,
                  strokeWidth: 0.264588,
                }}
                d="M-1.335 144.477H2.34v.735h-3.675z"
              />
              <path
                d="m122.739 76.42 1.47-2.573-1.838-2.94-3.333 3.725-1.811-.418.477 1.91-.805.9 5.157 2.196 2.52-2.8zm-2.021-1.103a.551.551 0 1 1 0-1.103.551.551 0 0 1 0 1.103z"
                style={{
                  fill: '#46433c',
                  fillOpacity: 1,
                  strokeWidth: 0.264583,
                }}
                transform="translate(-116.9 -69.716)"
              />
              <path
                style={{
                  fill: '#b36b39',
                  fillOpacity: 1,
                  strokeWidth: 0.264583,
                }}
                d="M127.503 78.037h3.675v.735h-3.675z"
                transform="translate(-116.9 -69.716)"
              />
              <path
                transform="rotate(-29.854 -189.205 184.393)"
                style={{
                  fill: '#b36b39',
                  fillOpacity: 1,
                  strokeWidth: 0.264585,
                }}
                d="M71.915 129.389h3.675v.735h-3.675z"
              />
              <path
                transform="rotate(-60.225 -118.552 65.922)"
                style={{
                  fill: '#b36b39',
                  fillOpacity: 1,
                  strokeWidth: 0.264588,
                }}
                d="M-3.019 146.272H.656v.735h-3.675z"
              />
              <path
                d="m123.46 78.771 1.471-2.572-1.838-2.94-3.333 3.726-1.811-.418.477 1.91-.805.899 5.157 2.196 2.52-2.8zm-2.02-1.102a.551.551 0 1 1 0-1.102.551.551 0 0 1 0 1.102z"
                style={{
                  fill: '#b36b39',
                  fillOpacity: 1,
                  strokeWidth: 0.264583,
                }}
                transform="translate(-116.9 -69.716)"
              />
            </svg>
          </button>
          <h2 className="createGroupTitle">Create a group</h2>
        </div>
        <div className="create-group__bottom">
          <div className="create-group__l1">
            <input
              type="text"
              name="selectedFile"
              id="create-group-selectedFile"
              className="create-group__selectedFile"
              placeholder={"Group's photo link"}
              onChange={handleChange}
            />
            <input
              type="text"
              name="name"
              id="create-group-name"
              className="create-group__name"
              placeholder={"Group's name"}
              onChange={handleChange}
            />
          </div>
          <textarea
            name="description"
            id="create-group-description"
            className="create-group__description"
            placeholder={'What defines your group?'}
            onChange={handleChange}
          />
        </div>
      </form>
      {groupsList &&
        groupsList?.map(
          ({
            selectedFile,
            name,
            description,
            meetups,
            _id,
            members,
          }: {
            selectedFile: string;
            name: string;
            description: string;
            meetups: { frequency: string; time: string; dogSpotId: string }[];
            _id: string;
            members: string[];
          }) => (
            console.log(groupsList),
            (
              <GroupCard
                selectedFile={selectedFile}
                name={name}
                description={description}
                meetups={meetups}
                id={_id}
                key={_id}
                members={members}
                setGroupsList={setGroupsList}
                groupsList={groupsList}
              />
            )
          )
        )}
    </div>
  );
};
export default Groups;
