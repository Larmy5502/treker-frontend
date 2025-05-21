// src/api.js

export async function loginUser({ email, password }) {
  const response = await fetch('http://localhost:8000/auth/jwt/create/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || 'Ошибка авторизации')
  }

  // Вернёт access и refresh
  return data
}

const BASE_URL = 'http://127.0.0.1:8000'  // замени на свой URL

export async function registerUser(data) {
  try {
    const response = await fetch(`${BASE_URL}/auth/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,              // raw (только цифры, например "79001234567")
        email: data.email,
        password: data.password,
        re_password: data.re_password,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      // Собираем первое сообщение об ошибке
      const firstError = Object.values(errorData)[0]
      throw new Error(Array.isArray(firstError) ? firstError[0] : firstError)
    }

    return await response.json()
  } catch (error) {
    throw error
  }
}



