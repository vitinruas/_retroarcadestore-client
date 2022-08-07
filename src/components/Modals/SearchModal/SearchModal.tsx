import React from 'react'

// styles
import './SearchModal.css'
import { BiArrowBack } from 'react-icons/bi'

// components
import SearchInput from '../../SearchInput/SearchInput'
import { useModalContext } from '../../../contexts/modal-context'

interface IProps {}

const SearchModal = (props: IProps) => {
  // contextos
  const { modalDispatch } = useModalContext()

  // hadle close modal
  const handleCloseProductModal = () => {
    modalDispatch({
      type: 'CLOSE',
      reactComponent: null,
    })
  }
  return (
    <section className="search-modal">
      <button className="btn close-button" onClick={handleCloseProductModal}>
        <BiArrowBack className="icons" />
      </button>
      <h1>Search for various products...</h1>
      <div>
        <SearchInput />
      </div>
    </section>
  )
}

export default SearchModal
