import { useContext, useEffect } from "react"
import { useState } from "react"
import { AuthContext } from './context'
import { getPosts } from './api'


const UserPosts = () => {
    const [ userPosts, setUserPosts] = useState([])
    const { auth } = useContext(AuthContext)

    useEffect(
        () => {
            if (auth.accessToken) {
                getPosts({ auth })
                    .then(response => {
                        console.log('Get Posts Success')
                        setUserPosts(response.data)
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
            {userPosts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.textContent}</p>
                    <button onClick = {() => {
                        post.like_count += 1
                     }}>
                        Like
                    </button>
                    <h6> Likes: {post.like_count} </h6> 
                    <br></br>
                    <h6> Posted by {post.posted_by} at {post.posted_at} </h6>
                    <hr />
                </div>
            ))}
        </div>
    )
}

export default UserPosts