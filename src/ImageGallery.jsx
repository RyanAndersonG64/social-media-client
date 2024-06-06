import Images from './Images'
import UploadImage from './UploadImage'
import { useContext, useState } from 'react'
import { AuthContext } from './context'
import CreateUserPost from './CreateUserPost'
import UserPosts from './UserPosts'

function App() {

  const { auth } = useContext(AuthContext)
  const [userId, setUserId] = useState(0)


  return (
    <div className="p-5">
      <UploadImage />
      <Images />
    </div>
  )
}

export default App