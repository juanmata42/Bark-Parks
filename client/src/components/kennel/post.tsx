import './post.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../actions/posts';
import { getUserById } from '../../actions/user';
type PostProps = {
  profilePhoto: string;
  name: string;
  message: string;
  selectedFile: string;
  key: string;
  userId: string;
  postId: string;
  creatorId: string;
  setPostsList: Function;
  postsList: any[];
};
const Post = ({
  profilePhoto,
  name,
  message,
  selectedFile,
  userId,
  postId,
  creatorId,
  setPostsList,
  postsList,
}: PostProps): JSX.Element => {
  const dispatch = useDispatch();
  const userStorage = JSON.parse(localStorage.getItem('user') || '{}');
  if (
    userStorage &&
    Object.keys(userStorage).length === 0 &&
    Object.getPrototypeOf(userStorage) === Object.prototype
  ) {
    return <div>ERROR 404: NO USER FOUND</div>;
  }
  const user = useSelector((state: any) => state.user.user);
  const handleDelete = () => {
    dispatch(deletePost(postId, userId, userStorage.data.token));
    dispatch(getUserById(userId, userStorage.data.token));
    postsList.splice(postsList.indexOf(postId), 1);
    setPostsList(postsList);
  };
  return (
    <div className="post-container">
      {userId === creatorId ? (
        <button className="delete-friend-btn" onClick={handleDelete}>
          X
        </button>
      ) : null}
      <header className="post__header">
        <div className="post__user">
          <img
            className="post__profilePhoto"
            src={profilePhoto}
            alt={`profilePhoto ${name}`}
          />
          <h3 className="post__name">{name}</h3>
        </div>
        <p className="post__message">{message}</p>
      </header>
      {selectedFile && (
        <img className="post__picture" src={selectedFile} alt="profile" />
      )}
    </div>
  );
};
export default Post;
