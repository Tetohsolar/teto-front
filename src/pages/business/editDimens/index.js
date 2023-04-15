import React, { useEffect } from 'react'
import { SidebarWrapperContext } from '../../../context/SidebarWrapperContext'
import { useContext } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { useLocation } from 'react-router-dom'

const EditDimensionamento = () => {

  const { sidebarWrapper } = useContext(SidebarWrapperContext);
  const pageTitle = "Atualização do Dimensionamento do Projeto";

  const location = useLocation()
  console.log(location)
  let data = location.state.data


  return (
    <div>
      <Navbar />
      <div className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}>
        <Sidebar activeButtonProfile="active" />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <h5 className="pb-3">{pageTitle}</h5>


          <div className='p-3 bg-white border rounded-1'>
            <div className="row g-3 " >
              <div className="col-md-4">
                <label htmlFor="inputFirstName" className="form-label">
                  Nome:
                </label>
                <input type="text" className="form-control" id="inputFirstName" value={data.cliente} />
              </div>
              <div className="col-md-2 ">
                <label htmlFor="inputFirstName" className="form-label">
                  Usuário:
                </label>
                <input type="text" className="form-control" id="inputFirstName" value={data.usuario} />
              </div>

              <div className="col-md-2">
                <label htmlFor="inputFirstName" className="form-label">
                  Tipo de Telhado:
                </label>
                <input type="text" className="form-control" id="inputFirstName" value={data.tipoTelhado} />
              </div>
            </div>
            <div className="row g-3 p2" >


              <div className="col-md-2">
                <label htmlFor="inputFirstName" className="form-label">
                  Tipo de Ligação:
                </label>
                <input type="text" className="form-control" id="inputFirstName" value={data.tipoLigacao} />
              </div>
              <div className="col-md-2">
                <label htmlFor="inputFirstName" className="form-label">
                  Fator Solar:
                </label>
                <input type="text" className="form-control" id="inputFirstName" value={data.fatorSolar} />
              </div>
            </div>
            <div className="row g-3 p2" >
              <div className="col-md-2">
                <label htmlFor="inputFirstName" className="form-label">
                  Grupo:
                </label>
                <input type="text" className="form-control" id="inputFirstName" value={data.grupo} />
              </div>
              <div className="col-md-2">
                <label htmlFor="inputFirstName" className="form-label">
                  Sub-Grupo:
                </label>
                <input type="text" className="form-control" id="inputFirstName" value={data.subgrupo} />
              </div>



            </div>
            <div className="row g-3 p2" >
              <div className="col-md-2">
                <label htmlFor="inputFirstName" className="form-label">
                  Demanda FP:
                </label>
                <input type="text" className="form-control" id="inputFirstName" value={data.demandaFp} />
              </div>
              <div className="col-md-2">
                <label htmlFor="inputFirstName" className="form-label">
                  Demanda Ponta:
                </label>
                <input type="text" className="form-control" id="inputFirstName" value={data.demandaP} />
              </div>
            </div>
            <div className="row g-3 p2" >
              <div className="col-md-2">
                <label htmlFor="inputFirstName" className="form-label">
                  Energia FP:
                </label>
                <input type="text" className="form-control" id="inputFirstName" value={data.demandaFp} />
              </div>
              <div className="col-md-2">
                <label htmlFor="inputFirstName" className="form-label">
                  Energia Ponta:
                </label>
                <input type="text" className="form-control" id="inputFirstName" value={data.demandaFp} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default EditDimensionamento