import { useContext, useEffect } from "react"
import { useState } from "react"
import { AuthContext } from './context'
import { getPosts } from './api'


const UserPosts = () => {
    const [ posts, setPosts] = useState({})
    const { auth } = useContext(AuthContext)

    useEffect(
        () => {
            if (auth.accessToken) {
                getPosts({ auth })
                    .then(response => {
                        console.log('Get Posts Success')
                        setPosts(response.data)
                        console.log(response.data)
                    })
                    .catch(error => console.log('Get Posts Failure: ', error))
            }
        },
        [auth.accessToken]
    )

    return (
        <div>
            <hr />
            <h1>Posts</h1>
            {UserPosts && UserPosts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.textContent}</p>
                </div>
            ))}
        </div>
    )
}

export default UserPosts