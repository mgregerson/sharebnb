import { useNavigate } from "react-router-dom";

/**
 *
 */
function UserProfile({ user }) {
  const navigate = useNavigate()

  return (
    <div className='UserProfile'>
      <h1>Welcome John Doe </h1>
      <ul>{}</ul>
      <button onClick={() => navigate(`/rentals/${user.username}/add`)} >Add a rental</button>
    </div>
  )
}


export default UserProfile;