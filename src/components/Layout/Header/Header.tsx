import React, { ReactElement } from 'react'

// styles
import './Header.css'
import LogoImage from './assets/images/logo.png'
import { AiFillHeart } from 'react-icons/ai'
import { FaShoppingCart } from 'react-icons/fa'
import { FaSearch } from 'react-icons/fa'

// contexts
import { useModalContext } from '../../../contexts/modal-context'

// components
import SignUpModal from '../../Modals/SignupModal/SignUpModal'
import LoginModal from '../../Modals/LoginModal/LoginModal'

// interfaces

interface IProps {}

const Header = ({}: IProps) => {
  const { dispatch } = useModalContext()
  const handleOpenModal = (reactComponent: ReactElement) => {
    return dispatch({
      type: 'OPEN',
      reactComponent,
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
          <li className="nav-button active">Página Principal</li>
          <li className="nav-button">Jogos</li>
          <li className="nav-button">Roupas</li>
          <li className="nav-button">Acessórios</li>
        </ul>
      </nav>
      {/* ad */}
      <section className="ad"></section>
    </header>
  )
}

export default Header
