import { Link } from "react-router-dom"

function Header() {
  return (
    <div style={{ margin: 10 }}>
      <Link style={{ marginRight: 20 }} to='/'>Message Board</Link>
      <Link style={{ marginRight: 20 }} to='login'>Log In</Link>
      <Link to='/imagegallery'>Image Gallery</Link>
    </div>
  )
}

export default Header