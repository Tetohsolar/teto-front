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
const ValoresProposta = () =>   {
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
      setConsumo(response.data.avgconsumption)
      setGeracaoSu(response.data.suggestedGeneration)
      setGeracaoDesejada(response.data.suggestedDesired)
      setComplemento(response.data.complement.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      setValorTotal(response.data.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
     
      setPrecoKit(response.data.kitprice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      setProjeto(response.data.project.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      setImposto(response.data.tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      setMontagem(response.data.assembled.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      setComissaoVe(response.data.sellercomission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      setMargem(response.data.margin.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      if (response.data.amountcost){
      setTotalLu(response.data.amountcost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      }
      setMargemCa(response.data.marginCalculate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      setValorComissao(response.data.valuesellercomission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      setLucroProjeto(response.data.profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      setLucroReal(response.data.realProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      
      setTotalCusto(response.data.amountcost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
     
      setTipoSistema(response.data.type)

    }).catch((error) => { console.log(error) })

  }

  function calculaCustos(e) {
    let precoK = parseFloat(precoKit)
    var numeroArredondado = precoK.toFixed(2)
    let fator = afflited.complementCostI
    let tax = afflited.taxI
    if (tipoSistema === "MicroInversor") {
      fator = afflited.complementCostM
      tax = afflited.taxM
    }

    var complement = precoK * (fator / 100)
    var imp = precoK * (tax / 100)
    const numeroFormatado = precoK.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  //  setPrecoKit(numeroFormatado)
    setComplemento(complement.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    setImposto(imp.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    const projet = parseFloat(projeto.replace(/\./g, '').replace(',', '.'));
    const mont = parseFloat(montagem.replace(/\./g, '').replace(',', '.'));
    var total = precoK + complement + imp + projet + mont
    setTotalCusto(total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    const mgsV = parseFloat(String(margem).replace(/\./g, '').replace(',', '.'));
    const comsV = parseFloat(String(comissaoVe).replace(/\./g, '').replace(',', '.'));
   
    const comsV4 = parseFloat(String(comissaoVe).replace(/\./g, '').replace(',', '.') - 1);

    var mar = (mgsV / 100) * precoK;
    var totalProjeto = 100 * (parseInt((total + mar) / 100))
    var totalProjetoS = parseFloat(total + mar)
    var com = (comsV / 100) * totalProjeto
    var lucro = mar - com
    var lucroR = (lucro / parseFloat(totalProjeto)) * 100


    setMargemCa(mar.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    setValorComissao(com.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    setValorTotal(totalProjeto.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    setLucroProjeto(lucro.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    setLucroReal(lucroR.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
  }

  async function salvar (e) {

    e.preventDefault();
    const precoK = parseFloat(precoKit.replace(/\./g, '').replace(',', '.'));
    const comp = parseFloat(complemento.replace(/\./g, '').replace(',', '.'));
    const proje = parseFloat(projeto.replace(/\./g, '').replace(',', '.'));
    const imp = parseFloat(imposto.replace(/\./g, '').replace(',', '.'));
    const monta = parseFloat(montagem.replace(/\./g, '').replace(',', '.'));
    const ct = parseFloat(totalCusto.replace(/\./g, '').replace(',', '.'));
    const mg = parseFloat(margemCa.replace(/\./g, '').replace(',', '.'));
    const vt = parseFloat(valorTotal.replace(/\./g, '').replace(',', '.'));
    const vc = parseFloat(valorComissao.replace(/\./g, '').replace(',', '.'));
    const lp = parseFloat(lucroProjeto.replace(/\./g, '').replace(',', '.'));
    const lr = parseFloat(lucroReal.replace(/\./g, '').replace(',', '.'));
    const mg1 = parseFloat(margem.replace(/\./g, '').replace(',', '.'));
    const cmv = parseFloat(comissaoVe.replace(/\./g, '').replace(',', '.'));

    const data = {
      avgconsumption: consumo, suggestedGeneration:  geracaoSu,
      suggestedDesired: geracaoDesejada,
      consumption: consumo,
      avgmonth: consumo,
      kitprice: precoK, complement: comp,
      project: proje, tax: imp, assembled: monta,
      sellercomission: cmv, margin: mg1,
      amountcost: ct, marginCalculate: mg,
      amount: vt, valuesellercomission: vc,
      profit: lp, realProfit: lr, 
      
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
          <label htmlFor="inputFirstName" className="form-label">
           Consumo (KWh)
          </label>
          <input type="text" readOnly className="form-control alinhaDireita" id="inputFirstName" value={consumo} onChange={(e) => setConsumo(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label htmlFor="inputFirstName" className="form-label">
           Geração sugerida (KWh)
          </label>
          <input type="text"  readOnly className="form-control alinhaDireita" id="inputFirstName" value={geracaoSu} onChange={(e) => setGeracaoSu(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label htmlFor="inputFirstName" className="form-label">
           Geração desejada (KWh)
          </label>
          <NumericFormat decimalScale={0} placeholder="" decimalSeparator=","
                  className="form-control number" value={geracaoDesejada || ''} onChange={(e) => setGeracaoDesejada(e.target.value)} />
          
        </div>
        <div className="col-md-3">
          <label htmlFor="inputFirstName" className="form-label">
           Preço do kit (R$)
          </label>
          <NumericFormat decimalScale={2} placeholder="" decimalSeparator=","
                  className="form-control number" value={precoKit || ''} onChange={(e) => setPrecoKit(e.target.value)} onKeyUp={calculaCustos} />
        </div>
        
        <div className="col-md-3">
          <label htmlFor="inputFirstName" className="form-label">
           Complemento (R$)
          </label>
          <NumericFormat decimalScale={2} placeholder="" decimalSeparator=","
                  className="form-control number" value={complemento || ''} onChange={(e) => setComplemento(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label htmlFor="inputFirstName" className="form-label">
           Projeto (R$)
          </label>
          <NumericFormat decimalScale={2} placeholder="" decimalSeparator=","
                  className="form-control number" value={projeto|| ''} onChange={(e) => setProjeto(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label htmlFor="inputFirstName" className="form-label">
           Imposto
          </label>
          <NumericFormat decimalScale={2} placeholder="" decimalSeparator=","
                  className="form-control number" value={imposto|| ''} onChange={(e) => setImposto(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label htmlFor="inputFirstName" className="form-label">
          Montagem
          </label>
          <NumericFormat decimalScale={2} placeholder="" decimalSeparator=","
                  className="form-control number" value={montagem|| ''} onChange={(e) => setMontagem(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label htmlFor="inputFirstName" className="form-label">
           Comissão do vendedor
          </label>
          <NumericFormat decimalScale={2} placeholder="" decimalSeparator="," readOnly
                  className="form-control number" value={comissaoVe|| ''} onChange={(e) => setComissaoVe(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label htmlFor="inputFirstName" className="form-label">
           Valor da Comissão
          </label>
          <NumericFormat decimalScale={2} placeholder="" decimalSeparator=","
                  className="form-control number" value={valorComissao|| ''} onChange={(e) => setValorComissao(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label htmlFor="inputFirstName" className="form-label">
          Margem
          </label>
          <NumericFormat decimalScale={2} placeholder="" decimalSeparator=","
                  className="form-control number" value={margem|| ''} onChange={(e) => setMargem(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label htmlFor="inputFirstName" className="form-label">
          Margem calculada
          </label>
          <NumericFormat decimalScale={2} placeholder="" decimalSeparator="," readOnly
                  className="form-control number" value={margemCa|| ''} onChange={(e) => setMargemCa(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label htmlFor="inputFirstName" className="form-label">
          Total de custo
          </label>
          <NumericFormat decimalScale={2} placeholder="" decimalSeparator="," readOnly
                  className="form-control number" value={totalCusto|| ''} onChange={(e) => setTotalCusto(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label htmlFor="inputFirstName" className="form-label">
          Lucro (%)
          </label>
          <input type="text" readOnly className="form-control alinhaDireita" id="inputFirstName" value={lucroReal} onChange={(e) => setLucroReal(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label htmlFor="inputFirstName" className="form-label">
          Valor total do projeto
          </label>
          <NumericFormat decimalScale={2} placeholder="" decimalSeparator="," readOnly
                  className="form-control number" value={valorTotal|| ''} onChange={(e) => setValorTotal(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label htmlFor="inputFirstName" className="form-label">
          Lucro do projeto (R$)
          </label>
          <NumericFormat decimalScale={2} placeholder="" decimalSeparator="," readOnly
                  className="form-control number" value={lucroProjeto|| ''} onChange={(e) => setLucroProjeto(e.target.value)} />
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
