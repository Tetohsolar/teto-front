import AccessNavbar from '../../components/accessnavbar/AccessNavbar';
import { AuthContext } from '../../context/AuthContext';
import './login.scss';
import { useState, useContext } from "react"
import { Link, useHistory } from 'react-router-dom'



const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory();
  const { signIn } = useContext(AuthContext)


  async function handleLogin(e) {
    e.preventDefault();
    if (email !== '' && password !== '') {

      signIn(email, password)
        .then(() => {
          history.push('/')
        })

    }
  }

  return (
    <body className="login">
      <AccessNavbar />
      <main className="form-signin w-100 h-100">
        <div className="bg-form">
          <form className="form-access m-auto" onSubmit={handleLogin} >
            <h1 className="h3 mb-3 fw-normal text-center text-light">Acesse sua conta</h1>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label text-light">Email</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu e-mail" />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label text-light">Sua senha</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="w-100 btn btn-primary" type="submit">Entrar</button>
            <div className="m-3">
              <p className="mb-2 text-center text-light">Não tem uma conta? <a href="google.com">Cadastre-se</a></p>
              <p className="mb-2 text-center text-light">Esqueceu sua senha? <a href="google.com">Recuperar senha</a></p>
            </div>
            <p className="m-5 text-center text-secondary">&copy; 2023 Teto Solar</p>
          </form>
        </div>
      </main>
    </body>

  );

};

export default Login;
