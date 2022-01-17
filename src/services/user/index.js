const axios = require('axios');

export async function login(email, password) {
  let response = null
  
  await axios.post(process.env.VUE_APP_API_URL+'/post/login', {
    email,
    password
  }).then((resp) => {
    response = resp
  })
  
  if(response.data.code == 200) {
    return [response.data.code, response.data.token]
  }else {
    return [response.data.code, null]
  }
}

export async function register(email, password, name) {
  let response = null
  
  try {
    await axios.post(process.env.VUE_APP_API_URL+'/post/register', {
      email,
      password,
      name
    }).then((resp) => {
      response = resp
    })
  }catch(e) {
    return [500, null]
  }
  
  if(response.data.code == 200) {
    return [response.data.code, response.data.token]
  }else {
    return [response.data.code, null]
  }
}

export async function retriveUserInfo(token) {
  let response = null
  
  await axios.post(process.env.VUE_APP_API_URL+'/post/retriveUserInfo', {
    token
  }).then((resp) => {
    response = resp
  })
  
  if(response.data.code == 200) {
    return [response.data.code, response.data.name]
  }else {
    return [response.data.code, null]
  }
}