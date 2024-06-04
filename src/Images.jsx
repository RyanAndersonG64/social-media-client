import { useContext, useEffect } from "react"
import { useState } from "react"
import { AuthContext } from './context'
import { getImages } from './api'


const Images = () => {
    const [ images, setImages] = useState([])
    const { auth } = useContext(AuthContext)

    useEffect(
        () => {
            if (auth.accessToken) {
                getImages({ auth })
                    .then(response => {
                        console.log('Get Images Success')
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
            {Images && images.map(image => (
                <div key={image.id}>
                    <h3>{image.title}</h3>
                    <img src={`http://127.0.0.1:8000/${image.image}`}
                    style = {{width: '50%'}}
                    />
                </div>
            ))}
        </div>
    )
}

export default Images