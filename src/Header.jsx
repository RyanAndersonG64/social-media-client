import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "./context"
import { getToken } from "./api"

function Header() {
  const navigate = useNavigate()
  return (
    <div style={{ margin: 10 }}>
      <Link style={{ marginRight: 20 }} to='/app'>Message Board</Link>
      <Link style={{ marginRight: 20 }} to='/'>Log In</Link>
      <Link to='/imagegallery'>Image Gallery</Link>
      <button style={{ marginLeft: 20 }}
        onClick = {() => {
          //clear local storage
          navigate('/')
        }}
      >
        Log Out
      </button>
    </div>
  )
}

export default Header