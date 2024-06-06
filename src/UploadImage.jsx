import { useContext, useState } from "react"
import { AuthContext } from "./context"
import { createImage, fetchUser } from "./api"

const UploadImage = () => {
    const { auth } = useContext(AuthContext)
    const [image, setImage] = useState(undefined)
    const [title, setTitle] = useState('')
    const [userId, setUserId] = useState(0)
    fetchUser({ auth })
        .then(response => {
            console.log('fetchUser response: ', response.data.id)
            setUserId(response.data.id)
        })

    const submit = () => {
        createImage ({ auth, posted_by: userId, title, image })
        .then(response => {
            console.log('Create Image Success')
            console.log(response)
        })
        .catch(error => console.log('Create Image failure: ', error))
    }

    return (
        <div>
            <h1>Upload Image</h1>
            <div>Image Title</div>
            <input
                onChange = {e =>setTitle(e.target.value)}
                value = {title}
            />
            <div>
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
        </div>
    )
}


export default UploadImage