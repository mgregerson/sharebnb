import { useNavigate } from "react-router-dom";

/**
 *
 */
function UserProfile({ user }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/rentals/john_doe/add`);
  }

  return (
    <div className='UserProfile'>
      <h1>Welcome John Doe </h1>
      <ul>{}</ul>
      <button onClick={handleClick} >
        Add a rental
      </button>
    </div>
  )
}


export default UserProfile;