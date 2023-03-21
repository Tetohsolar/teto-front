import { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import './signup.scss';
import logoTetoSolar from '../../assets/img/teto-solar-visual-signature.png'

const Signup = () => {
  const { signUp } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [password, setPassword] = useState('')
  const [tipo, setTipo] = useState('')

  function validaCampos(name, email, phone, password, confirmPassword, tipo) {
    if (name !== '' && email !== '' && phone !== '') {
      return true
    }
    if (password === confirmPassword && tipo !== '') {
      return true
    }
    else {
      return false
    }
  }

  function limpaCampos() {
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setTipo('')
    setPhone('')
  }

  async function handleSaveUser(e) {
    e.preventDefault();
    if (validaCampos) {
      signUp(name, phone, email, password, confirmPassword, tipo)
      limpaCampos()
    }
  }

  return (
    <div>
      <div className=' v100 bg-login d-flex justify-content-md-around  justify-content-start align-items-center flex-md-row flex-column pb-4 pb-md-0'>
        <div className='m-4 pt-4 pt-md-0'>
          <img className='logo-teto-solar' src={logoTetoSolar} alt='Logo da teto Solar'></img>
        </div>
        <div className='form-area m-4'>
          <form className='form-width' onSubmit={handleSaveUser}>
            <h1 className="h3 mb-3 fw-semibold text-center text-primary">Crie sua conta</h1>
            <p className='subtitle-form text-center'>Crie uma conta para acompanhar o processo de seus projetos.</p>
            <div className="mb-3">
              <label htmlFor="inputFirstName" className="form-label">
                Nome
              </label>
              <input placeholder='Seu nome' type="text" className="form-control" id="inputFirstName" value={name || ''} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">
                Email
              </label>
              <input placeholder='Seu email' type="email" className="form-control" id="inputEmail" value={email || ''} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='row'>
              <div className="mb-3 col-md-6">
                <label htmlFor="inputPassword4" className="form-label">
                  Senha
                </label>
                <input placeholder='Sua senha' type="password" className="form-control" id="inputPassword1" value={password || ''} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="mb-3 col-md-6">
                <label htmlFor="inputPassword4" className="form-label">
                  Confirmar senha
                </label>
                <input placeholder='Confirmar senha' type="password" className="form-control" id="inputPassword2" value={confirmPassword || ''} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
            </div>
            <div className="col-auto mb-3">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="autoSizingCheck" />
                <label className="form-check-label" for="autoSizingCheck">
                  Lembrar
                </label>
              </div>
            </div>
            <div className="col-auto">
              <button className="w-100 btn btn-primary" type="submit">Criar conta</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
