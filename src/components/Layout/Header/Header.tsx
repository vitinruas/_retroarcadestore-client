import React, { ReactElement, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { useLogout } from '../../../hooks/user/authentication/useLogout'

// styles
import './Header.css'
import LogoImage from './assets/images/logo.png'
import ParadiseImage from './assets/images/paradise.png'
import { AiFillHeart } from 'react-icons/ai'
import { FaShoppingCart } from 'react-icons/fa'
import { FaSearch } from 'react-icons/fa'

// contexts
import { useModalContext } from '../../../contexts/modal-context'
import { useAuthContext } from '../../../contexts/auth-context'

// components
import SignUpModal from '../../Modals/SignupModal/SignUpModal'
import LoginModal from '../../Modals/LoginModal/LoginModal'
import { RiUser3Fill } from 'react-icons/ri'

// interfaces
interface IProps {}

const Header = ({}: IProps) => {
  const { authState } = useAuthContext()
  const { dispatch: modalDispatch } = useModalContext()
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
            <NavLink to={'/'} className="logo">
              <img
                className="paradise paradise-effect"
                src={ParadiseImage}
                alt=""
              />
              <img className="retroarcadestore" src={LogoImage} alt="" />
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
          <li>
            <NavLink to={'/'} className="nav-button">
              Página Principal
            </NavLink>
          </li>
          <li>
            <NavLink to={'/games'} className="nav-button">
              Jogos
            </NavLink>
          </li>
          <li>
            <NavLink to={'/clothes'} className="nav-button">
              Roupas
            </NavLink>
          </li>
          <li>
            <NavLink to={'/accessories'} className="nav-button">
              Acessórios
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* ad */}
    </header>
  )
}

export default Header
