import './navbar.scss'
import logo from './teto-solar.svg'
import { useContext, useEffect, useState } from 'react';
import { SidebarWrapperContext } from '../../context/SidebarWrapperContext';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api';

const Navbar = () => {
  const { dispatch } = useContext(SidebarWrapperContext)
  const { signOut } = useContext(AuthContext)
  const [administrator, setAdministrator] = useState([])
  const { token, idLogged } = useContext(AuthContext)

  useEffect(() => {
   

    return () => { }
  })

  function handleSignOut() {
    signOut()
  }

  return (
    <div className="bg-white">
      <header className="sticky-top">
        <nav className="navbar navbar-expand-lg border-bottom">
          <div className="container-fluid navbar-height">
            <div className='d-flex align-items-center gap-2'>
              <div onClick={() => dispatch({ type: "WRAPPED" })} id='menu-toggle' className='p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
              </div>
              <a className="navbar-brand d-flex" href="https://beta.reactjs.org/">
                <img src={logo} alt="Bootstrap" width="auto" height="16" />
              </a>
            </div>
            <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
              </svg>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href='https://getbootstrap.com/' role="button" data-bs-toggle="dropdown" aria-expanded="false">{administrator.map((row) => { return (<span key={row.id}>{row.firstName}</span>) })}</a>
                  <ul className="dropdown-menu dropdown-menu-end shadow border border-0">
                    <li><a className="dropdown-item" href="https://beta.reactjs.org/">Novo negócio</a></li>
                    <li><a className="dropdown-item" href="https://beta.reactjs.org/">Conta</a></li>
                    <li><a className="dropdown-item" href="https://beta.reactjs.org/">Configurações</a></li>
                    <li><button className="dropdown-item" onClick={handleSignOut}>Sair</button></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;