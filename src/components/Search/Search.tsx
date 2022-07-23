import React from 'react'

// styles
import './Search.css'
import { AiOutlineSearch } from 'react-icons/ai'

interface IProps {}

const Search = (props: IProps) => {
  return (
    <form className="search">
      <label>
        <button className="search">
          <AiOutlineSearch className="icons" />
        </button>
        <input type="search" placeholder="Search here..." autoFocus />
      </label>
    </form>
  )
}

export default Search
