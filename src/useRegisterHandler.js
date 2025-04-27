import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from './api'

export function useRegisterHandler() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',      // отображение с маской
    phoneRaw: '',   // только цифры
    password: '',
    confirmPassword: '',
    consent: false,
  })

  const [message, setMessage] = useState(null)

  const handleChange = (field) => (e) => {
    let value = e.target.value

    if (field === 'phone') {
      // Оставляем только цифры
      let digits = value.replace(/\D/g, '')

      // Заменяем первую 8 на 7 или добавляем 7 если начинается не с 7
      if (digits.startsWith('8')) {
        digits = '7' + digits.slice(1)
      } else if (!digits.startsWith('7')) {
        digits = '7' + digits
      }

      // Ограничиваем до 11 символов
      digits = digits.slice(0, 11)

      // Если всё удалено — очищаем
      if (digits.length === 0) {
        setForm((prev) => ({ ...prev, phone: '', phoneRaw: '' }))
        return
      }

      // Форматируем
      let formatted = '+7'
      if (digits.length > 1) formatted += ` (${digits.slice(1, 4)}`
      if (digits.length >= 4) formatted += `) ${digits.slice(4, 7)}`
      if (digits.length >= 7) formatted += ` ${digits.slice(7, 9)}`
      if (digits.length >= 9) formatted += ` ${digits.slice(9, 11)}`

      setForm((prev) => ({
        ...prev,
        phoneRaw: digits,
        phone: formatted,
      }))
      return
    }

    // Остальные поля
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleRegister = async () => {
    if (!form.consent) {
      setMessage('Вы должны согласиться на обработку персональных данных.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setMessage('Пароли не совпадают.')
      return
    }

    if (!form.phoneRaw || form.phoneRaw.length !== 11) {
      setMessage('Введите корректный номер телефона.')
      return
    }

    try {
      const data = await registerUser({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phoneRaw,
        password: form.password,
      })

      localStorage.setItem('token', data.token)
      setMessage('Успешно зарегистрирован! Теперь войдите.')

      setTimeout(() => {
        navigate('/')
      }, 1500)
    } catch (error) {
      setMessage(error.message || 'Ошибка регистрации')
    }
  }


  return { form, handleChange, handleRegister, message }
}
