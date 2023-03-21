import { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import './signup.scss';

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
    <body className="login">
      <main className="form-signin w-100 h-100">
        <div className="bg-form">
          <form className="form-access m-auto" onSubmit={handleSaveUser}>
            <h1 className="h3 mb-3 fw-normal text-center text-light">Crie sua conta</h1>
            <div className="mb-3">
              <label htmlFor="inputFirstName" className="form-label">
                Nome
              </label>
              <input type="text" className="form-control" id="inputFirstName" value={name || ''} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" id="inputEmail" value={email || ''} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword4" className="form-label">
                Senha
              </label>
              <input type="password" className="form-control" id="inputPassword1" value={password || ''} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword4" className="form-label">
                Confirmar senha
              </label>
              <input type="password" className="form-control" id="inputPassword2" value={confirmPassword || ''} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword4" className="form-label">
                Fone:
              </label>
              <input type="password" className="form-control" id="inputPassword2" value={confirmPassword || ''} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <button className="w-100 btn btn-primary" type="submit">Criar conta</button>
            <p className="m-5 text-center text-secondary">&copy; 2023 Teto Solar</p>
          </form>
        </div>
      </main>
    </body>
  );
};

export default Signup;
