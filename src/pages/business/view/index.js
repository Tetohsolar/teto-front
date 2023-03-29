import './home.scss';
import { useContext } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../../context/SidebarWrapperContext';
import Widget from '../../../components/Widgets';
import { useEffect } from 'react';
import api from '../../../api';
import { AuthContext } from '../../../context/AuthContext';
import { useState } from 'react';
import { BsFillPencilFill } from "react-icons/bs";

const ViewBusiness = () => {
  const [name, setName] = useState('')
  const [logradouro, setLogradouro] = useState('')
  const [status, setStatus] = useState('')
  const [donoN, setDonoN] = useState('')
  const [numberP, setNumberP] = useState('')
  const { token } = useContext(AuthContext)
  const { sidebarWrapper } = useContext(SidebarWrapperContext);

  useEffect(() => {

    const bId = 2

    if (bId) {
      loadbId(bId)
    }

    return () => { }

  }, [])


  
  async function loadbId(id) {


    await api.get('/business/get/' + id, {
      headers: {
        'Authorization': `Basic ${token}`
      }

    }).then((response) => {
      setName(response.data["Client.fantasy"])
      console.log(response.data)
      setStatus(response.data.situation)
      setNumberP(response.data.number)

    }).catch((error) => { console.log(error) })

  }

  return (
    <div className="home ">
      <Navbar />
      <div
        className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}
      >
        <Sidebar activeButtonHome="active" />
        <div className='container '>
          <div className="container-fluid bg-home primeiraDivHome">
            <div class="p-3 mb-3 bg-white border rounded-3 container " >
              <h5 className="pb-3">Resumo</h5>

              <div className="row topResume">
                <div className="col-lg-4 card-mateus rounded-3">
                  <h6 class="card-content-title mb-3 fw-semibold">Status </h6>

                  <span className="badge rounded-pill text-bg-lightblue text-primary">{status}</span>
                </div>
                <div className="col-lg-4 card-mateus rounded-3">
                  <h6 class="card-content-title mb-3 fw-semibold"> Contato </h6>

                  <label>{name} </label>
                </div>
                <div className="col-lg-4 card-mateus rounded-3">
                  <h6 class="card-content-title mb-3 fw-semibold">Dono do negócio </h6>


                  <label> {donoN} </label>
                </div>
                <div className="col-lg-4 card-mateus rounded-3">
                  <h6 class="card-content-title mb-3 fw-semibold">Número da proposta </h6>

                  <label> {numberP}</label>

                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid bg-home  ">
            <div class="p-3 mb-3 bg-white border rounded-3 table-container  " >
              <h5 className="pb-3">Detalhes do negócio</h5>
              <div>
                
              </div>
              <br></br>

              <div className='conteinerCards'>
                
                <div className='cards border rounded-3'>
                <div className='card-title'>
                      <h6 class="card-content-title mb-3 fw-semibold">Informações básicas</h6>
                      <button type="button" className="btn btn-light btn-sm text-primary d-flex align-items-center" onClick={() => {

                      }}>
                        <BsFillPencilFill />
                      </button>
                </div>

                  <table>
                    <tr className='linhabaixo tamanho-tr'>
                      Criado/Modificado em
                      <td>
                      </td>
                      <td >
                        28/03/2023
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Nome
                      <td>
                      </td>
                      <td>
                        Raiane Darla MOreira
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Tipo de pessoa
                      <td>
                      </td>
                      <td>
                        PF
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      CPF/CNPJ
                      <td>
                      </td>
                      <td>
                        06592038390
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Telefone
                      <td>
                      </td>
                      <td>
                        88 999815173
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      WhatsApp
                      <td>
                      </td>
                      <td>
                        88 999815173
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      WhatsApp
                      <td>
                      </td>
                      <td>
                        88 999815173
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Informações adicionais


                      <td>
                      </td>
                      <td>

                      </td>

                    </tr>


                  </table>


                </div>

                <div className='cards border rounded-3'>
                <div className='card-title'>
                      <h6 class="card-content-title mb-3 fw-semibold">Endereço</h6>
                      <button type="button" className="btn btn-light btn-sm text-primary d-flex align-items-center" onClick={() => {

                      }}>
                        <BsFillPencilFill />
                      </button>
                </div>
                  <table>
                    <tr className='linhabaixo tamanho-tr'>
                      Rua
                      <td>
                      </td>
                      <td>
                        {logradouro}
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Bairro
                      <td>
                      </td>
                      <td>
                        Renato Parente
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Rua
                      <td>
                      </td>
                      <td>
                        Tenente coronel ezio
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      CEP
                      <td>
                      </td>
                      <td>
                        62.033-150
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Estado
                      <td>
                      </td>
                      <td>
                        Ceará
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Cidade
                      <td>
                      </td>
                      <td>
                        Sobral
                      </td>
                    </tr>
                  </table>


                </div>

              </div>
            </div>
            
             
            
          </div>
           <div className="container-fluid bg-home py-4 ">
                <div class="p-3 mb-3 bg-white border rounded-3 table-container" >

                  <h5 className="pb-3">Dimensionamento</h5>

                  <div className='tabela'>
                    <h6 class="card-content-title mb-3 fw-semibold">Informações da geradora</h6>
                  </div>
                </div>
              </div>
        </div>
      </div>

    </div>
  );
};


export default ViewBusiness;
