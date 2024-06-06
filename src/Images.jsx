import { useContext, useEffect } from "react"
import { useState } from "react"
import { AuthContext } from './context'
import { ImageContext } from "./imageconext"
import { getImages, fetchUser, deleteImage, likeImage } from './api'


const Images = () => {
    const [ images, setImages] = useState([])
    const { auth } = useContext(AuthContext)
    const { imageState, setImageState} = useContext(ImageContext)
    const [userId, setUserId] = useState(0)
    fetchUser({ auth })
        .then(response => {
            console.log('fetchUser response: ', response.data.id)
            setUserId(response.data.id)
        })


    useEffect(
        () => {
            if (auth.accessToken) {
                getImages({ auth })
                    .then(response => {
                        console.log('Get Images Success')
                        setImageState(response.data)
                        setImages(response.data)
                        console.log(response.data)
                    })
                    .catch(error => console.log('Get Images Failure: ', error))
            }
        },
        [auth.accessToken]
    )

    return (
        <div>
            <hr />
            <h1>Images</h1>
            <label htmlFor="imageFilter">Sort images by:</label>
            <select id="imageTypes" name="imageTypes" onChange = {(e) => {
                console.log(e.target.value)
                if (e.target.value === 'All Images') {
                    getImages({ auth })
                    .then(response => {
                        setImageState(response.data)
                    })
                    .catch(error => console.log('Get Images Failure: ', error))
                } else if (e.target.value === 'Your Images') {
                    getImages({ auth })
                    .then(response => {
                        setImageState(response.data.filter((image) => image.posted_by === userId))
                    })
                    .catch(error => console.log('Get Images Failure: ', error))
                } else if (e.target.value === 'Liked Images') {
                    getImages({ auth })
                    .then(response => {
                        setImageState(response.data.filter((image) => image.liked_by.includes(userId)))
                    })
                    .catch(error => console.log('Get Images Failure: ', error))
                } else {
                    setImageState(images)
                }
                    }
                }
                >
            <option value = 'All Images'>All Images</option>
            <option value = 'Your Images'>Your Images</option>
            <option value = 'Liked Images'>Liked Images</option>

            </select>
            {Images && imageState.map(image => (
                <div key={image.id}>
                    <h3>{image.title}</h3>
                    <div>
                        <img src={`http://127.0.0.1:8000/${image.image}`}
                        style = {{width: '50%'}}
                        />
                    </div>
                    <br></br>
                    <button onClick = {() => {
                        console.log('Like has been pressed')
                        likeImage ({ auth, current_user: userId, image_id: image.id, likes: image.likes }) 
                        .then(response => { 
                            console.log('response from likeImage')
                            getImages({ auth })
                            .then(res => {
                                console.log('res from getImages: ', res)
                                setImageState(res.data)}) 
                        })  
                        
                     }}>
                        Like
                    </button>

                    <button style={{ marginLeft: 20 }} onClick = {() => {
                        if (image.posted_by === userId) {
                            console.log('Delete has been pressed')
                            deleteImage ({ auth, imageId : image.id }) 
                            .then(response => { 
                                getImages({ auth })
                                .then(res => {
                                    console.log('res from getImages: ', res)
                                    setImageState(res.data)})
                                    setImages(res.data) 
                            })  
                        } else {
                            alert("You can't delete someone else's image")
                        }
                    }}>
                        Delete
                    </button>
                    <h6> Likes: {image.likes} </h6>
                    
                    <br></br>
                    <h6> Posted by {image.poster_name} at {image.created_at} </h6>
                    <hr />
                </div>
            ))}
        </div>
    )
}

export default Images