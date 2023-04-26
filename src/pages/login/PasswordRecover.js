import React from 'react'
import './login.scss';
import { useState, useRef } from "react"
// import logoTetoSolar from '../../assets/img/teto-solar-visual-signature.png'
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { toast } from 'react-toastify';

const PasswordRecover = () => {
  const [email, setEmail] = useState('')
  const emailValue = useRef();
  const navigate = useNavigate();


  async function resetPassword(e) {
    e.preventDefault();
    console.log(email)
    await api.patch('/user/reset-password', {

      email: email

    }).then((response) => {
      console.log(response.data)
      toast.success("Password Resetado com Sucesso, Verifique seu e-mail", {
        autoClose: 1000,
      })

      setTimeout(() => {
        navigate("/")
      }, 1000)



    }).catch((response) => {

      toast.error("Erro ao resetar, e-mail não encontrado!", {
        autoClose: 1000,
      })
      setTimeout(() => {
        navigate("/")
      }, 3000)

    })

  }




  return (
    <div className='bg-access'>
      <div className='v100 bg-login d-flex justify-content-md-around  justify-content-start align-items-center flex-md-row flex-column pb-3 pb-md-0'>

        <div className='form-area m-3'>
          <form className='form-width' onSubmit={resetPassword}>
            <h1 className="h3 mb-3 fw-semibold text-center text-primary">Recuperando a Senha</h1>
            <p className='subtitle-form text-center'>Favor informar o e-mail cadastrado no sistema. Enviaremos uma senha temporária.</p>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={emailValue} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu e-mail" />
            </div>

            <div className="col-auto">
              <button className="w-100 btn btn-primary" type="submit">Enviar</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default PasswordRecover