import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../context/SidebarWrapperContext';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

import api from '../../api';
import { NumericFormat } from 'react-number-format';
import { async } from 'q';
import { id } from 'date-fns/locale';
const SystemTypeform = () =>   {
  const { token, afflited } = useContext(AuthContext)
  const { sidebarWrapper } = useContext(SidebarWrapperContext)
  const [potenciaPainel, setPotenciaPainel] = useState('')
  const [potenciaSistema,setPotenciaSistema] = useState('')
  const [cip,setCip] = useState ('')
  const [bandeira,SetBandeira] = useState('')
  const [numeroPlaca, setNumeroPlaca] = useState('')
  const [mediaMensal, setMediaMensal] = useState('')
  const [tipoSistema, setTipoSistema] = useState('')
  const navigate = useNavigate();
  
  
  const { businessId } = useParams();



  /*

  const [complemento,setComplemento] = useContext('')
  const [business,setBusiness] = useContext('')
  const [geracaoDesejada,setGeracaoDesajada] = useContext('')
  const [totalCusto,setTotalCusto] = useContext('')

*/
  useEffect(() => {

    //const businessId = 1

    if (businessId) {
      loadbId(businessId)
    }

    return () => { } 

  }, [])


  async function loadbId(id) {

    await api.get('/business/get/' + id, {
      headers: {
        'Authorization': `Basic ${token}`
      }

    }).then((response) => {
     
    
     // setValor(formatter.format(response.data.amount))
     setPotenciaPainel(response.data.panelpower) 
     setNumeroPlaca(response.data.numberborder)
     setMediaMensal(response.data.avgmonth)
     setPotenciaSistema(response.data.systempower)
     setCip (formatter.format(response.data.cip))
     SetBandeira(response.data.flag)
      setTipoSistema(response.data.type)

    }).catch((error) => { console.log(error) })

  }

 

  async function salvar (e) {

    e.preventDefault();
    
    const cipN = parseFloat(String(cip).replace(/\./g, '').replace(',', '.'));
    const flag = parseFloat(String(bandeira).replace(/\./g, '').replace(',', '.'));

    const data = {
      
    panelpower: potenciaPainel, numberborder : numeroPlaca,
      avgmonth :mediaMensal ,
      systempower: potenciaSistema, type:tipoSistema,
     cip: cipN, flag:flag
      
    };

    console.log(token)
    await api.patch('/business/update/' + businessId, data
      , {
        headers: {
          'Authorization': `Basic ${token}`
        }

      }).then((response) => {

      
        navigate("/business/view/" + businessId)
      }).catch(
        (response) => {
          toast.error(response.response.data.message)
          throw new Error()
        }
      )

  
  }

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
  return (
    <div>
      <Navbar />
      <div className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}>
        <Sidebar activeButtonProfile="active" />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <h5 className="pb-3">Editar negócio</h5>
          <div className="p-3 mb-3 bg-white border rounded-3">
      <ToastContainer />
      <h5 className="card-content-title fw-semibold">{"Tipo do negócio"}</h5>
      <hr className="my-4" />

     <form className="row g-3" onSubmit={salvar} >
      
        <div className="col-md-3">
          <label htmlFor="inputFirstName" className="form-label">
          Tipo de sistema
          </label>
          <select className="form-select" id="inputTipoSistema" value={tipoSistema} onChange={(e) => setTipoSistema(e.target.value)} >
                    <option value="Inversor">Inversor</option>
                    <option value="MicroInversor">Microinversor</option>
                  </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="inputFirstName" className="form-label">
          Potência do painel (W)
          </label>
          <input type="text"  className="form-control alinhaDireita" id="inputFirstName" value={potenciaPainel} onChange={(e) => setPotenciaPainel(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label htmlFor="inputFirstName" className="form-label">
           Número de placas
          </label>
          <NumericFormat decimalScale={0} readOnly placeholder="" decimalSeparator=","
                  className="form-control number" value={numeroPlaca|| ''} onChange={(e) => setNumeroPlaca(e.target.value)} />
          
        </div>
        <div className="col-md-3">
          <label htmlFor="inputFirstName" className="form-label">
           Média mensal (kWh)
          </label>
          <NumericFormat decimalScale={2} readOnly placeholder="" decimalSeparator=","
                  className="form-control number" value={mediaMensal|| ''} onChange={(e) => mediaMensal(e.target.value)} />
        </div>
        
        <div className="col-md-3">
          <label htmlFor="inputFirstName" className="form-label">
           Potência do sistema (kWh)
          </label>
          <NumericFormat decimalScale={2} readOnly placeholder="" decimalSeparator=","
                  className="form-control number" value={potenciaSistema || ''} onChange={(e) => setPotenciaSistema(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label htmlFor="inputFirstName" className="form-label">
           CIP (R$)
          </label>
          <NumericFormat decimalScale={2} placeholder="" decimalSeparator=","
                  className="form-control number" value={cip|| ''} onChange={(e) => setCip(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label htmlFor="inputFirstName" className="form-label">
           Bandeira (R$)
          </label>
          <NumericFormat decimalScale={5} placeholder="" decimalSeparator=","
                  className="form-control number" value={bandeira|| ''} onChange={(e) => SetBandeira(e.target.value)} />
        </div>
        
        <div className="customerCliente">
          <button className="btn btn-primary text-light" type="submit" >
           Salvar
          </button>
        </div>
      </form>
    </div>
        </div>
      </div>
    </div>
  );
};

export default SystemTypeform;
