import React, { ReactElement, useContext } from 'react'
import { NavLink } from 'react-router-dom'

// styles
import './Header.css'
import LogoImage from './assets/images/logo.png'
import { AiFillHeart } from 'react-icons/ai'
import { FaShoppingCart } from 'react-icons/fa'
import { FaSearch } from 'react-icons/fa'

// contexts
import { useModalContext } from '../../../contexts/modal-context'
import { useAuthContext } from '../../../contexts/auth-context'

// components
import SignUpModal from '../../Modals/SignupModal/SignUpModal'
import LoginModal from '../../Modals/LoginModal/LoginModal'

// interfaces
interface IProps {}

const Header = ({}: IProps) => {
  const { authState, authDispatch } = useAuthContext()
  const { dispatch: modalDispatch } = useModalContext()
  const handleOpenModal = (reactComponent: ReactElement) => {
    return modalDispatch({
      type: 'OPEN',
      reactComponent,
    })
  }

  const handleLogout = () => {
    authDispatch({
      type: 'LOGOUT',
    })
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
          <div className="center">
            <li>
              <a href="">
                {' '}
                Bem-vindo(a) ao Retro Arcade Store -&gt; Stay out of the House
                10% off
              </a>
            </li>
          </div>
          <div className="right">
            <li>
              <a href="">Termos de Uso</a>
            </li>
            <li>
              <a href="">Sobre</a>
            </li>
            <li>
              <a href="">Contato</a>
            </li>
          </div>
        </ul>
      </nav>
      {/* user nav */}
      <nav className="user-nav">
        <ul>
          <div className="left">
            <li className="search">
              <FaSearch className="icons" />
            </li>
          </div>
          <div className="center">
            <li className="logo">
              <img src={LogoImage} alt="" />
            </li>
          </div>
          <div className="right">
            {authState.isLogged ? (
              <div className="user">
                <li className="account">Account</li>
                <li className="account" onClick={handleLogout}>
                  Logout
                </li>
              </div>
            ) : (
              <div className="authentication">
                <li
                  className="login"
                  onClick={() => handleOpenModal(<LoginModal />)}
                >
                  Entrar
                </li>
                <li
                  className="signup"
                  onClick={() => handleOpenModal(<SignUpModal />)}
                >
                  Cadastrar
                </li>
              </div>
            )}

            <li className="favorites">
              <AiFillHeart className="icons" />
            </li>
            <li className="cart">
              <FaShoppingCart className="icons" />
            </li>
          </div>
        </ul>
      </nav>
      {/* app nav */}
      <nav className="app-nav">
        <ul>
          <NavLink to={'/'} className="nav-button">
            Página Principal
          </NavLink>
          <NavLink to={'/games'} className="nav-button">
            Jogos
          </NavLink>
          <NavLink to={'/clothes'} className="nav-button">
            Roupas
          </NavLink>
          <NavLink to={'/accessories'} className="nav-button">
            Acessórios
          </NavLink>
        </ul>
      </nav>
      {/* ad */}
      <section className="ad"></section>
    </header>
  )
}

export default Header
