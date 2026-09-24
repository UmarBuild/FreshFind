import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react'

const BookmarkContext = createContext(null)

export function BookmarkProvider({ children }) {
  // Each entry: { type: 'market'|'produce', id, note, addedAt }
  const [items, setItems] = useState(() => [])
  const [isBarOpen, setIsBarOpen] = useState(false)

  // Persist to sessionStorage so a refresh doesn't lose state mid-session
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('ff_bookmarks')
      if (raw) setItems(JSON.parse(raw))
    } catch (_) {}
  }, [])

  useEffect(() => {
    try {
      sessionStorage.setItem('ff_bookmarks', JSON.stringify(items))
    } catch (_) {}
  }, [items])

  const isBookmarked = useCallback(
    (type, id) => items.some((i) => i.type === type && i.id === id),
    [items]
  )

  const toggleBookmark = useCallback((type, id) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.type === type && i.id === id)
      if (exists) return prev.filter((i) => !(i.type === type && i.id === id))
      return [...prev, { type, id, note: '', addedAt: Date.now() }]
    })
  }, [])

  const removeBookmark = useCallback((type, id) => {
    setItems((prev) => prev.filter((i) => !(i.type === type && i.id === id)))
  }, [])

  const updateNote = useCallback((type, id, note) => {
    setItems((prev) => prev.map((i) => (i.type === type && i.id === id ? { ...i, note } : i)))
  }, [])

  const clearAll = useCallback(() => setItems([]), [])

  const exportList = useCallback(() => {
    return items
      .map((i) => {
        if (i.type === 'market') {
          return `MARKET: ${i.id}${i.note ? ` — note: ${i.note}` : ''}`
        }
        return `PRODUCE: ${i.id}${i.note ? ` — note: ${i.note}` : ''}`
      })
      .join('\n')
  }, [items])

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      isBookmarked,
      toggleBookmark,
      removeBookmark,
      updateNote,
      clearAll,
      exportList,
      isBarOpen,
      setIsBarOpen,
    }),
    [items, isBookmarked, toggleBookmark, removeBookmark, updateNote, clearAll, exportList, isBarOpen]
  )

  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>
}

export function useBookmarks() {
  const ctx = useContext(BookmarkContext)
  if (!ctx) throw new Error('useBookmarks must be used within BookmarkProvider')
  return ctx
}
