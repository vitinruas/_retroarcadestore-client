import React from 'react'

// styles
import './Search.css'
import { FaSearch } from 'react-icons/fa'

interface IProps {}

const Search = (props: IProps) => {
  return (
    <form className="search">
      <label>
        <button className="search">
          <FaSearch className="icons" />
        </button>
        <input type="search" placeholder="Search here..." autoFocus />
      </label>
    </form>
  )
}

export default Search
