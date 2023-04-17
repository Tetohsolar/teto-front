import { useContext, useState } from "react";


import { ToastContainer, toast } from 'react-toastify'
import api from "../../api";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useNavigate} from 'react-router-dom';


const EditSituationBusiness = (prop) => {

  const [tipoPessoa, setTipoPessoa] = useState('')
  
  const navigate = useNavigate();
  const { token } = useContext(AuthContext)


  

  

 
  async function salvar (e) {
    const data = {
      
   situation: prop.situation
    };

    await api.patch('/business/update/' + prop.businessId, data
      , {
        headers: {
          'Authorization': `Basic ${token}`
        }

      }).then((response) => {
        console.log(response.data)

      
        navigate("/business/view/" +prop.businessId)
      }).catch(
        (response) => {
        console.log(response.response.data.message)
          toast.error(response.response.data.message)
          throw new Error()
        }
      )
  
  }

  return (
    <>
      
        <ToastContainer />
        <div className="modal fade" id="modalTypeSituation" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="staticBackdropLabel"
          data-bs-keyboard="false"  aria-hidden="true" >
          <div className="modal-dialog modal-lg w-100" >
            <div className="modal-content">
              <div className="modal-header">
                <div className="d-flex flex-column">
                  <h1 className="modal-title fs-3" id="exampleModalLabel">Proposta de Negócio </h1>
                  <h5 className='fs-5'>Alterar situação</h5>
                </div>
                
              </div>
              <div className="modal-body">

                <div className="container-fluid">
                  <div className="row d-flex flex-row align-items-end ">
                    <div className="col-md-3 ">
                      <label htmlFor="inputCodigo" className="form-label">
                        Situação:
                      </label>
                      <select name="pets" id="input-user-type" className="form-select"  value={prop.situation} onChange={(e) => prop.setStatus(e.target.value)}>
                        <option value="Aberta" defaultChecked>Aberta </option> 
                        <option value="Ganhos">Ganho</option>
                        <option value="Perdas">Perdido</option>

                      </select>

                    </div>
                   
                    
                  </div>
                  
                </div>

              </div>
              <div className="modal-footer">
              <button type="button" class="btn btn-primary"  data-bs-dismiss="modal"  onClick={()=>{
                salvar()
              }}>Salvar</button> 
              </div>

            </div>

          </div>

        </div>
     
      

    </ >
  )
};

export default EditSituationBusiness;
