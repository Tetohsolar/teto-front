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
import NumberFormatCustom from '../communs/DecimalMaskedTextField';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
const ValoresProposta = () => {
  const { token, afflited } = useContext(AuthContext)
  const { sidebarWrapper } = useContext(SidebarWrapperContext)
  const pageTitle = "Informações do usuário"

  const [consumo, setConsumo] = useState('')
  const [geracaoSu, setGeracaoSu] = useState('')
  const [precoKit, setPrecoKit] = useState('')
  const [projeto, setProjeto] = useState('')
  const [imposto, setImposto] = useState('')
  const [montagem, setMontagem] = useState('')
  const [margem, setMargem] = useState('')
  const [comissaoVe, setComissaoVe] = useState('')
  const [totalLu, setTotalLu] = useState('')
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
  const [potenciaS, setPotenciaS] = useState('')
  const [media, setMedia] = useState('')
  const [tipoSistemas, setTipoSistemas] = useState([])



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

      setPrecoKit(response.data.kitprice)
      setComissaoVe(response.data.sellercomission)

      if (response.data.amountcost) {
        setTotalLu(response.data.amountcost)
      }
      setValorComissao(response.data.sellercomission)
      setTotalCusto(response.data.amountcost)
      setTipoSistema(response.data.TypeSystemId)
      setPotenciaS(response.data.systempower)
      setMedia(response.data.avgmonth)
      setCip(response.data.cip)
      setBandeira(response.data.flag)




    }).catch((error) => { console.log(error) })

  }

  function calculaTotalComplemento(e) {
    let precoK = parseFloat(String(precoKit).replace(/\./g, '').replace(',', '.'))
    let compl = parseFloat(String(complemento).replace(/\./g, '').replace(',', '.'))
    let proj = parseFloat(String(projeto).replace(/\./g, '').replace(',', '.'))
    let imp = parseFloat(String(imposto).replace(/\./g, '').replace(',', '.'))
    let mont = parseFloat(String(montagem).replace(/\./g, '').replace(',', '.'))
    let totalCusto = precoK + compl + proj + imp + mont;
    setTotalCusto(totalCusto.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))

    const mgsV = parseFloat(String(margem).replace(/\./g, '').replace(',', '.'));
    const comsV = parseFloat(String(comissaoVe).replace(/\./g, '').replace(',', '.'));

    var mar = (mgsV / 100) * precoK;
    var total = precoK + compl + imp + proj + mont
    var totalProjeto = 100 * (parseInt((total + mar) / 100))

    var com = (comsV / 100) * totalProjeto
    var lucro = mar - com
    var lucroR = (lucro / parseFloat(totalProjeto)) * 100

    setMargemCa(mar.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    if (isNaN(com)) {
      setValorComissao("")
    } else {
      setValorComissao(com.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    }
    setValorTotal(totalProjeto.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    setLucroProjeto(lucro.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    if (isNaN(lucroR)) {
      setLucroReal("")
    } else {
      setLucroReal(lucroR.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    }
  }

  function calculaCustos(e) {
    let precoK = parseFloat(String(precoKit).replace(/\./g, '').replace(',', '.'))


    let fator = afflited.complementCostI
    let tax = afflited.taxI
    if (tipoSistema === "MicroInversor") {
      fator = afflited.complementCostM
      tax = afflited.taxM
    }
    var complement = precoK * (fator / 100)

    var imp = precoK * (tax / 100)
    console.log(!isNaN(complement))
    if (!isNaN(complement)) {
      setComplemento(complement.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    } else {
      setComplemento("")
    }

    if (!isNaN(imp)) {
      setImposto(imp.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    } else {
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
    if (isNaN(lucro)) {
      setLucroProjeto("")
    } else {
      setLucroProjeto(lucro.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    }
    setLucroReal(lucroR.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
  }

  async function salvar(e) {

    e.preventDefault();
    // const precoK = parseFloat(precoKit.replace(/\./g, '').replace(',', '.'));
    // const comp = parseFloat(complemento.replace(/\./g, '').replace(',', '.'));
    // const proje = parseFloat(projeto.replace(/\./g, '').replace(',', '.'));
    // const imp = parseFloat(imposto.replace(/\./g, '').replace(',', '.'));
    // const ct = parseFloat(totalCusto.replace(/\./g, '').replace(',', '.'));
    // const mg = parseFloat(margemCa.replace(/\./g, '').replace(',', '.'));
    // const vt = parseFloat(valorTotal.replace(/\./g, '').replace(',', '.'));
    // const vc = parseFloat(valorComissao.replace(/\./g, '').replace(',', '.'));
    // const lp = parseFloat(lucroProjeto.replace(/\./g, '').replace(',', '.'));
    // const lr = parseFloat(lucroReal.replace(/\./g, '').replace(',', '.'));
    // const cmv = parseFloat(comissaoVe.replace(/\./g, '').replace(',', '.'));
    const precoK = parseFloat(precoKit);
    const comp = parseFloat(complemento);
    const proje = parseFloat(projeto);
    const imp = parseFloat(imposto);
    const ct = parseFloat(totalCusto);
    const mg = parseFloat(margemCa);
    const vt = parseFloat(valorTotal);
    const vc = parseFloat(valorComissao);
    const lp = parseFloat(lucroProjeto);
    const lr = parseFloat(lucroReal);
    const cmv = parseFloat(comissaoVe);

    const data = {
      avgconsumption: consumo, suggestedGeneration: geracaoSu,
      suggestedDesired: geracaoDesejada,
      consumption: consumo,
      avgmonth: consumo,
      kitprice: precoK, complement: comp,
      project: proje,
      // tax: imp,
      // assembled: monta,
      sellercomission: cmv,
      // margin: mg1,
      amountcost: ct,
      //  marginCalculate: mg,
      amount: vt, valuesellercomission: vc,
      // profit: lp, 
      // realProfit: lr,

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
          <h5 className="pb-3">{pageTitle}</h5>
          <div className="p-3 mb-3 bg-white border rounded-3">
            <ToastContainer />
            <h5 className="card-content-title fw-semibold">{"Editar Negocio"}</h5>
            <hr className="my-4" />

            <form className="row g-3" onSubmit={salvar} >

              <div className="col-md-3">

                <NumberFormatCustom label={"Consumo (KWh)"} variant="outlined" decimal={2} value={consumo} onChange={(e) => setConsumo(e.target.value)} ></NumberFormatCustom>

              </div>
              <div className="col-md-3">

                <NumberFormatCustom label={"Geração sugerida (KWh)"} variant="outlined" decimal={2} value={geracaoSu} onChange={(e) => setGeracaoSu(e.target.value)} ></NumberFormatCustom>

              </div>
              <div className="col-md-3">

                <NumberFormatCustom label={"Geração desejada (KWh)"} variant="outlined" decimal={2} value={geracaoDesejada} onChange={(e) => setGeracaoDesejada(e.target.value)} ></NumberFormatCustom>

              </div>
              <div className="col-md-3">

                <NumberFormatCustom label={"Preço do kit(R$)"} variant="outlined" decimal={2} value={precoKit} onChange={(e) => setPrecoKit(e.target.value)} ></NumberFormatCustom>
              </div>
              <div className="col-md-3">

                <NumberFormatCustom label={"Comissão do vendedor(%)"} variant="outlined" decimal={2} value={comissaoVe} onChange={(e) => setComissaoVe(e.target.value)} ></NumberFormatCustom>

              </div>
              <div className="col-md-3">
                <NumberFormatCustom label={"Valor da Comissão (R$)"} variant="outlined" decimal={2} value={valorComissao} onChange={(e) => setComissaoVe(e.target.value)} ></NumberFormatCustom>
              </div>
              <div className="col-md-3">
                <NumberFormatCustom label={"Total de custo (R$)"} variant="outlined" decimal={2} value={totalCusto} onChange={(e) => setTotalCusto(e.target.value)} ></NumberFormatCustom>

              </div>
              <div className="col-md-3">

                <NumberFormatCustom label={"Valor total do projeto (R$)"} variant="outlined" decimal={2} value={valorTotal} onChange={(e) => setValorTotal(e.target.value)} ></NumberFormatCustom>

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
                    <MenuItem key={-1} value={''}></MenuItem>
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

                <NumberFormatCustom label={"Média mensal (kWh)"} variant="outlined" decimal={2} value={media} onChange={(e) => setMedia(e.target.value)} ></NumberFormatCustom>

              </div>
              <div className="col-md-3">

                <NumberFormatCustom label={"Potência do sistema"} variant="outlined" decimal={2} value={potenciaS} onChange={(e) => setPotenciaS(e.target.value)} ></NumberFormatCustom>

              </div>
              <div className="col-md-3">

                <NumberFormatCustom label={"CIP"} variant="outlined" decimal={2} value={cip} onChange={(e) => setCip(e.target.value)} ></NumberFormatCustom>

              </div>
              <div className="col-md-3">

                <NumberFormatCustom label={"Bandeira"} variant="outlined" decimal={5} value={bandeira} onChange={(e) => setBandeira(e.target.value)} ></NumberFormatCustom>

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
