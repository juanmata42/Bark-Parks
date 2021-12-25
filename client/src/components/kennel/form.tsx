import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../actions/posts';
import { getUserById } from '../../actions/user';
import './form.scss';
const Form = ({
  userId,
  userPic,
  userName,
  setPostsList,
  postsList,
}: {
  userId: string;
  userPic: string;
  userName: string;
  setPostsList: Function;
  postsList: any[];
}): JSX.Element => {
  const userStorage = JSON.parse(localStorage.getItem('user') || '{}');
  const user = useSelector((state: any) => state.user.user);
  if (
    userStorage &&
    Object.keys(userStorage).length === 0 &&
    Object.getPrototypeOf(userStorage) === Object.prototype
  ) {
    return <div>ERROR 404: NO USER FOUND</div>;
  }
  const [postData, setPostData] = useState({
    message: '',
    selectedFile: '',
    userId: userId,
  });
  const handleChange = (e: any): void => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(createPost(postData, userStorage.data.token));
    dispatch(getUserById(userId, userStorage.data.token));
    postsList.unshift({ ...postData, userPic, userName });
    setPostsList(postsList);
    clear();
  };
  const clear = () => {
    setPostData({ message: '', selectedFile: '', userId: userId });
  };

  return (
    <div className="postCreator-container">
      <img className="post-form__profilePic" src={userPic} />
      <form
        
        autoComplete="off"
        className="post-form"
        onSubmit={handleSubmit}
      >
        <textarea
          name="message"
          className="post-form__text"
          placeholder={`What have you been doing lately, ${userName}?`}
          value={postData.message}
          onChange={handleChange}
        ></textarea>
        <div className="post-form__buttons">
          <button className="post-form__submit" type="submit">
            Post
          </button>
          <input
            type="text"
            className="post-form__file"
            id="myFile"
            name="selectedFile"
            placeholder="Paste photo link"
            onChange={handleChange}
            value={postData.selectedFile}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
