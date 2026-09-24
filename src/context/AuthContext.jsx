import { createContext, useContext, useState, useCallback, useMemo } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // { name, email } | null
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('login') // 'login' | 'signup'

  const openModal = useCallback((mode = 'login') => {
    setModalMode(mode)
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => setIsModalOpen(false), [])

  const login = useCallback(({ name, email }) => {
    setUser({ name: name || email.split('@')[0], email })
    setIsModalOpen(false)
  }, [])

  const logout = useCallback(() => setUser(null), [])

  const value = useMemo(
    () => ({
      user,
      isModalOpen,
      modalMode,
      openModal,
      closeModal,
      login,
      logout,
    }),
    [user, isModalOpen, modalMode, openModal, closeModal, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
