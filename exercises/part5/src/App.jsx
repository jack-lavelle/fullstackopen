import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

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

  const BlogForm = () => {
    const [newBlog, setNewBlog] = useState({
      title: '',
      author: '',
      url: ''
    })

    const addBlog = async () => {
      try {
        await blogService.create(newBlog)
        setBlogs(blogs.concat(newBlog))
        setSuccessMessage(`Successfully added a new blog "${newBlog.title}" by ${newBlog.author} added!`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      } catch (exception) {
        console.error('Error adding new blog:', exception)
        setErrorMessage('Failed to add new blog.')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }

    const handleChange = (event) => {
      const { name, value } = event.target;
      setNewBlog(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmitNewBlog = (event) => {
      event.preventDefault();
      addBlog(newBlog);
    }

    return (
      <form onSubmit={handleSubmitNewBlog}>
        <div>
          title <input type="text" value={newBlog?.title || ''} name="title" onChange={handleChange} />
        </div>
        <div>
          author <input type="text" value={newBlog?.author || ''} name="author" onChange={handleChange} />
        </div>
        <div>
          url <input type="text" value={newBlog?.url || ''} name="url" onChange={handleChange} />
        </div>
        <button type="submit">create</button>
      </form>
    )
  }

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

  const blogsMap = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
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
            {blogsMap()}
            <BlogForm />
            {logoutButton()}
          </div>
      }
    </div>
  )
}

export default App
