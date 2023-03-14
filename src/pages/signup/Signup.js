import AccessNavbar from '../../components/accessnavbar/AccessNavbar';
import { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import './signup.scss';
import InputMask from 'react-input-mask';

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
      <AccessNavbar />
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

          {/* <form className="row g-3" onSubmit={handleSaveUser}>
            <div className="col-md-7">
              <label htmlFor="inputFirstName" className="form-label">
                Nome
              </label>
              <input type="text" className="form-control" id="inputFirstName" value={name || ''} onChange={(e) => setName(e.target.value)} />
            </div>


            <div className="col-md-5">
              <label htmlFor="inputEmail" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" id="inputEmail" value={email || ''} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label htmlFor="inputPassword4" className="form-label">
                Senha
              </label>
              <input type="password" className="form-control" id="inputPassword1" value={password || ''} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label htmlFor="inputPassword4" className="form-label">
                Confirmar senha
              </label>
              <input type="password" className="form-control" id="inputPassword2" value={confirmPassword || ''} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label htmlFor="inputUserType" className="form-label">
                Tipo de usuário
              </label>
              <select name="pets" id="input-user-type" className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="">Selecionar...</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>

              </select>
            </div>


            <div className="col-4">
              <label htmlFor="inputPhoneNumber" className="form-label">
                Telefone
              </label>

              <InputMask
                className="form-control" id="inputPhoneNumber"
                onChange={(e) => setPhone(e.target.value)}
                mask='(99)9999-9999'
                value={phone || ''}>
              </InputMask>
            </div>

            <div className="d-grid gap-2 d-md-block col-12">
              <button className="btn btn-primary text-light" type="submit" >
                Salvar
              </button>
            </div>
          </form> */}
        </div>
      </main>
    </body>

  );
};

export default Signup;
