import React from 'react'

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
              <a href="" className="active">
                Página Inicial
              </a>
            </li>
            <li>
              <a href="">Jogos</a>
            </li>
            <li>
              <a href="">Roupas</a>
            </li>
            <li>
              <a href="">Acessórios</a>
            </li>
          </ul>
        </div>
        {/* user nav */}
        <div className="user-nav">
          <ul>
            <li>
              <a href="">Minha Conta</a>
            </li>
            <li>
              <a href="">Carrinho</a>
            </li>
            <li>
              <a href="">Favoritos</a>
            </li>
            <li>
              <a href="">Endereço</a>
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
              <a href="">Termos de Uso</a>
            </li>
            <li>
              <a href="">Sobre</a>
            </li>
            <li>
              <a href="">Contato</a>
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
