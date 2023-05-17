import { useContext, useState } from "react";


import { ToastContainer, toast } from 'react-toastify'
import api from "../../api";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useNavigate} from 'react-router-dom';
import { TextField } from "@mui/material";


const EditBrand = (prop) => {

  const [descricao, setDescricao] = useState('')
  
  const navigate = useNavigate();
  const { token } = useContext(AuthContext)
  async function salvar (e) {
    const data = {
      
   name: descricao, enabled:'S'
    };

    if (descricao===""){
      toast.error('a descrição é obrigatória') 
      
      return
    }
    await api.post('/brands/create' , data
      , {
        headers: {
          'Authorization': `Basic ${token}`
        }

      }).then((response) => {
        console.log(response.data)
        setDescricao("")
        prop.reloadBrands()
       // navigate(-1)
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
        <div className="modal fade" id="modalBrand" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="staticBackdropLabel"
          data-bs-keyboard="false"  aria-hidden="true" >
          <div className="modal-dialog modal-lg w-100" >
            <div className="modal-content">
              <div className="modal-header">
                <div className="d-flex flex-column">
                  <h1 className="modal-title fs-3" id="exampleModalLabel">Nova Marca </h1>
                  
                </div>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                <div className="container-fluid">
                  <div className="row d-flex flex-row align-items-end ">
                    <div className="col-md-10 ">
                      <label htmlFor="inputCodigo" className="form-label">
                        Nome:
                      </label>
                      <div className="col-md-10">
                      <TextField id="inputCodigo*" maxLength={50} className="form-control" label="Descrição*" variant="outlined" value={descricao || ''} onChange={(e) => setDescricao(e.target.value)} />
                       </div>
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

export default EditBrand;
