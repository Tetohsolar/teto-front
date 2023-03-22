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
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Novo Negócio</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
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


