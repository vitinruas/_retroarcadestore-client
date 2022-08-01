import React from 'react'
import { FaCity, FaMap, FaMapMarkerAlt } from 'react-icons/fa'
import { MdMapsHomeWork } from 'react-icons/md'

// styles
import './Address.css'
import { BsFillExclamationSquareFill } from 'react-icons/bs'

interface IProps {}

const Address = (props: IProps) => {
  return (
    <section className="address">
      <div className="warning">
        <BsFillExclamationSquareFill className="icons" />
        <span>
          You can enter your zip code to fill other fields automatically
        </span>
      </div>
      <form>
        <label>
          <span>Street:</span>
          <FaMapMarkerAlt className="icons" />
          <input type="text" placeholder="Street" />
        </label>
        <label className="one-line">
          <label>
            <span>Postal Code:</span>
            <MdMapsHomeWork className="icons" />
            <input type="text" placeholder="Postal Code" />
          </label>
          <label>
            <span>District:</span>
            <MdMapsHomeWork className="icons" />
            <input type="text" placeholder="District" />
          </label>
        </label>
        <label className="one-line">
          <label>
            <span>City:</span>
            <FaCity className="icons" />
            <input type="text" placeholder="City" />
          </label>
          <label>
            <span>Country:</span>
            <FaMap className="icons" />
            <input type="text" placeholder="Country" />
          </label>
        </label>
        <button className="btn btn-primary">Salvar</button>
      </form>
    </section>
  )
}

export default Address
