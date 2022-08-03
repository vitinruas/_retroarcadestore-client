import React from 'react'
import { NavLink } from 'react-router-dom'

// styles
import './Footer.css'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className="footer">
      <section className="navigation">
        {/* app nav */}
        <div className="app-nav">
          <ul>
            <li>
              <NavLink to={'/'}>Home</NavLink>
            </li>
            <li>
              <NavLink to={'/games'}>Games</NavLink>
            </li>
            <li>
              <NavLink to={'/clothes'}>Clothes</NavLink>
            </li>
            <li>
              <NavLink to={'/accessories'}>Accessories</NavLink>
            </li>
          </ul>
        </div>
        {/* user nav */}
        <div className="user-nav">
          <ul>
            <li>
              <NavLink to={'/account/profile'}>My Account</NavLink>
            </li>
            <li>
              <NavLink to={'/null'}>Cart</NavLink>
            </li>
            <li>
              <NavLink to={'/null'}>Favorites</NavLink>
            </li>
            <li>
              <NavLink to={'/account/address'}>Address</NavLink>
            </li>
          </ul>
        </div>
        {/* others nav */}
        <div className="others-nav">
          <ul>
            <li>
              <a href="https://github.com/vitinruas" target={'_blank'}>
                Git Hub - Vitin Ruas
              </a>
            </li>
            <li>
              <NavLink to={'/null'}>Terms and Conditions</NavLink>
            </li>
            <li>
              <NavLink to={'/null'}>About us</NavLink>
            </li>
            <li>
              <NavLink to={'/null'}>Contact</NavLink>
            </li>
          </ul>
        </div>
      </section>
      {/* portfolio */}
      <section className="portfolio">
        <strong>
          <a
            href="https://github.com/vitinruas/_retroarcadestore-api"
            target={'_blank'}
          >
            Portfólio - Vitin Ruas
          </a>
        </strong>
      </section>
    </footer>
  )
}

export default Footer
