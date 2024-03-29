import React, { ReactElement, useContext } from 'react'
import { NavLink } from 'react-router-dom'

// styles
import './Header.css'
import { AiFillHeart } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'
import { RiUser3Fill } from 'react-icons/ri'
import { IoBagHandleSharp } from 'react-icons/io5'

// hooks
import { useLogout } from '../../../hooks/account/authentication/useLogout'

// contexts
import { useModalContext } from '../../../contexts/modal-context'
import { useAuthContext } from '../../../contexts/auth-context'

// components
import SignUpModal from '../../Modals/Account/Authentication/SignupModal/SignUpModal'
import LoginModal from '../../Modals/Account/Authentication/LoginModal/LoginModal'
import CartModal from '../../Modals/CartModal/CartModal'
import SearchModal from '../../Modals/SearchModal/SearchModal'

// interfaces
interface IProps {}

const Header = ({}: IProps) => {
  const { authState } = useAuthContext()
  const { modalDispatch } = useModalContext()
  const { logout } = useLogout()

  const handleOpenModal = (reactComponent: ReactElement) => {
    return modalDispatch({
      type: 'OPEN',
      reactComponent,
    })
  }

  const handleLogout = async () => {
    await logout()
  }

  return (
    <header className="header">
      {/* mini nav */}
      <nav className="mini-nav">
        <ul>
          <div className="left">
            <li>
              <a href="https://github.com/vitinruas" target={'_blank'}>
                Git Hub - Vitin Ruas
              </a>
            </li>
          </div>
          <div className="center carrossel-container">
            <li className="carrossel-effect">
              <a>
                {' '}
                Welcome to Retro Arcade Store -&gt; Stay out of the House 10%
                off
              </a>
            </li>
          </div>
          <div className="right">
            <li>
              <a href="">Terms and conditions</a>
            </li>
            <li>
              <a href="">About us</a>
            </li>
            <li>
              <a href="">Contact</a>
            </li>
          </div>
        </ul>
      </nav>
      {/* user nav */}
      <nav className="user-nav">
        <ul>
          <div className="left">
            <li className="search">
              <FaSearch
                className="icons"
                onClick={() => handleOpenModal(<SearchModal />)}
              />
            </li>
          </div>
          <div className="center">
            <NavLink to={'/'} className="logo">
              <img
                className="paradise paradise-effect"
                src="/assets/images/paradise.png"
                alt=""
              />
              <img
                className="retroarcadestore"
                src="/assets/images/logo.png"
                alt=""
              />
            </NavLink>
          </div>
          <div className="right">
            {authState.isLogged ? (
              <div className="user">
                <li>
                  <NavLink to={'/account'} className="link-account">
                    <RiUser3Fill className="icons" />
                    <span>Account</span>
                  </NavLink>
                </li>
                <li className="link-account" onClick={handleLogout}>
                  Logout
                </li>
              </div>
            ) : (
              <div className="authentication">
                <li
                  className="login"
                  onClick={() => handleOpenModal(<LoginModal />)}
                >
                  Login
                </li>
                <li
                  className="signup"
                  onClick={() => handleOpenModal(<SignUpModal />)}
                >
                  SignUp
                </li>
              </div>
            )}

            <li className="favorites">
              <AiFillHeart className="icons" />
            </li>
            <li className="cart">
              <IoBagHandleSharp
                className="icons"
                onClick={() => handleOpenModal(<CartModal />)}
              />
            </li>
          </div>
        </ul>
      </nav>
      {/* app nav */}
      <nav className="app-nav">
        <ul>
          <li>
            <NavLink to={'/'} className="nav-button">
              The Retro Arcade
            </NavLink>
          </li>
          <li>
            <NavLink to={'/games'} className="nav-button">
              Games
            </NavLink>
          </li>
          <li>
            <NavLink to={'/clothes'} className="nav-button">
              Clothes
            </NavLink>
          </li>
          <li>
            <NavLink to={'/accessories'} className="nav-button">
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* ad */}
    </header>
  )
}

export default Header
