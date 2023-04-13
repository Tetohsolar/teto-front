import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../context/SidebarWrapperContext';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import InputMask from 'react-input-mask';
import api from '../../api';
import { NumericFormat } from 'react-number-format';
const ValoresProposta = () =>   {
  const { token } = useContext(AuthContext)
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
      setPrecoKit(response.data.kitprice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      setProjeto(response.data.project.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      setImposto(response.data.tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      setMontagem(response.data.assembled.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      setComissaoVe(response.data.sellercomission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      setMargem(response.data.margin.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      setTotalLu(response.data.amountcost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      setMargemCa(response.data.marginCalculate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      setValorTotal(response.data.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      setValorComissao(response.data.valuesellercomission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      setLucroProjeto(response.data.profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      setLucroReal(response.data.realProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      setComplemento(response.data.complement.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      setGeracaoDesejada(response.data.suggestedDesired.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      setTotalCusto(response.data.amountcost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
     
      

    }).catch((error) => { console.log(error) })

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
     <form className="row g-3">
      
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
                  className="form-control number" value={precoKit || ''} onChange={(e) => setPrecoKit(e.target.value)} />
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
