import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../context/SidebarWrapperContext';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

import api from '../../api';
import NumberFormatCustom from '../communs/DecimalMaskedTextField';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
const ValoresProposta = () => {
  const { token, afflited } = useContext(AuthContext)
  const { sidebarWrapper } = useContext(SidebarWrapperContext)
  const pageTitle = "Informações do usuário"

  const [consumo, setConsumo] = useState('')
  const [geracaoSu, setGeracaoSu] = useState('')
  const [precoKit, setPrecoKit] = useState('')
  const [projeto, setProjeto] = useState('')
  const [imposto, setImposto] = useState('')
  const [comissaoVe, setComissaoVe] = useState('')
  const [lucroProjeto, setLucroProjeto] = useState('')
  const [lucroReal, setLucroReal] = useState('')
  const [geracaoDesejada, setGeracaoDesejada] = useState('')
  const [totalCusto, setTotalCusto] = useState('')
  const [valorTotal, setValorTotal] = useState('')
  const [margemCa, setMargemCa] = useState('')
  const [complemento, setComplemento] = useState('')
  const [valorComissao, setValorComissao] = useState('')
  const [tipoSistema, setTipoSistema] = useState('')
  const navigate = useNavigate();
  const [cip, setCip] = useState('')
  const [bandeira, setBandeira] = useState('')
  const [potenciaS,setPotenciaS]=useState('')
  const [media, setMedia] = useState('')
  const[tipoSistemas,setTipoSistemas]=useState([])



  const { businessId } = useParams();


  useEffect(() => {
     buscaSistema()

    if (businessId) {
      loadbId(businessId)
    }

    return () => { }

  }, [])

  async function buscaSistema() {


    await api.get('/typesystem/all',

      {
        headers: {
          'Authorization': `Basic ${token}`
        }
      }
    ).then((response) => {
      setTipoSistemas(response.data.types)
    })

  }

  async function loadbId(id) {

    await api.get('/business/get/' + id, {
      headers: {
        'Authorization': `Basic ${token}`
      }

    }).then((response) => {


      
      setConsumo(response.data.avgconsumption)
      setGeracaoSu(response.data.suggestedGeneration)
      setGeracaoDesejada(response.data.suggestedDesired)
      setValorTotal(response.data.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))

      setPrecoKit(response.data.kitprice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      setComissaoVe(response.data.sellercomission)
      
      
      setValorComissao(response.data.valuesellercomission)
      setTotalCusto(response.data.amountcost)
      setTipoSistema(response.data.TypeSystemId)
      setPotenciaS(response.data.systempower)
      setMedia(response.data.avgmonth)
      setCip(response.data.cip.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      setBandeira(response.data.flag.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 5 }))
      setMedia(response.data.mediaMensal)
      let custoV = response.data.amount - response.data.valuesellercomission
      setTotalCusto(custoV)
      

    
    }).catch((error) => { console.log(error) })

  }
  function calculaCustos(e) {

    let preco = parseFloat(String(totalCusto).replace(/\./g, '').replace(',', '.'))
    let precoComissao =  parseFloat(String(valorComissao).replace(/\./g, '').replace(',', '.'))
    let total = preco + precoComissao
    setValorTotal(total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    let comissao = (precoComissao / total)*100
    setComissaoVe(comissao)

  }

/*
  
  function calculaCustos(e) {
    
    
    
    let fator = afflited.complementCostI
    let tax = afflited.taxI
    if (tipoSistema === "MicroInversor") {
      fator = afflited.complementCostM
      tax = afflited.taxM
    }
    var complement = precoK * (fator / 100)
    
    var imp = precoK * (tax / 100)
    console.log(!isNaN(complement))
    if (!isNaN(complement)){
      setComplemento(complement.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    }else{
      setComplemento("")
    }
    
    if (!isNaN(imp)){
    setImposto(imp.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    }else{
      setImposto("")
    }
    const projet = parseFloat(projeto.replace(/\./g, '').replace(',', '.'));
    const mont = parseFloat(montagem.replace(/\./g, '').replace(',', '.'));
    var total = precoK + complement + imp + projet + mont
    setTotalCusto(total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    const mgsV = parseFloat(String(margem).replace(/\./g, '').replace(',', '.'));
    const comsV = parseFloat(String(comissaoVe).replace(/\./g, '').replace(',', '.'));

    var mar = (mgsV / 100) * precoK;
    var totalProjeto = 100 * (parseInt((total + mar) / 100))
    
    var com = (comsV / 100) * totalProjeto
    var lucro = mar - com
    var lucroR = (lucro / parseFloat(totalProjeto)) * 100

    setMargemCa(mar.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    setValorComissao(com.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    setValorTotal(totalProjeto.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    if (isNaN(lucro)){
      setLucroProjeto("")
    }else{
    setLucroProjeto(lucro.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    }
    setLucroReal(lucroR.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
  }
*/
  async function salvar(e) {

    e.preventDefault();
    const ct = parseFloat(String(totalCusto).replace(/\./g, '').replace(',', '.'));
    const vt = parseFloat(String(valorTotal).replace(/\./g, '').replace(',', '.'));
    const vc = parseFloat(String(valorComissao).replace(/\./g, '').replace(',', '.'));
    const cmv = parseFloat(comissaoVe);
    const cipl = parseFloat(String(cip).replace(/\./g, '').replace(',', '.'));
    const bandeiral = parseFloat(String(bandeira).replace(/\./g, '').replace(',', '.'));


    const data = {
      sellercomission: cmv,
      amountcost: ct, 
      amount: vt, valuesellercomission: vc,
      cip: cipl,
      flag: bandeiral, type: tipoSistema, 
    };

    console.log(data)
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
          <h5 className="pb-3">{pageTitle}</h5>
          <div className="p-3 mb-3 bg-white border rounded-3">
            <ToastContainer />
            <h5 className="card-content-title fw-semibold">{"Editar Negocio"}</h5>
            <hr className="my-4" />

            <form className="row g-3" onSubmit={salvar} >

              <div className="col-md-3">
               
                <NumberFormatCustom readOnly label={"Consumo (KWh)"}   variant="outlined" decimal={2} value={consumo} onChange={(e) => setConsumo(e.target.value)} ></NumberFormatCustom>
                
              </div>
              <div className="col-md-3">
               
                <NumberFormatCustom readOnly label={"Geração sugerida (KWh)"}  variant="outlined" decimal={2} value={geracaoSu} onChange={(e) => setGeracaoSu(e.target.value)} ></NumberFormatCustom>
           
              </div>
              <div className="col-md-3">
                
                <NumberFormatCustom readOnly label={"Geração desejada (KWh)"}  variant="outlined" decimal={2} value={geracaoDesejada } onChange={(e) => setGeracaoDesejada (e.target.value)} ></NumberFormatCustom>
            
              </div>
              <div className="col-md-3">
                
                <TextField label={"Preço do kit(R$)"}  disabled variant="outlined" decimal={2} value={precoKit} onChange={(e) => setPrecoKit(e.target.value)} ></TextField>
              </div>
              <div className="col-md-3">
              
                <NumberFormatCustom readOnly label={"Comissão do vendedor(%)"}  variant="outlined" decimal={2} value={comissaoVe} onChange={(e) => setComissaoVe (e.target.value)} ></NumberFormatCustom>
               
              </div>
              <div className="col-md-3">
                <NumberFormatCustom label={"Valor da Comissão (R$)"}  variant="outlined" decimal={2} value={valorComissao} onChange={(e) => {setValorComissao (e.target.value);} } onBlur={(e)=>{calculaCustos()}}  ></NumberFormatCustom>
              </div>
              <div className="col-md-3">
                <NumberFormatCustom  readOnly label={"Total de custo (R$)"}  variant="outlined" decimal={2} value={totalCusto} onChange={(e) => setTotalCusto (e.target.value)} ></NumberFormatCustom>
 
              </div>
              <div className="col-md-3">
                
                <TextField  disabled label={"Valor total do projeto (R$)"}  variant="outlined" decimal={2} value={valorTotal} onChange={(e) => setValorTotal(e.target.value)} ></TextField>
                
              </div>
              <div className="col-md-3">
                
              <FormControl fullWidth>
                    <InputLabel id="tipoSistema">Tipo de sistema</InputLabel>
                    <Select
                      labelId="tipoSistema"
                      id="tipoSistema"
                      value={tipoSistema}
                      label="Sistema"
                      onChange={(e) => setTipoSistema(e.target.value)}

                    >
                      <MenuItem key={-1}value={''}></MenuItem>
                      {
                        tipoSistemas.length > 0 &&
                        tipoSistemas.map((option, i) => {
                          return (<MenuItem key={i} value={option.id}>{option.name}</MenuItem>)
                        })
                      }
                </Select>
                </FormControl>
              </div>
             
              <div className="col-md-3">
                
                <NumberFormatCustom label={"CIP"}  variant="outlined" decimal={2} value={cip} onChange={(e) => setCip(e.target.value)} ></NumberFormatCustom>
                
              </div>
              <div className="col-md-3">
                
                <NumberFormatCustom label={"Bandeira"}  variant="outlined" decimal={5} value={bandeira} onChange={(e) => setBandeira(e.target.value)} ></NumberFormatCustom>
                
              </div>

              <div className="col-md-3">
                
                <TextField disabled label={"Média mensal (kWh)"}  variant="outlined" decimal={2} value={media} onChange={(e) => setMedia(e.target.value)} ></TextField>
                
              </div>
              <div className="col-md-3">
                
                <NumberFormatCustom readOnly label={"Potência do sistema"}  variant="outlined" decimal={2} value={potenciaS} onChange={(e) => setPotenciaS(e.target.value)} ></NumberFormatCustom>
                
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

export default ValoresProposta;
