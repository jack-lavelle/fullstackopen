import { useState, useImperativeHandle, forwardRef } from 'react'

const Blog = forwardRef((props, ref) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return (
      { toggleVisibility }
    )
  })

  return (
    <div style={blogStyle}>
      <span>
        <div>
          {props.blog.title} {props.blog.author}
          {visible ?
            <div>
              <div>{props.blog.url}</div>
              <div>likes {props.blog.likes} <button>like</button></div>
              <button onClick={toggleVisibility}>hide</button>
            </div> :
            <button onClick={toggleVisibility}>view</button>
          }
        </div>
      </span>
    </div>
  )
})

Blog.displayName = 'Blog'
export default Blog
