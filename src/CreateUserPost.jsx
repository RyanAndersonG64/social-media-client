import { useContext, useState } from "react"
import { AuthContext } from "./context"
import { createImage, addPost, fetchUser, getPosts } from "./api"
import UserPosts from "./UserPosts"
import Images from "./Images"

const createUserPost = () => {
    const { auth } = useContext(AuthContext)
    const [title, setTitle] = useState('')
    const [textContent, setTextContent] = useState('')
    const [postImages, setPostImages] = useState(undefined)
    const [userPosts, setUserPosts] = useState([])


    const submit = () => {


        fetchUser({ auth })
        .then(response => {
            console.log('fetchUser response: ', response.data.id)
            const poster = response.data.id
            // setPostedBy(response.data.id)
            // console.log(postedBy)

        // const imageToPost = createImage ({ auth, title: '', image: postImages })

            // .then(response => {
            //     console.log('Create Image Success')
            //     console.log(response)
            //     const imageToPost = response

                addPost ({ auth, title, postedBy: poster, textContent })
                .then(response => { 
                    console.log('response from AddPost: ', response)
                    getPosts({ auth })
                    .then(res => {
                        console.log('res from getPosts: ', res)
                        setUserPosts(res.data)}) 
                    
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
                {/* <label htmlFor="images">Select an image:</label>
                <select id="images" name="images" onChange = {(e) => {
                    console.log(e.target.value)
                    setPostImages(menu.filter(menuItem => !menuItem.allergens.includes(e.target.value)))
                        }
                    }
                    >
                    {selectedAllergen.map(item => {
                        return (
                            <option key = {item.id} value = {item.name}>{item.name}</option>
                        )
                    })}
                </select> */}
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