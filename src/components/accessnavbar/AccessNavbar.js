import './accessnavbar.scss'
import logo from './teto-solar.svg'

const AccessNavbar = () => {
  return (
    <div className="bg-white">
      <header className="sticky-top">
        <nav className="navbar navbar-expand-lg border-bottom">
          <div className="container-fluid">
            <div className='d-flex align-items-center gap-2'>
              <a className="navbar-brand d-flex" href="https://beta.reactjs.org/">
                <img src={logo} alt="Bootstrap" width="auto" height="16" />
              </a>
            </div>
            <button className="btn btn-primary text-light" type="submit">
              Acessar
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default AccessNavbar;