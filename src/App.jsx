import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import BookmarkBar from './components/BookmarkBar'
import AuthModal from './components/AuthModal'
import CustomCursor from './components/CustomCursor'
import ScrollToTop from './components/ScrollToTop'
import ScrollProgress from './components/ScrollProgress'
import LoadingScreen from './components/LoadingScreen'
import PageTransition from './components/PageTransition'

import Home from './pages/Home'
import MarketDirectory from './pages/MarketDirectory'
import MarketDetail from './pages/MarketDetail'
import ProduceGuide from './pages/ProduceGuide'
import About from './pages/About'
import Contact from './pages/Contact'

import { BookmarkProvider } from './context/BookmarkContext'
import { AuthProvider } from './context/AuthContext'

function NotFound() {
  return (
    <div className="pt-32 pb-16 min-h-screen">
      <div className="container-ff text-center">
        <p className="font-display text-8xl text-emerald/15 font-bold">404</p>
        <h1 className="font-display text-3xl text-emerald -mt-4">Page not found</h1>
        <p className="text-charcoal/70 mt-2">This route doesn't exist on FreshFind.</p>
        <a href="/" className="btn-primary mt-6 inline-flex">Back to home</a>
      </div>
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <PageTransition>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/markets" element={<MarketDirectory />} />
        <Route path="/market/:id" element={<MarketDetail />} />
        <Route path="/produce" element={<ProduceGuide />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageTransition>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BookmarkProvider>
        <LoadingScreen />
        <CustomCursor />
        <ScrollToTop />
        <ScrollProgress />
        <Header />

        <main>
          <AnimatedRoutes />
        </main>

        <Footer />

        {/* Global floating widgets */}
        <Chatbot />
        <BookmarkBar />
        <AuthModal />
      </BookmarkProvider>
    </AuthProvider>
  )
}
