import { AuthContext } from '../../context/AuthContext';
import './login.scss';
import { useState, useContext, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import logoTetoSolar from '../../assets/img/teto-solar-visual-signature.png'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn, signOut } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    signOut()
  }, [])

  async function handleLogin(e) {
    e.preventDefault();

    if (email !== '' && password !== '') {
      signIn(email, password)
        .then(() => {
          navigate("/")
        })
    }
  }

  return (
    <div className='bg-access'>
      <div className='v100 bg-login d-flex justify-content-md-around  justify-content-start align-items-center flex-md-row flex-column pb-3 pb-md-0'>
        <div className='m-4 pt-3 pt-md-0'>
          <img className='logo-teto-solar' src={logoTetoSolar} alt='Logo da teto Solar'></img>
        </div>
        <div className='form-area m-3'>
          <form className='form-width' onSubmit={handleLogin}>
            <h1 className="h3 mb-3 fw-semibold text-center text-primary">Acesse sua conta</h1>
            <p className='subtitle-form text-center'>Realize login para acompanhar o processo de seus projetos cadastrados.</p>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu e-mail" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Sua senha</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="col-auto mb-3">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="autoSizingCheck" />
                <label className="form-check-label" htmlFor="autoSizingCheck">
                  Lembrar
                </label>
              </div>
            </div>
            <div className="col-auto">
              <button className="w-100 btn btn-primary" type="submit">Entrar</button>
            </div>
            <div className="m-3">
              <p className="mb-2 text-center"><a href="http://54.84.76.212:3000/">Recuperar senha</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
