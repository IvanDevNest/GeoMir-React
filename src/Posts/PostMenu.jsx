import React from 'react'
import { Link } from 'react-router-dom'

const PostMenu = () => {
  return (
    <div className='menu'>
    <Link className='click' to="/posts/add">Afegir + </Link>
    <Link className='click orange' to="/posts/grid">Grid </Link>
    <Link className='click blue' to="/posts/list">Llista </Link>
</div>
  )
}

export default PostMenu 