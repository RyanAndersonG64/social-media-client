import axios from 'axios'

const baseUrl = "http://127.0.0.1:8000"

export const getToken = ({ auth, username, password }) => {
  axios.post(`${baseUrl}/token/`, {
    username: username,
    password: password
  }).then(response => {
    console.log('RESPONSE: ', response)
    auth.setAccessToken(response.data.access)
  })
  .catch(error => {
    console.log('ERROR: ', error)
    auth.setAccessToken(undefined)
  })
}

export const fetchUser = ({ auth }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/profile/`, 
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
  }).then(response => {
    console.log('PROFILE: ', response)
    return response
  })
  .catch(error => {
    console.log('ERROR: ', error)
    auth.setAccessToken(undefined)
  })
}

export const createUser = ({ username, password, firstName, lastName }) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/create-user/`, 
    data: {
      username,
      password: password,
      first_name: firstName,
      last_name: lastName
    }
  }).then(response => {
    console.log('CREATE USER: ', response)
    return response
  })
  .catch(error => {
    console.log('ERROR: ', error)
  })
}


export const getImages = ({ auth }) => {
  return axios ({
    method: 'get',
    url: `${baseUrl}/get-images`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
  })
  .then(response => {
    console.log(response.data)
    return response
  })
  .catch(error => console.log('Get images error: ', error))
}


export const createImage = ({ auth, title, image }) => {
  return axios ({
    method: 'post',
    url: `${baseUrl}/create-image/`,
    data: {
      image,
      title,
    },
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
  })
  // .then(response => {
  //   console.log(response.data)
  //   return response
  // })
  // .catch(error => console.log('Create images error: ', error))
}


export const getPosts = ({ auth }) => {
  return axios ({
    method: 'get',
    url: `${baseUrl}/get-posts`,
    headers: {
        Authorization: `Bearer ${auth.accessToken}`
    }
  })
  .then(response => {
    console.log(response.data)
    return response
  })
  .catch(error => console.log('Get posts error: ', error))
}

export const addPost = ({ auth, title, postedBy, textContent, postImages }) => {
  return axios ({
    method: 'post',
    url: `${baseUrl}/add-post/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    },
    data: {
      title,
      postedBy,
      textContent,
      postImages
    }
  })
  .then(response => {
    console.log(response.data)
    return response
  })
  .catch(error => console.log('Add post error: ', error))
}

export const deletePost = ({ auth, postId }) => {
  return axios ({
    method: 'delete',
    url: `${baseUrl}/delete-post/`,
    data: {
      postId
    },
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
  })
  .then(response => {
    console.log(response.data)
    return response
  })
  .catch(error => console.log('Delete post error: ', error))
}