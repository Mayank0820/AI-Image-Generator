import { useState, useEffect } from 'react'
import { Menu, X, User, LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import logo from "../assets/images/logo.png"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const checkUserLoggedIn = () => {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      } else {
        setUser(null)
      }
    }

    checkUserLoggedIn()

    window.addEventListener('userLoggedIn', checkUserLoggedIn)

    window.addEventListener('storage', checkUserLoggedIn)

    return () => {
      window.removeEventListener('userLoggedIn', checkUserLoggedIn)
      window.removeEventListener('storage', checkUserLoggedIn)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <img src={logo} alt="Mercedes Logo" className="nav-logo" />
        <span className="brand-text">AI Generator</span>
      </div>

      <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/profile" className="nav-link">Edit Profile</Link></li>
        </ul>
        
        <div className="nav-buttons">
          {user ? (
            <>
              <span className="user-greeting">Hi {user.username}</span>
              <button className="btn-login" onClick={handleLogout}>
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="btn-login">
                  <User size={20} />
                  <span>Login</span>
                </button>
              </Link>
              <Link to="/signup">
                <button className="btn-signup">Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </div>

      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </nav>
  )
}