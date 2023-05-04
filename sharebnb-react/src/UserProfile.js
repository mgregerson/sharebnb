import { useNavigate } from "react-router-dom";

/**
 *
 */
function UserProfile({ user }) {

  return (
    <div className='UserProfile'>
      <h1>Welcome John Doe </h1>
      <ul>{user.rentals}</ul>
      <button onClick={useNavigate(`/rentals/${user.username}/add`)} >
        Add a rental
      </button>
    </div>
  )
}


export default UserProfile;