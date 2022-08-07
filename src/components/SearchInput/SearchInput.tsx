import React from 'react'

// styles
import './SearchInput.css'
import { FaSearch } from 'react-icons/fa'

interface IProps {}

const SearchInput = (props: IProps) => {
  return (
    <form className="search-input">
      <label>
        <button>
          <FaSearch className="icons" />
        </button>
        <input type="search" placeholder="Search here..." autoFocus />
      </label>
    </form>
  )
}

export default SearchInput
