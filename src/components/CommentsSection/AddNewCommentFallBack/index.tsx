import { Link } from 'react-router-dom';

function AddNewCommentFallBack() {
  return (
    <>
      <p>
        <b>Leave a comment</b>
      </p>
      <p>
        Only authorized users can leave comments. Please <Link to="/sign-in">Login</Link> or{' '}
        <Link to="/sign-up">Register</Link>
      </p>
    </>
  );
}

export default AddNewCommentFallBack;
