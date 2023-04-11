import React from 'react'
import './login.scss';
import { useState, useContext, useEffect } from "react"
import logoTetoSolar from '../../assets/img/teto-solar-visual-signature.png'
import { Link } from 'react-router-dom';

const PasswordRecover = () => {
  const [email, setEmail] = useState('')

  return (
    <div className='bg-access'>
      <div className='v100 bg-login d-flex justify-content-md-around  justify-content-start align-items-center flex-md-row flex-column pb-3 pb-md-0'>

        <div className='form-area m-3'>
          <form className='form-width' >
            <h1 className="h3 mb-3 fw-semibold text-center text-primary">Recuperando a Senha</h1>
            <p className='subtitle-form text-center'>Favor informar o e-mail cadastrado no sistema. Enviaremos uma senha temporária.</p>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu e-mail" />
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