import { useContext, useState } from "react"
import { AuthContext } from "./context"
import { createImage, addPost } from "./api"

const createUserPost = () => {
    const { auth } = useContext(AuthContext)
    const [title, setTitle] = useState('')
    const [postedBy, setPostedBy] = useState(undefined)
    const [textContent, setTextContent] = useState('')
    const [postImages, setPostImages] = useState(undefined)
    const [userId, setUserId] = useState(0)

    const submit = () => {
        fetchUser({ auth })
            .then(response => { 
                setUserId(response.data.id)
                addPost ({ auth, title, postedBy : userId, textContent, postImages })
                .then(response => {
                    console.log('Create Post Success')
                    console.log(response)
                })
                .catch(error => console.log('Create Post failure: ', error))
    })
        .catch(error => console.log('Find Post Creator failure: ', error))
    }

    return (
        <div>
            <h1>Create a Post</h1>
            <h2>Post Title</h2>
            <input
                onChange = {e =>setTitle(e.target.value)}
                value = {title}
            />
            <br></br>
            <h2>Post Content</h2>
            <input
                onChange = {e =>setTextContent(e.target.value)}
                value = {textContent}
            />
            <hr />
            <div>
                Add an Image
                <input 
                    accept='image/*'
                    type='file'
                    onChange={e => setImage(e.target.files[0])}
                />
            </div>
            <div>
                <button onClick={() => submit()}>
                    Submit

                </button>
            </div>
            <hr />
        </div>
    )
}


export default createUserPost