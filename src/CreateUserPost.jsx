import { useContext, useState } from "react"
import { AuthContext } from "./context"
import { createImage, addPost, fetchUser } from "./api"

const createUserPost = () => {
    const { auth } = useContext(AuthContext)
    const [title, setTitle] = useState('')
    const [postedBy, setPostedBy] = useState(undefined)
    const [textContent, setTextContent] = useState('')
    const [postImages, setPostImages] = useState(undefined)


    const submit = () => {


        fetchUser({ auth })
        .then(response => {
            console.log('fetchUser response: ', response)
            setPostedBy(response.data.id)

        // const imageToPost = createImage ({ auth, title: '', image: postImages })

            // .then(response => {
            //     console.log('Create Image Success')
            //     console.log(response)
            //     const imageToPost = response

                addPost ({ auth, title, postedBy: postedBy, textContent })
                .then(response => {
                    console.log('Create Post Success')
                    console.log(response)
                    // return response
                    
                })
                .catch(error => console.log('Create Post failure: ', error))
            })
            // .catch(error => console.log('Create Image failure: ', error))
        // })
        .catch(error => console.log('Find post creator error: ', error))

        
        // createImage ({ auth, title: '', image: postImages })
        // .then(response => {
        //     console.log('Create Image Success')
        //     console.log(response.data)
        // })
        // .catch(error => console.log('Create Image failure: ', error))


        // addPost ({ auth, title, postedBy, textContent, postImages })
        // .then(response => {
        //     console.log('Create Post Success')
        //     console.log(response.data)
        // })
        // .catch(error => console.log('Create Post failure: ', error))



    

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
                    onChange={e => setPostImages(e.target.files[0])}
                />
            </div>
            <div>
                <button onClick={() => submit()}>
                    Submit Post

                </button>
            </div>
            <hr />
        </div>
    )
}


export default createUserPost