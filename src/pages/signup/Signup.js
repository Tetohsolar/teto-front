import AccessNavbar from '../../components/accessnavbar/AccessNavbar';
// import { useState, useContext } from 'react'
// import { AuthContext } from '../../context/AuthContext';
import './signup.scss';

const Signup = () => {




  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [phone, setPhone] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')
  // const [password, setPassword] = useState('')
  // const { signUp, loadingAuth, ToastContainer, token } = useContext(AuthContext)



  return (
    <body className="login">
      <AccessNavbar />
      <main className="form-signin w-100 h-100">
        <div className="bg-form">
          <form className="form-access m-auto">
            <h1 className="h3 mb-3 fw-normal text-center text-light">Crie sua conta</h1>
            <div className="mb-3">
              <label for="exampleInputName" className="form-label text-light">Nome</label>
              <input type="text" className="form-control" id="exampleInputName" aria-describedby="inputName" placeholder="Digite seu nome" />
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label text-light">Email</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Digite seu e-mail" />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label text-light">Sua senha</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Digite sua senha" />
            </div>
            <button className="w-100 btn btn-primary" type="submit">Criar conta</button>
            <div className="m-3">
              <p className="mb-2 text-center text-light">Não tem uma conta? <a href="google.com">Cadastre-se</a></p>
            </div>
            <p className="m-5 text-center text-secondary">&copy; 2023 Teto Solar</p>
          </form>
        </div>
      </main>
    </body>

  );
};

export default Signup;
