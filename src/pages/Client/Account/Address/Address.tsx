import React, { useEffect, useState } from 'react'

// styles
import './Address.css'
import { BsFillExclamationSquareFill } from 'react-icons/bs'
import { FaCity, FaMap, FaMapMarkerAlt, FaMapSigns } from 'react-icons/fa'
import { MdMapsHomeWork } from 'react-icons/md'
import { AiFillHome } from 'react-icons/ai'

// helpers
import { json } from '../../../../helpers/url'

// hooks
import { IUseJson, useJson } from '../../../../hooks/system/json/useJson'
import {
  IUseZipCode,
  useZipCode,
} from '../../../../hooks/system/api/useZipCode'

// interfaces
interface IProps {}

const Address = (props: IProps) => {
  const [street, setStreet] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [zipCode, setZipCode] = useState<string>('')
  const [district, setDistrict] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const { address, getAddressZipCode }: IUseZipCode = useZipCode()
  const { data: countries, error, getJson }: IUseJson = useJson()

  // countries
  useEffect(() => {
    getJson(json.countriesJSON)
  }, [])
  // zipcode
  useEffect(() => {
    if (country && zipCode.length >= 5) {
      getAddressZipCode(zipCode, country)
    }
  }, [zipCode, country])
  // get address zip code promise
  // it does not needs the fields zipCode, Country because it's already inserted
  useEffect(() => {
    setStreet(address.street || street)
    setState(address.state || state)
    setDistrict(address.district || district)
    setCity(address.city || city)
  }, [address])
  return (
    <section className="address">
      <div className="warning">
        <BsFillExclamationSquareFill className="icons" />
        <span>
          Try enter your country and zip code to fill other fields automatically
        </span>
      </div>
      <form className="informations">
        <label className="one-line">
          <label>
            <span>Street:</span>
            <FaMapSigns className="icons" />
            <input
              type="text"
              placeholder="Street"
              onChange={(e) => setStreet(e.target.value)}
              value={street}
            />
          </label>
          <label>
            <span>State:</span>
            <FaMapMarkerAlt className="icons" />
            <input
              type="text"
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
              value={state}
            />
          </label>
        </label>
        <label className="one-line">
          <label>
            <span>Zip Code:</span>
            <AiFillHome className="icons" />
            <input
              className="mark-input"
              type="text"
              placeholder="Postal Code"
              onChange={(e) => setZipCode(e.target.value)}
              value={zipCode}
            />
          </label>
          <label>
            <span>District:</span>
            <MdMapsHomeWork className="icons" />
            <input
              type="text"
              placeholder="District"
              onChange={(e) => setDistrict(e.target.value)}
              value={district}
            />
          </label>
        </label>
        <label className="one-line">
          <label>
            <span>City:</span>
            <FaCity className="icons" />
            <input
              type="text"
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </label>
          <label>
            <span>Country:</span>
            <FaMap className="icons" />

            <select
              defaultValue={country}
              onChange={(e) => setCountry(e.target.value)}
              id=""
            >
              {countries && Object.keys(countries).length && (
                <>
                  <option value={''}>Country</option>
                  {Object.keys(countries).map((flag: string) => (
                    <option key={flag} value={flag}>
                      {countries[flag]}
                    </option>
                  ))}
                </>
              )}
            </select>
          </label>
        </label>
        <button className="btn btn-primary">Save</button>
      </form>
    </section>
  )
}

export default Address
