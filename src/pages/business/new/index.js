import React from 'react'

// const negocio = () => {
//   return (
//     <div>index</div>
//   )
// }

// export default negocio


// import { AuthContext } from '../../../context/AuthContext';
// import { useContext } from 'react'


export default function NewBusiness(prop) {

  // const { deleteUser } = useContext(AuthContext)

  return (


    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-xl" >
        <div className="modal-content">
          <div className="modal-header">
            <div className="d-flex flex-column">
              <h1 className="modal-title fs-3" id="exampleModalLabel">Nova Proposta de  Negócio </h1>
              <h5 className='fs-5'>Informações básicas</h5>
            </div>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm">
                  <label htmlFor="inputCodigo" className="form-label">
                    Nome:
                  </label>
                  <input type="text" className="form-control" id="inputCodigo" />
                </div>
                <div className="col-sm">
                  <label htmlFor="inputCodigo" className="form-label">
                    Tipo de Pessoa:
                  </label>
                  <input type="text" className="form-control" id="inputCodigo" />
                </div>
                <div className="col-sm">
                  <label htmlFor="inputCodigo" className="form-label">
                    CPF/CNPJ:
                  </label>
                  <input type="text" className="form-control" id="inputCodigo" />
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <label htmlFor="inputCodigo" className="form-label">
                    Telefone:
                  </label>
                  <input type="text" className="form-control" id="inputCodigo" />
                </div>
                <div className="col-sm">
                  <label htmlFor="inputCodigo" className="form-label">
                    WhatsApp:
                  </label>
                  <input type="text" className="form-control" id="inputCodigo" />
                </div>
                <div className="col-sm">
                  <label htmlFor="inputCodigo" className="form-label">
                    E-mail:
                  </label>
                  <input type="text" className="form-control" id="inputCodigo" />
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <label htmlFor="inputCodigo" className="form-label">
                    Informações Adicionais:
                  </label>
                  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                  {/* <input type="text" maxLength={200} className="form-control" id="inputCodigo" /> */}
                </div>


              </div>
            </div>

          </div>
          <div className="modal-footer">
          </div>
        </div>
      </div>
    </div>

  )
}


