import './navbar.scss'
import logo from './teto-solar.svg'
import avatar from './default-avatar.png'
import { useContext } from 'react';
import { SidebarWrapperContext } from '../../context/SidebarWrapperContext';

const Navbar = () => {
  const {dispatch} = useContext(SidebarWrapperContext)

  return (
    <div className="bg-white">
      <header className="sticky-top">
        <nav className="navbar navbar-expand-lg border-bottom">
          <div className="container-fluid">
            <div className='d-flex align-items-center gap-2'>
              <div onClick={() => dispatch({type:"WRAPPED"})} id='menu-toggle' className='p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
              </div>
              <a className="navbar-brand d-flex" href="https://getbootstrap.com/">
                <img src={logo} alt="Bootstrap" width="auto" height="16" />
              </a>
            </div>
            <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
              </svg>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="https://getbootstrap.com/" role="button" data-bs-toggle="dropdown" aria-expanded="false"><img className='header-avatar' src={avatar} alt="Bootstrap" /></a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><a className="dropdown-item fw-bold" href="https://getbootstrap.com/">{'Ana Silva'}</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li className='dropdown-item d-flex align-items-center justify-content-between'>Dark mode
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
                      </div>
                    </li>
                    <li><a className="dropdown-item" href="https://getbootstrap.com/">Novo projeto</a></li>
                    <li><a className="dropdown-item" href="https://getbootstrap.com/">Perfil</a></li>
                    <li><a className="dropdown-item" href="https://getbootstrap.com/">Aparência</a></li>
                    <li><a className="dropdown-item" href="https://getbootstrap.com/">Configurações</a></li>
                    <li><a className="dropdown-item" href="https://getbootstrap.com/">Sair</a></li>
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