import { useContext, useEffect } from "react"
import { useState } from "react"
import { AuthContext } from './context'
import { getPosts, deletePost, editPost, fetchUser, addPost, likePost } from './api'
import Images from "./Images"


const UserPosts = () => {
    const [ userPosts, setUserPosts] = useState([])
    const { auth } = useContext(AuthContext)
    const [userId, setUserId] = useState(0)
    fetchUser({ auth })
        .then(response => {
            console.log('fetchUser response: ', response.data.id)
            setUserId(response.data.id)
        })
    
    // useEffect(() => {
    //     getPosts({ auth })
    //     .then(response => {
    //         console.log(response.data.length, userPosts.length)
    //         if (response.data.length > UserPosts.length) {
    //             setUserPosts(response.data)
    //             console.log(response.data.length, userPosts.length)
    //         }
    //     })         
    // },[userPosts])

    useEffect(
        () => {
            if (auth.accessToken) {
                getPosts({ auth })
                    .then(response => {
                        setUserPosts(response.data)
                        console.log('Get Posts Success')
                        console.log('posts = ', response)
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
                    <p>{post.text_content}</p>
                    {/* <img src={post.post_images}
                    style = {{width: '50%'}}
                    /> */}
                    <br></br>
                    <button onClick = {() => {
                        console.log('Like has been pressed')
                        likePost ({ auth, current_user: userId, post_id: post.id, likes: post.likes }) 
                        .then(response => { 
                            getPosts({ auth })
                            .then(res => {
                                console.log('res from likePosts: ', res)
                                setUserPosts(res.data)}) 
                        })  
                        
                     }}>
                        Like
                    </button>

                    <button style={{ marginLeft: 20 }} onClick = {() => {
                        if (post.posted_by === userId) {
                            console.log('Delete has been pressed')
                            deletePost ({ auth, postId : post.id }) 
                            .then(response => { 
                                getPosts({ auth })
                                .then(res => {
                                    console.log('res from getPosts: ', res)
                                    setUserPosts(res.data)}) 
                            })  
                        } else {
                            alert("You can't delete someone else's post")
                        }
                    }}>
                        Delete
                    </button>
                    <button style={{ marginLeft: 20 }} onClick = {() => {
                       if (post.posted_by === userId) {
                            console.log('Edit has been pressed')
                            editPost ({ auth, postId: post.id, textContent: prompt('Enter new text content'), likeCount: post.like_count })
                            .then(response => { 
                                console.log('response from editPost: ', response)
                                getPosts({ auth })
                                .then(res => {
                                    console.log('res from getPosts: ', res)
                                    setUserPosts(res.data)}) 
                            })
                        } else {
                            alert("You can't edit someone else's post")
                        }
                    }}>
                        Edit
                    </button>
                    <h6> Likes: {post.likes} </h6>

                    <br></br>
                    <h6> Posted by {post.posted_by} at {post.posted_at} </h6>
                    <hr />
                </div>
            ))}
        </div>
    )
}

export default UserPosts