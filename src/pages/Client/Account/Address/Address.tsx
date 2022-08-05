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
import { useGetClient } from '../../../../hooks/client/useGetClient'
import { useUpdateClient } from '../../../../hooks/client/useUpdateClient'
import { useMessageContext } from '../../../../contexts/message-context'

// interfaces
interface IProps {}
interface IFormData {
  street?: string
  zipCode?: string
  district?: string
  city?: string
  state?: string
  country?: string
}
import { IUpdateClientUseCaseModel } from '../../../../protocols/usecase/client/update-client-protocol'
import { IAddress } from '../../../../protocols/entities/account/client-entitie'

const Address = (props: IProps) => {
  const [street, setStreet] = useState<string>('')
  const [zipCode, setZipCode] = useState<string>('')
  const [district, setDistrict] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const { address, getAddressZipCode }: IUseZipCode = useZipCode()
  const { data: countries, error: getJsonError, getJson }: IUseJson = useJson()
  const {
    error: getClientError,
    loading: getClientLoading,
    client,
    getClient,
  } = useGetClient()
  const {
    error: updateClientError,
    loading: updateClientLoading,
    success: updateClientSuccess,
    updateClient,
  } = useUpdateClient()
  const { dispatch: messageDispatch } = useMessageContext()

  // get countries
  useEffect(() => {
    getJson(json.countriesJSON)
  }, [])

  // get zipcode
  useEffect(() => {
    if (country && zipCode.length >= 5 && zipCode.length <= 12) {
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

  // get client address
  useEffect(() => {
    getClient()
  }, [])

  useEffect(() => {
    if (client) {
      setStreet(client.address!.street || '')
      setZipCode(client.address!.zipCode || '')
      setDistrict(client.address!.district || '')
      setCity(client.address!.city || '')
      setState(client.address!.state || '')
      setCountry(client.address!.country || '')
    }
  }, [client])

  // update client address
  const handleUpdateClientAddress = (e: any) => {
    e.preventDefault()
    const formData: IFormData = {
      street,
      zipCode,
      district,
      city,
      state,
      country,
    }
    let addressClientToUpdate: IUpdateClientUseCaseModel = {}
    Object.keys(formData).map((key: string) => {
      if (
        formData[key as keyof IFormData] !==
        client!.address![key as keyof IAddress]
      ) {
        Object.assign(addressClientToUpdate, {
          ...addressClientToUpdate,
          [key]: formData[key as keyof IFormData],
        })
      }
    })

    addressClientToUpdate && updateClient(addressClientToUpdate)
  }

  // setup messages
  useEffect(() => {
    if (getClientError || updateClientError) {
      messageDispatch({
        type: 'OPEN',
        component: 'ACCOUNT',
        messageContent: {
          type: 'ERROR',
          body: getClientError || updateClientError,
        },
        style: 'msg-client-error',
      })
    }
  }, [getClientError, updateClientError])
  useEffect(() => {
    if (updateClientSuccess) {
      messageDispatch({
        type: 'OPEN',
        component: 'ACCOUNT',
        messageContent: {
          type: 'ERROR',
          body: getClientError || updateClientError,
        },
        style: 'msg-client-success',
      })
    }
  }, [updateClientSuccess])
  // avoid memory leak
  useEffect(() => {
    return () => {}
  }, [])
  return (
    <section className="address">
      {/* section loading */}
      {getClientLoading ? (
        <span className="msg-loading">Loading...</span>
      ) : (
        <>
          {/* address warning message */}
          <div className="warning">
            <BsFillExclamationSquareFill className="icons" />
            <span>
              Try enter your country and zip code to fill other fields
              automatically
            </span>
          </div>
          {/* address form */}
          <form onSubmit={handleUpdateClientAddress} className="informations">
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
                  value={country}
                  defaultValue={''}
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
            {updateClientLoading ? (
              <button className="btn btn-primary" disabled>
                Loading...
              </button>
            ) : (
              <button className="btn btn-primary">Save</button>
            )}
          </form>
        </>
      )}
    </section>
  )
}

export default Address
