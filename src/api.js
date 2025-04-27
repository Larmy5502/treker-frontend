// src/api.js

export async function loginUser({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@test.com' && password === '123456') {
        resolve({ token: 'fake-jwt-token' })
      } else {
        reject(new Error('Неверный email или пароль'))
      }
    }, 1000)
  })
}

export async function registerUser(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email && data.password && data.firstName) {
        resolve({ token: 'fake-register-token' })
      } else {
        reject(new Error('Пожалуйста, заполните все поля'))
      }
    }, 1000)
  })
}


