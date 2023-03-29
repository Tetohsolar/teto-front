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
import { format } from 'date-fns';

const ViewBusiness = () => {
  const [name, setName] = useState('')
  const [logradouro, setLogradouro] = useState('')
  const [status, setStatus] = useState('')
  const [donoN, setDonoN] = useState('')
  const [numberP, setNumberP] = useState('')
  const { token } = useContext(AuthContext)
  const { sidebarWrapper } = useContext(SidebarWrapperContext);
  const [modificadoD, setModificadoD] = useState('')
  const[tipoPessoa, setTipoPessoa] = useState('')
  const[documento,setDocumento] = useState('')
  const[telefone,setTelefone] = useState('')
  const[zap,setZap] = useState ('')
  const[email, setEmail] = useState ('')
  const[infAdc, setInfAdc] = useState('')
  const[fatorS, setFatorS] = useState ('')
  const[telhado,setTelhado] = useState('')
  const[tipoL,setTipoL] = useState ('')
  const[modalidade,setModalidade] = useState('')
  const[grupo,setGrupo] = useState('')
  const[subgrupo,setSubGrupo] = useState('')
  const[demandaFp,setDemandaFp] = useState('')
  const[energiaFp,setEnergiaFp] = useState('')
  const[demandaP,setDemandaP] = useState ('')
  const[energiaP,setEnergiaP] = useState('')
  const[tipoSistema,setTipoSistema] = useState('')
  const[painelP,setPainelP] = useState('')
  const[numeroP,setNumeroP] = useState('')
  const[media,setMedia] = useState('')
  const[potenciaS,setPotenciaS] = useState('')
  const[marcaP,setMarcaP] = useState('')
  const[modeloP,setModeloP] = useState('')
  const[inversorMa,setInversorMa] = useState('')
  const[inversorMo,setInversorMo] = useState('')
  const[numeroInv,setNumeroInv] = useState('')
  const[rua,setRua] = useState ('')
  const[bairro,setBairro] = useState ('')
  const[cep,setCep] = useState ('')
  const[estado,setEstado] = useState ('')
  const[cidade,setCidade] = useState ('')

  useEffect(() => {

    const bId = 2

    if (bId) {
      loadbId(bId)
    }

    return () => { }

  }, [])


  async function loadAdd(Id){
    await api.get('/client/get/add/' + Id, {
      headers: {
        'Authorization': `Basic ${token}`
      }

    }).then((response) => { 
      console.log(response.data)
      setRua(response.data.street)
      setBairro(response.data.neighborhood)
      setCep(response.data.postcode)
      setEstado(response.data.state)
      setCidade(response.data.city)

    })

  }
  
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
      setDonoN(response.data['User.name'])
      //formatt(new Date(response.data.updatedAt),'dd/MM/yyyy')
      setModificadoD(format(new Date(response.data.updatedAt),'dd/MM/yyyy'))
      setTipoPessoa(response.data['Client.tipo'])
      setDocumento(response.data ['Client.document'])
      setTelefone(response.data['Client.phone'])
      setZap(response.data['Client.zap'])
      setEmail(response.data['Client.email'])
      setInfAdc(response.data['Client.addInformation'])
      setFatorS(response.data.sunIndex)
      setTelhado(response.data.roof)
      setTipoL(response.data.typeConnection)
      setModalidade(response.data.modality)
      setGrupo(response.data.group)
      setSubGrupo(response.data.subgroup)
      setDemandaFp(response.data.demadaFp)
      setEnergiaFp(response.data.energiaFp)
      setDemandaP(response.data.demandaP)
      setEnergiaP(response.data.energiaP)
      setTipoSistema(response.data.type)
      setPainelP(response.data.panelpower)
      setNumeroP(response.data.numberborder)
      setMedia(response.data.avgmonth)
      setPotenciaS(response.data.systempower)
      setMarcaP(response.data['placa_negocio.brand'])
      setModeloP(response.data['placa_negocio.description'])
      setInversorMa(response.data['inversor_negocio.brand'])
      setInversorMo(response.data['inversor_negocio.brand'])
      setNumeroInv(response.data.numberInverMicro)
      loadAdd(response.data.ClientId)
      
      
      

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
                        <label> {modificadoD} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Nome
                      <td>
                      </td>
                      <td>
                      <label>{name} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Tipo de pessoa
                      <td>
                      </td>
                      <td>
                        <label> {tipoPessoa} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      CPF/CNPJ
                      <td>
                      </td>
                      <td>
                        <label> {documento} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Telefone
                      <td>
                      </td>
                      <td>
                        <label> {telefone} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      WhatsApp
                      <td>
                      </td>
                      <td>
                        <label> {zap} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Email
                      <td>
                      </td>
                      <td>
                      <label> {email} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Informações adicionais
                      <td>
                      </td>
                      <td>
                      <label> {infAdc} </label>
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
                       <label> {rua} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Bairro
                      <td>
                      </td>
                      <td>
                      <label> {bairro} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      CEP
                      <td>
                      </td>
                      <td>
                      <label> {cep} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Estado
                      <td>
                      </td>
                      <td>
                      <label> {estado} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Cidade
                      <td>
                      </td>
                      <td>
                      <label> {cidade} </label>
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
                      Cliente
                      <td>
                      </td>
                      <td >
                      <label>{name} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Usuário
                      <td>
                      </td>
                      <td>
                      <label> {donoN} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Fator Solar 
                      <td>
                      </td>
                      <td>
                      <label> {fatorS} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Tipo de Telhado
                      <td>
                      </td>
                      <td>
                      <label> {telhado} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                     Tipo de Ligação 
                      <td>
                      </td>
                      <td>
                      <label> {tipoL} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Rateios
                      <td>
                      </td>
                      <td>
                       Rateio x
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                     Modalidade
                      <td>
                      </td>
                      <td>
                      <label> {modalidade} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                     Grupo
                      <td>
                      </td>
                      <td>
                      <label> {grupo} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                    SubGrupo
                      <td>
                      </td>
                      <td>
                      <label> {subgrupo} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                     Demanda FP
                      <td>
                      </td>
                      <td>
                      <label> {demandaFp} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                     Energia FP
                      <td>
                      </td>
                      <td>
                      <label> {energiaFp} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                     Demanda P
                      <td>
                      </td>
                      <td>
                      <label> {demandaP} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                     Energia P
                      <td>
                      </td>
                      <td>
                      <label> {energiaP} </label>
                      </td>
                    </tr>
                    


                  </table>


                </div>
                <div className='cards border rounded-3'>
                <div className='card-title'>
                      <h6 class="card-content-title mb-3 fw-semibold">Informações do sistema</h6>
                      <button type="button" className="btn btn-light btn-sm text-primary d-flex align-items-center" onClick={() => {

                      }}>
                        <BsFillPencilFill />
                      </button>
                </div>
                  <table>
                      
                    <tr className='linhabaixo tamanho-tr'>
                      Tipo de sistema
                      <td>
                      </td>
                      <td>
                      <label>{tipoSistema} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Potência do painel
                      <td>
                      </td>
                      <td>
                      <label>{painelP} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                    Número de placas
                      <td>
                      </td>
                      <td>
                      <label>{numeroP} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                    Média mensal
                      <td>
                      </td>
                      <td>
                      <label>{media} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                    Potência do sistema
                      <td>
                      </td>
                      <td>
                      <label>{potenciaS} </label>
                      </td>
                    </tr>
                  </table>
                  
                  
                  <div className='card-title'>
                      <h6 class="card-content-title mb-3 fw-semibold">Informações do sistema</h6>
                      <button type="button" className="btn btn-light btn-sm text-primary d-flex align-items-center" onClick={() => {

                      }}>
                        <BsFillPencilFill />
                      </button>
                </div>
                  <table>
                    <tr className='linhabaixo tamanho-tr'>
                      <td>
                        Marca da placa
                      </td>
                      <td>
                        <label> {marcaP} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      <td>
                        Modelo da placa
                      </td>
                      <td>
                      <label> {modeloP} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      <td>
                        Marca do Inversor
                      </td>
                      <td>
                      <label> {inversorMa} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      <td>
                        Modelo do Inversor 
                      </td>
                      <td>
                      <label> {inversorMo} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      <td>
                        Número de Inversores
                      </td>
                      <td>
                      <label> {numeroInv} </label>
                      </td>
                    </tr>
                  </table>
               
                
                
                
                </div>
                
                    
                  </div>
                  
                </div>
              </div>
              
        </div>
      </div>

    </div>
  );
};


export default ViewBusiness;
