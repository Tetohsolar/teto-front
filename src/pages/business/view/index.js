import './home.scss';
import { useContext } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../../context/SidebarWrapperContext';
import { useEffect } from 'react';
import api from '../../../api';
import { AuthContext } from '../../../context/AuthContext';
import { useState } from 'react';
import { BsFillPencilFill } from "react-icons/bs";
import { format } from 'date-fns';
import {  useNavigate, useParams } from 'react-router-dom';
import { BsPencilFill} from "react-icons/bs";
import EditPersonalData from './editpersonal';
import EditSituationBusiness from '../../../components/modalSituation';
import { BsPrinter} from "react-icons/bs";



const ViewBusiness = () => {
  const [ClientId, setClientId] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [donoN, setDonoN] = useState('')
  const [numberP, setNumberP] = useState('')
  const { token } = useContext(AuthContext)
  const { sidebarWrapper } = useContext(SidebarWrapperContext);
  const [modificadoD, setModificadoD] = useState('')
  const [tipoPessoa, setTipoPessoa] = useState('')
  const [documento, setDocumento] = useState('')
  const [telefone, setTelefone] = useState('')
  const [zap, setZap] = useState('')
  const [email, setEmail] = useState('')
  const [infAdc, setInfAdc] = useState('')
  const [fatorS, setFatorS] = useState('')
  const [telhado, setTelhado] = useState('')
  const [tipoL, setTipoL] = useState('')
  const [modalidade, setModalidade] = useState('')
  const [grupo, setGrupo] = useState('')
  const [subgrupo, setSubGrupo] = useState('')
  const [demandaFp, setDemandaFp] = useState('')
  const [energiaFp, setEnergiaFp] = useState('')
  const [demandaP, setDemandaP] = useState('')
  const [energiaP, setEnergiaP] = useState('')
  const [tipoSistema, setTipoSistema] = useState('')
  const [painelP, setPainelP] = useState('')
  const [numeroP, setNumeroP] = useState('')
  const [media, setMedia] = useState('')
  const [potenciaS, setPotenciaS] = useState('')
  const [rua, setRua] = useState('')
  const [bairro, setBairro] = useState('')
  const [cep, setCep] = useState('')
  const [estado, setEstado] = useState('')
  const [cidade, setCidade] = useState('')
  const { businessId } = useParams();
  const [valor, setValor] = useState('')
  const [consumo, setConsumo] = useState('')
  const [geracaoSu, setGeracaoSu] = useState('')
  const [precoKit, setPrecoKit] = useState('')
  const [projeto, setProjeto] = useState('')
  const [imposto, setImposto] = useState('')
  const [montagem, setMontagem] = useState('')
  const [comissaoVe, setComissaoVe] = useState('')
  const [margem, setMargem] = useState('')
  const [totalLu, setTotalLu] = useState('')
  const [margemCa, setMargemCa] = useState('')
  const [valorTotal, setValorTotal] = useState('')
  const [valorComissao, setValorComissao] = useState('')
  const [lucroReal, setLucroReal] = useState('')
  const [lucroProjeto, setLucroProjeto] = useState('')
  const [complemento, setcomplemento] = useState('')
  const [business, setBusiness] = useState([]);
  const [client, setClient] = useState([]);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [geracaoDesejada, setGeracaoDesejada] = useState('');
  const [cip, setCip] = useState('');
  const [bandeira, setBandeira] = useState('');
  const [total2, setTotal2] = useState('');
  const [marg2, setMarg2] = useState('');
  const [comiss2, setComiss2] = useState('');
  const [prof2, setProf2] = useState('')
  const [profitR2, setProfitR2] = useState('')
  const [margR2, setMargR2] = useState('')
  const [total4, setTotal4] = useState('');
  const [marg4, setMarg4] = useState('');
  const [comiss4, setComiss4] = useState('');
  const [prof4, setProf4] = useState('')
  const [profitR4, setProfitR4] = useState('')
  const [margtR4, setMargtR4] = useState('')

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
  const numeroFormatado = Intl.NumberFormat("pt-BR", {
    style: "decimal",
    maximumFractionDigits: 2
  });

  useEffect(() => {

    const bId = 2

    if (businessId) {
      loadbId(businessId)
    }

    return () => { }

  }, [])

  

  function editbussinesvalue(id) {
    navigate("/business/view/editvaluebussines/" + id)
  }
  function editypebusiness(id) {
    navigate("/business/view/edittypebusiness/" + id)
  }

  async function loadAdd(Id) {

    await api.get('/client/get/' + Id, {
      headers: {
        'Authorization': `Basic ${token}`
      }

    }).then((response) => {
      setClient(response.data)
      console.log(response.data.document)
    })

    await api.get('/client/get/add/' + Id, {
      headers: {
        'Authorization': `Basic ${token}`
      }

    }).then((response) => {
      setRua(response.data.street)
      setBairro(response.data.neighborhood)
      setCep(response.data.postcode)
      setEstado(response.data.state)
      setCidade(response.data.city)
    })

  }

  function salvar(t) {
    console.log(t)
  }

  function editPessoa(id) {
    navigate("/customers/edit/" + id)
    console.log(id)
  }
  function editProduto(id) {
    navigate('/business/view/editproduct/' + id)
  }
  function editShare(id) {
    navigate('/business/view/editshare/' + id)
  }

  async function loadbId(id) {
   await api.get('/business/get/' + id, {
      headers: {
        'Authorization': `Basic ${token}`
      }

    }).then((response) => {
      console.log("abriu a tela")

      console.log(response)
      
      setName(response.data["Client.fantasy"])
      setStatus(response.data.situation)
      setNumberP(response.data.number)
      setDonoN(response.data['User.name'])
      //formatt(new Date(response.data.updatedAt),'dd/MM/yyyy')
      setModificadoD(format(new Date(response.data.updatedAt), 'dd/MM/yyyy'))
      setTipoPessoa(response.data['Client.tipo'])
      setDocumento(response.data['Client.document'])
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
      setValor(formatter.format(response.data.amount))
      loadAdd(response.data.ClientId)
      setConsumo(response.data.avgconsumption)
      setGeracaoSu(response.data.suggestedGeneration)
      setPrecoKit(response.data.kitprice)
      setProjeto(response.data.project)
      setImposto(response.data.tax)
      setMontagem(response.data.assembled)
      setComissaoVe(response.data.sellercomission)
      setMargem(response.data.margin)
      setTotalLu(response.data.amountcost)
      setMargemCa(response.data.marginCalculate)
      setValorTotal(response.data.amount)
      setValorComissao(response.data.valuesellercomission)
      setLucroProjeto(response.data.profit)
      setLucroReal(response.data.realProfit)
      setcomplemento(response.data.complement)
      setBusiness(response.data.shares)
      setClientId(response.data.ClientId)
      setProducts(response.data.products)
      setGeracaoDesejada(response.data.suggestedDesired)
      setCip(response.data.cip)
      setBandeira(response.data.flag)
      setTotal2(response.data.total2);
      setMarg2(response.data.marg2)
      setComiss2(response.data.comiss2)
      setProf2(response.data.prof2)
      setProfitR2(response.data.profitR2)
      setMargR2(response.data.margR2)
      setTotal4(response.data.total4)
      setMarg4(response.data.marg4)
      setComiss4(response.data.comiss4)
      setProf4(response.data.prof4)
      setProfitR4(response.data.profitR4)
      setMargtR4(response.data.margtR4)

    }).catch((error) => { console.log(error) })

  }

  function updateDimensionamento(businessId) {

    navigate("/business/editDimens/" + businessId)

  }

  function hanndlerChangeSituation() {
  }
  async function createreport(id){

    navigate('/business/report/' + businessId)
    }

  return (
    <div className="home ">
      <Navbar />
      <div
        className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}
      >
        <Sidebar activeButtonBusiness="active" />
        <div className='container '>
          <div className="container-fluid bg-home primeiraDivHome">
            <div class="p-3 mb-3 bg-white border rounded-3 container " >
              <h5 className="pb-3">Resumo</h5>

              <div className="row topResume">
                <div className="col-lg-4 card-mateus rounded-3">
                  <h6 class="card-content-title mb-3 fw-semibold">  Status  </h6>

                  <span className="badge rounded-pill text-bg-lightblue text-primary">{status}
                    <button onClick={hanndlerChangeSituation}
                      className="btn btn-light btn-sm text-primary " data-bs-toggle="modal" data-bs-target="#modalTypeSituation">
                      <BsFillPencilFill /></button> </span>

                  <EditSituationBusiness setStatus={setStatus} situation={status} businessId={businessId} uc=" o rateio"  />

                </div>

                <div className="col-lg-4 card-mateus rounded-3">
                  <h6 class="card-content-title mb-3 fw-semibold">Nº da proposta </h6>
                 

                  <label> {numberP}</label>
                  <button onClick={ ()=>{createreport()}}
                      className="btn btn-light btn-sm text-primary " >
                      <BsPrinter/></button> 

                </div>

                <div className="col-lg-4 card-mateus rounded-3">
                  <h6 class="card-content-title mb-3 fw-semibold">Orçamento </h6>

                  <label> {valor} </label>
                </div>
                <div className="col-lg-4 card-mateus rounded-3">
                  <h6 class="card-content-title mb-3 fw-semibold"> Contato </h6>

                  <label>{name} </label>
                </div>
                <div className="col-lg-4 card-mateus rounded-3">
                  <h6 class="card-content-title mb-3 fw-semibold">Dono do negócio </h6>

                  <label> {donoN} </label>

                </div>

              </div>
            </div>
          </div>

          <div className="container-fluid bg-home  ">
            <div class="p-3 mb-3 bg-white border rounded-3 table-container  " >
              <h5 className="pb-3">Detalhes do negócio</h5>

              <br></br>

              <div className='conteinerCards'>

                <div className='cards border rounded-3'>
                  <div className='card-title'>
                    <h6 class="card-content-title mb-3 fw-semibold">Informações básicas</h6>
                    <button
                      type="button"
                      className="btn btn-light btn-sm text-primary d-flex align-items-center" onClick={() => {
                        editPessoa(ClientId)
                      }}
                    >
                      <BsPencilFill />
                    </button>

                  </div>

                  <EditPersonalData client={client} uc="Cliente" onEnd={salvar} />

                  <table className='table_view'>
                    <tr className='linhabaixo tamanho-tr'>
                      Criado/Modificado em:
                      <td>
                      </td>
                      <td >
                        <label> {modificadoD} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Nome:
                      <td>
                      </td>
                      <td>
                        <label>{name} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Tipo de pessoa:
                      <td>
                      </td>
                      <td>
                        <label> {tipoPessoa} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      CPF/CNPJ:
                      <td>
                      </td>
                      <td>
                        <label> {documento} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Telefone:
                      <td>
                      </td>
                      <td >
                        <label> {telefone} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      WhatsApp:
                      <td>
                      </td>
                      <td>
                        <label> {zap} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Email:
                      <td>
                      </td>
                      <td>
                        <label> {email} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Inf. Adicionais
                      <td>
                      </td>
                      <td>
                        <label> {infAdc} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Rua:
                      <td>
                      </td>
                      <td>
                        <label> {rua} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Bairro:
                      <td>
                      </td>
                      <td>
                        <label> {bairro} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      CEP:
                      <td>
                      </td>
                      <td>
                        <label> {cep} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Estado:
                      <td>
                      </td>
                      <td>
                        <label> {estado} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Cidade:
                      <td>
                      </td>
                      <td>
                        <label> {cidade} </label>
                      </td>
                    </tr>


                  </table>

                </div>

                <div className='cards border rounded-3'>
                  <div className='card-title'>
                    <h6 class="card-content-title mb-3 fw-semibold">Valores da proposta</h6>
                    <button type="button" className="btn btn-light btn-sm text-primary d-flex align-items-center" onClick={() => {
                      editbussinesvalue(businessId)

                    }}>
                      <BsFillPencilFill />
                    </button>
                  </div>
                  <table className='table_view'>
                    <tr className='linhabaixo tamanho-tr'>
                      Consumo (kWh):
                      <td>
                      </td>
                      <td className='alinhaDireita'>
                        <label> {consumo} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Geração sugerida (kWh):
                      <td>
                      </td>
                      <td className='alinhaDireita'>
                        <label > {geracaoSu} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Geração desejada (kWh):
                      <td>
                      </td>
                      <td className='alinhaDireita'>
                        <label>{geracaoDesejada} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Preço do kit (R$):
                      <td>
                      </td>
                      <td className='alinhaDireita'>
                        <label> {formatter.format(precoKit)} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Comissão do vendedor (%):
                      <td>
                      </td>
                      <td className='alinhaDireita'>

                        <label> {numeroFormatado.format(comissaoVe) + ' %'} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Valor da comissão (R$):
                      <td>
                      </td>
                      <td className='alinhaDireita'>
                        <label> {formatter.format(valorComissao)}  </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Total de Custo (R$):
                      <td>
                      </td>
                      <td className='alinhaDireita'>
                        <label> {formatter.format(totalLu)} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Valor total do projeto (R$):
                      <td>
                      </td>
                      <td className='alinhaDireita'>
                        <label> {formatter.format(valorTotal)} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Tipo de sistema:
                      <td>
                      </td>
                      <td>
                        <label>{tipoSistema} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Potência do painel (kWh):
                      <td>
                      </td>
                      <td className='alinhaDireita'>
                        <label>{painelP} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Número de placas (Und):
                      <td>
                      </td>
                      <td className='alinhaDireita'>
                        <label>{numeroP} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Média mensal (kWh):
                      <td>
                      </td>
                      <td className='alinhaDireita'>
                        <label>{media} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Potência do sistema (kWh):
                      <td>
                      </td>
                      <td className='alinhaDireita'>
                        <label>{numeroFormatado.format(potenciaS)} </label>
                      </td>
                    </tr>

                    <tr className='linhabaixo tamanho-tr'>
                      CIP (R$):
                      <td>
                      </td>
                      <td className='alinhaDireita'>
                        <label> {formatter.format(cip)} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Bandeira (R$):
                      <td>
                      </td>
                      <td className='alinhaDireita'>
                        <label>{formatter.format(bandeira)} </label>
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
                    <button type="button" className="btn btn-light btn-sm text-primary d-flex align-items-center" onClick={() => { updateDimensionamento(businessId) }}>


                      <BsFillPencilFill />
                    </button>
                  </div>

                  <table className='table_view'>
                    <tr className='linhabaixo tamanho-tr'>
                      Cliente:
                      <td>
                      </td>
                      <td >
                        <label>{name} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Usuário:
                      <td>
                      </td>
                      <td>
                        <label> {donoN} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Fator Solar:
                      <td>
                      </td>
                      <td className='alinhaDireita'>
                        <label> {fatorS} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Tipo de Telhado:
                      <td>
                      </td>
                      <td>
                        <label> {telhado} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Tipo de Ligação:
                      <td>
                      </td>
                      <td>
                        <label> {tipoL} </label>
                      </td>
                    </tr>

                    <tr className='linhabaixo tamanho-tr'>
                      Modalidade:
                      <td>
                      </td>
                      <td>
                        <label> {modalidade} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Grupo:
                      <td>
                      </td>
                      <td>
                        <label> {grupo} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      SubGrupo:
                      <td>
                      </td>
                      <td>
                        <label> {subgrupo} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Demanda fora ponta (kWh):
                      <td>
                      </td>
                      <td className='alinhaDireita'>
                        <label> {demandaFp} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Energia fora ponta (kWh):
                      <td>
                      </td>
                      <td className='alinhaDireita'>
                        <label> {energiaFp} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Demanda ponta (kWh):
                      <td>
                      </td>
                      <td className='alinhaDireita'>
                        <label> {demandaP} </label>
                      </td>
                    </tr>
                    <tr className='linhabaixo tamanho-tr'>
                      Energia ponta (Kwh):
                      <td>
                      </td>
                      <td className='alinhaDireita'>
                        <label> {energiaP} </label>
                      </td>
                    </tr>

                  </table>

                </div>
               

              </div>

            </div>
          </div>

          <div className="container-fluid bg-home py-4 ">
            <div class="p-3 mb-3 bg-white border rounded-3 table-container" >

              <div className='conteinerCards espaco_button'>

                <h5 className="pb-3">Produtos</h5>



              </div>

              <hr className="my-3 text-body-tertiary" />
              <div className="d-flex flex-column flex-md-row justify-content-end">
                <form className="mb-3 justify-content-end">
                  <div className="row">
                    <div className="col-md-auto">

                    </div>
                  </div>
                </form>
              </div>
              <div className="row">
                <div className="mb-3 mb-sm-0">
                  <div className="card border-light-subtle">
                    <div className="card-body">
                      <h6 className="card-title">Produtos que compoem o kit <button type="button" className="btn btn-light btn-sm text-primary d-flex align-items-center" onClick={() => {

                        editProduto(businessId)
                      }}>
                        <BsFillPencilFill />
                      </button>
                      </h6>
                      <div className="table-responsive">
                        <table className="table caption-top table-sm">
                          <thead>
                            <tr>
                              <th scope="col" >Tipo</th>
                              <th scope="col" >Marca</th>
                              <th scope="col" >Modelo</th>
                              <th scope="col" className='alinhaDireita' >Potência</th>
                              <th scope="col" className='alinhaDireita'>Quantidade</th>

                              <th scope="col"></th>
                            </tr>
                          </thead>

                          <tbody>

                            {products ? products.map((item) => {
                              return (
                                <tr key={item.id}>


                                  <td>{item.type === 'P' ? "Placa" : item.type === "M" ? "MicroInversor" : "Inversor"}</td>
                                  <td>{item.brand}</td>
                                  <td>{item.model}</td>
                                  <td className='alinhaDireita'>{item.power}</td>
                                  <td className='alinhaDireita'>{item.qtd}</td>

                                  <td>
                                    <div className="d-flex gap-2 justify-content-end">

                                    </div>
                                  </td>
                                </tr>
                              );
                            }) : ''}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="container-fluid bg-home py-4 ">
            <div class="p-3 mb-3 bg-white border rounded-3 table-container" >

              <div className='conteinerCards espaco_button'>

                <h5 className="pb-3">Rateio</h5>


              </div>

              <hr className="my-3 text-body-tertiary" />
              <div className="d-flex flex-column flex-md-row justify-content-end">
                <form className="mb-3 justify-content-end">
                  <div className="row">
                    <div className="col-md-auto">

                    </div>
                  </div>
                </form>
              </div>
              <div className="row">
                <div className="mb-3 mb-sm-0">
                  <div className="card border-light-subtle">
                    <div className="card-body">
                      <h6 className="card-title">Informações da geradora

                        <button type="button" className="btn btn-light btn-sm text-primary d-flex align-items-center" onClick={() => {

                          editShare(businessId)
                        }}>
                          <BsFillPencilFill />
                        </button> </h6>
                      <div className="table-responsive">
                        <table className="table caption-top table-sm">
                          <thead>
                            <tr>
                              <th scope="col">Modalidade</th>
                              <th scope="col">Grupo</th>
                              <th scope="col">SubGrupo</th>
                              <th scope="col" className='alinhadaDireita' >Consumo</th>
                              <th scope="col" className='alinhadaDireita'>G.Sugerida</th>
                              <th scope="col" className='alinhadaDireita'>C.I.P</th>
                              <th scope="col" className='alinhadaDireita'>Dem. F. Ponta </th>
                              <th scope="col" className='alinhadaDireita'>Ener. F. Ponta</th>
                              <th scope="col" className='alinhadaDireita'>Dem. Ponta</th>
                              <th scope="col" className='alinhadaDireita'>Ener. Ponta</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>

                          <tbody>
                            {business.map((item) => {
                              return (
                                <tr key={item.id}>
                                  <td>{item.modality}</td>
                                  <td>{item.group}</td>
                                  <td>{item.subgroup}</td>
                                  <td className='alinhaDireita'>{item.avgconsumption}</td>
                                  <td className='alinhaDireita'>{item.suggestedGeneration}</td>
                                  <td className='alinhaDireita'>{formatter.format(item.CIP)}</td>
                                  <td className='alinhaDireita'>{item.demandaFP}</td>
                                  <td className='alinhaDireita'>{item.energiaFP}</td>
                                  <td className='alinhaDireita'>{item.demandaP}</td>
                                  <td className='alinhaDireita'>{item.energiaP}</td>
                                  <td>
                                    <div className="d-flex gap-2 justify-content-end">
                                     
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
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
