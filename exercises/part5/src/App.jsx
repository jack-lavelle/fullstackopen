import { useState, useEffect } from 'react'
import NewBlogForm from './components/NewBlogForm';
import blogService from './services/blogs'
import loginService from './services/login'
import BlogsList from './components/Blogs';

const styles = {
  errorBox: {
    backgroundColor: '#3b1f2b',
    color: '#ffbaba',
    border: '1px solid #ff4d4d',
    padding: '12px 16px',
    borderRadius: '6px',
    marginBottom: '16px',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    boxShadow: '0 0 10px rgba(255, 0, 0, 0.2)',
  },
  successBox: {
    backgroundColor: '#1f3b2b',
    color: '#baffba',
    border: '1px solid #4dff4d',
    padding: '12px 16px',
    borderRadius: '6px',
    marginBottom: '16px',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    boxShadow: '0 0 10px rgba(0, 255, 0, 0.2)',
  }
};

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div style={styles.successBox} className="success">{message}</div>;
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div style={styles.errorBox} className="error">{message}</div>;
};

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const logoutButton = () => (
    <button onClick={handleLogout}>
      logout
    </button>
  )

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const returnedUser = await loginService.login({
        username: userName,
        password: userPassword
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(returnedUser))
      blogService.setToken(returnedUser.token)
      setUser(returnedUser.user)
      setUserName('')
      setUserPassword('')
    } catch (exception) {
      setErrorMessage('Login failed, please check your credentials.')
      setTimeout(() => {
        setErrorMessage(null)
        setUserName('')
        setUserPassword('')
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username <input type="text" value={userName} name="Username" onChange={({ target }) => setUserName(target.value)} />
      </div>
      <div>
        password <input type="password" value={userPassword} name="Password" onChange={({ target }) => setUserPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser.user)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  useEffect(() => {
    if (user !== null) {
      blogService.getAll().then(blogs => {
        setBlogs(blogs)
      })
    }
  }, [user])

  return (
    <div>
      <h1>Blogs</h1>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      {
        user === null ?
          loginForm() :
          <div>
            <p>Welcome {user.name}!</p>
            <NewBlogForm
              blogs={blogs}
              setBlogs={setBlogs}
              setSuccessMessage={setSuccessMessage}
              setErrorMessage={setErrorMessage}
            />
            <BlogsList blogs={blogs} />
            {logoutButton()}
          </div>
      }
    </div>
  )
}

export default App
