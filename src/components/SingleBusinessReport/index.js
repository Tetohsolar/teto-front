import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import AnnualVariation from "../AnnualVariation";
import bgReport from "../../assets/img/teto-solar-visual-signature.png";
import tetoSolarInfographic from "../../assets/img/teto-solar-infographic.png";
import {
  BsFillCheckCircleFill,
  BsFillPrinterFill,
  BsFillStarFill,
  BsFillXCircleFill,
} from "react-icons/bs";

import "./single-business-report.scss";
import { useEffect } from "react";
import { useState } from 'react';
import { useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import { format } from 'date-fns';
import api from "../../api";
import { useNavigate, useParams } from "react-router";




const proposta = "202303129";
const inversor = "237,60 kWp";
const cidade = "Caucaia";

const detalhesSistemaSolarData = [
  { id: 15465, name: "Painel solar J.A. 550W", value: 432 },
  { id: 14656, name: " Inversor Growatt MAC 60KTL3-X LV", value: 3 },
  { id: 15588, name: "Estrutura para Estrutura em Solo", value: "Incluso" },
  { id: 16565, name: "Geração média mensal (1ºano)", value: "30.015 kWh" },
];

const caracteristicasData = [
  { id: 26449, name: "Área necessária", value: "689 m²" },
  { id: 24654, name: " Peso do sistema", value: "11.880 kg" },
  { id: 25616, name: "Porc. atendida", value: "91%" },
];

const garantiasData = [
  { id: 36584, name: "Painel Solar (eficiência)", value: "25 anos" },
  { id: 35848, name: "Painel Solar (defeitos)", value: "12 anos" },
  { id: 39494, name: "Inversor", value: "10 anos" },
  { id: 33649, name: "Instalação", value: "1 ano" },
];

const indicadoresFinanceirosData = [
  { id: 45166, name: "Caixa Acum.", value: "R$ 59.817.265,54" },
  { id: 48499, name: "V.P.L.", value: "R$ 1.711.892,79" },
  { id: 44848, name: "T.I.R.", value: "27%" },
  { id: 48484, name: "PayBack", value: "4 anos e 1 Meses" },
];


const economiaData = [
  {
    id: 56565,
    ano: "2023",
    id: 56546,
    enel: "R$ 19.907,59",
    id: 58554,
    tetoSolar: "R$ 2.662,89",
    id: 50515,
    economia: "R$ 16.996,00",
  },
  {
    id: 56546,
    ano: "2024",
    id: 55110,
    enel: "R$ 20.902,97",
    id: 50654,
    tetoSolar: "R$ 2.931,85",
    id: 50487,
    economia: "R$ 17.722,41",
  },
  {
    id: 50640,
    ano: "2025",
    id: 50708,
    enel: "R$ 21.948,12",
    id: 50571,
    tetoSolar: "R$ 3.221,06",
    id: 51817,
    economia: "R$ 18.478,36",
  },
  {
    id: 58745,
    ano: "2026",
    id: 51978,
    enel: "R$ 23.045,52",
    id: 51989,
    tetoSolar: "R$ 3.531,84",
    id: 50564,
    economia: "R$ 19.264,99",
  },
  {
    id: 59789,
    ano: "2027",
    id: 50645,
    enel: "R$ 24.197,80",
    id: 50659,
    tetoSolar: "R$ 3.865,65",
    id: 509594,
    economia: "R$ 20.083,44",
  },
];

 

export default function SingleBusinessReport() {
  const componentRef = useRef();
  

  const [ClientId, setClientId] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [donoN, setDonoN] = useState('')
  const [numberP, setNumberP] = useState('')
  const { token } = useContext(AuthContext)
  
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
  const [marcaP, setMarcaP] = useState('')
  const [modeloP, setModeloP] = useState('')
  const [inversorMa, setInversorMa] = useState('')
  const [inversorMo, setInversorMo] = useState('')
  const [numeroInv, setNumeroInv] = useState('')
  const [rua, setRua] = useState('')
  const [bairro, setBairro] = useState('')
  const [cep, setCep] = useState('')
  const [estado, setEstado] = useState('')
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
  const [situation, setSituation] = useState([]);
  const [business, setBusiness] = useState([]);
  const [client, setClient] = useState([]);
  const [idSelected, setIdSelected] = useState('');
  const navigate = useNavigate();
  const[products,setProducts] = useState([]);
  const[geracaoDesejada,setGeracaoDesejada] = useState('');
  const[cip,setCip] = useState('');
  const[bandeira,setBandeira] = useState('');
  const[total2,setTotal2] = useState('');
  const[marg2,setMarg2] = useState('');
  const[comiss2,setComiss2] = useState('');
  const[prof2,setProf2] = useState ('')
  const[profitR2,setProfitR2] = useState('')
  const [margR2,setMargR2] =useState ('')
  const[total4,setTotal4] = useState('');
  const[marg4,setMarg4] = useState('');
  const[comiss4,setComiss4] = useState('');
  const[prof4,setProf4] = useState ('')
  const[profitR4,setProfitR4] = useState('')
  const [margtR4,setMargtR4] =useState ('')
  const[cidade,setCidade] = useState('')
  const [entrada80,setEntrada80] = useState ('')
  const [entrada10,setEntrada10] =useState('')
  const { reportId } = useParams();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `teto_solar_proposta_${numberP}`,
  });

  useEffect(() => {
    loadbId(reportId)
    return () => { }
  }, [])

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
  
  
  async function loadbId(id) {

    await api.get('/business/get/' + id, {
      headers: {
        'Authorization': `Basic ${token}`
      }

    }).then((response) => {
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
      setMarcaP(response.data['placa_negocio.brand'])
      setModeloP(response.data['placa_negocio.description'])
      setInversorMa(response.data['inversor_negocio.brand'])
      setInversorMo(response.data['inversor_negocio.brand'])
      setNumeroInv(response.data.numberInverMicro)
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
      setMargR2 (response.data.margR2)
      setTotal4(response.data.total4)
      setMarg4(response.data.marg4)
      setComiss4(response.data.comiss4)
      setProf4(response.data.prof4)
      setProfitR4(response.data.profitR4)
      setMargtR4(response.data.margtR4)
      let oitenta = response.data.amount * 0.8
      setEntrada80((formatter.format(oitenta)))
      let dez = response.data.amount * 0.1
      setEntrada10((formatter.format(dez)))
     
      


    }).catch((error) => { console.log(error) })

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

  

  return (
    <div className="p-3 mb-4 bg-white rounded-3 single-business-report">
      <div className="d-flex flex-column flex-sm-row justify-content-end mb-3">
        <button
          onClick={handlePrint}
          className="btn btn-primary text-light d-flex align-items-center justify-content-sm-start justify-content-center gap-3"
          type="submit"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <BsFillPrinterFill />
          Imprimir
        </button>
      </div>
      <article ref={componentRef}>
        <section className="report-section-height report-section-bg d-flex justify-content-center text-center">
          <div className="report-section-info text-white py-5">
            <div className="report-cover-image my-5">
              <img
                className="report-logo"
                src={bgReport}
                alt="Imagem de fundo do relatório"
              />
            </div>

            <div className="report-cover-data mx-2">
              <div className="p-4 bg-white rounded-3 mb-3">
                <h5 className="card-content-title mb-0 text-uppercase text-primary">
                  {name}
                </h5>
              </div>
              <div className="bg-white rounded-3 border">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Proposta</th>
                        <th scope="col">{tipoSistema}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{numberP}</td>
                        <td>{potenciaS} kWp</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="report-footer my-3">
              <p className="fs-5 fw-semibold mb-2">{cidade}</p>
              <p className="fs-5 fw-semibold">05/04/2023</p>
            </div>
          </div>
        </section>

        <section className="report-section-height">
          <div className="report-image-header py-3 fw-semibold text-center text-light">
            <span>TETO SOLAR - (88) 99228-5655</span>
          </div>
          <div className="my-4 d-flex flex-column align-items-center">
            <h4 className="fw-semibold mb-5 text-primary text-center mt-4">
              Como funciona a Energia Solar?
            </h4>
            <img
              className="teto-solar-infographic"
              src={tetoSolarInfographic}
              alt="Infográfico de casa com energia solar"
            />
          </div>
          <div className="d-flex justify-content-center">
            <div className="row my-4 report-print-width report-cards">
              <div className="col-lg-6 mb-3 mb-lg-0">
                <div className="card border-light">
                  <div className="card-body py-4">
                    <div className="d-flex align-items-start gap-3 mb-4">
                      <BsFillStarFill className="fs-4 report-icon-star text-warning" />
                      <div>
                        <h6 className="fw-bold">Sustentabilidade</h6>
                        <p className="mb-0">
                          Energia limpa, ambiente amigável.
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start gap-3 mb-4">
                      <BsFillStarFill className="fs-4 report-icon-star text-warning" />
                      <div>
                        <h6 className="fw-bold">Renovável</h6>
                        <p className="mb-0">
                          Energia abundante, acessível e inesgotável.
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start gap-3 mb-4">
                      <BsFillStarFill className="fs-4 report-icon-star text-warning" />
                      <div>
                        <h6 className="fw-bold">Retorno de investimento</h6>
                        <p className="mb-0">
                          Garantia de retorno de iinvestimento.
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start gap-3">
                      <BsFillStarFill className="fs-4 report-icon-star text-warning" />
                      <div>
                        <h6 className="fw-bold">Valorização do imóvel</h6>
                        <p className="mb-0">
                          Valorização imediata em cecrca de 8% sobre o valor do
                          imóvel.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mb-3 mb-lg-0">
                <div className="card border-light">
                  <div className="card-body py-4">
                    <div className="d-flex align-items-start gap-3 mb-4">
                      <BsFillStarFill className="fs-4 report-icon-star text-warning" />
                      <div>
                        <h6 className="fw-bold">Baixo custo de manutenção</h6>
                        <p className="mb-0">
                          Sistemas fotovoltaicos demandam baixa manutenção.
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start gap-3 mb-4">
                      <BsFillStarFill className="fs-4 report-icon-star text-warning" />
                      <div>
                        <h6 className="fw-bold">Economia</h6>
                        <p className="mb-0">
                          Economia de até 95% da conta de energia.
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start gap-3 mb-4">
                      <BsFillStarFill className="fs-4 report-icon-star text-warning" />
                      <div>
                        <h6 className="fw-bold">Otimização do espaço</h6>
                        <p className="mb-0">Instalações simples e rápidas.</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start gap-3">
                      <BsFillStarFill className="fs-4 report-icon-star text-warning" />
                      <div>
                        <h6 className="fw-bold">Durabilidade</h6>
                        <p className="mb-0">
                          Garantia de performance de 25 anos.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="report-section-height">
          <div className="report-image-header py-3 fw-semibold text-center text-light">
            <span>TETO SOLAR - (88) 99228-5655</span>
          </div>
          <div className="my-4 d-flex flex-column align-items-center">
            <h4 className="fw-semibold text-primary text-center mt-4">
              Detalhes do Sistema Solar
            </h4>
          </div>
          <div className="d-flex justify-content-center">
            <div className="row mb-3 report-print-width report-cards">
              <div className="col mb-3 mb-lg-0">
                <div className="card border-light">
                  <div class="card-header report-card-bg text-light border-0">
                    Descrição do Sistema Solar
                  </div>
                  <div className="card-body">
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">{inversor}</th>
                            <th scope="col">Quantidade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {detalhesSistemaSolarData.map((item) => {
                            return (
                              <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.value}</td>
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

          <div className="my-4 d-flex flex-column align-items-center">
            <h4 className="fw-semibold text-primary text-center">
              Características
            </h4>
          </div>
          <div className="d-flex justify-content-center">
            <div className="row mb-3 report-print-width report-cards">
              <div className="col mb-3 mb-lg-0">
                <div className="card border-light">
                  <div class="card-header report-card-bg text-light border-0">
                    Características do Sistema Solar
                  </div>
                  <div className="card-body">
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">{cidade}</th>
                            <th scope="col">Valor</th>
                          </tr>
                        </thead>
                        <tbody>
                          {caracteristicasData.map((item) => {
                            return (
                              <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.value}</td>
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
        </section>

        <section className="report-section-height">
          <div className="report-image-header py-3 fw-semibold text-center text-light">
            <span>TETO SOLAR - (88) 99228-5655</span>
          </div>
          <div className="my-4 d-flex flex-column align-items-center">
            <h4 className="fw-semibold text-primary text-center">Garantias</h4>
          </div>
          <div className="d-flex justify-content-center">
            <div className="row mb-3 report-print-width report-cards">
              <div className="col mb-3 mb-lg-0">
                <div className="card border-light">
                  <div class="card-header report-card-bg text-light border-0">
                    Garantias do Sistema Solar
                  </div>
                  <div className="card-body">
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Item</th>
                            <th scope="col">Período</th>
                          </tr>
                        </thead>
                        <tbody>
                          {garantiasData.map((item) => {
                            return (
                              <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.value}</td>
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

          <div className="my-4 d-flex flex-column align-items-center">
            <h4 className="fw-semibold text-primary text-center mt-4">
              Variação Anual
            </h4>
          </div>
          <div className="d-flex justify-content-center">
            <div className="row mb-3 report-print-width report-cards">
              <div className="col mb-3 mb-lg-0">
                <div className="card border-light">
                  <div class="card-header report-card-bg text-light border-0">
                    Estimativa de Geração Inversor X Microinversor
                  </div>
                  <div className="card-body">
                    <AnnualVariation />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="report-section-height">
          <div className="report-image-header py-3 fw-semibold text-center text-light">
            <span>TETO SOLAR - (88) 99228-5655</span>
          </div>
          <div className="my-4 d-flex flex-column align-items-center">
            <h4 className="fw-semibold text-primary text-center">
              Indicadores Financeiros
            </h4>
          </div>
          <div className="d-flex justify-content-center">
            <div className="row mb-3 report-print-width report-cards">
              <div className="col mb-3 mb-lg-0">
                <div className="card border-light">
                  <div class="card-header report-card-bg text-light border-0">
                    Valor do Investimento: <span>{valor}</span>
                  </div>
                  <div className="card-body">
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Valor</th>
                          </tr>
                        </thead>
                        <tbody>
                          {indicadoresFinanceirosData.map((item) => {
                            return (
                              <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.value}</td>
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

          <div className="mt-4 d-flex flex-column align-items-center">
            <h4 className="fw-semibold text-primary text-center">
              Pagamento à vista (sugestão)
            </h4>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="row my-2 report-print-width report-cards">
              <h6>Sugestão de paganto</h6>
              <div className="col-lg-4 col-sm-6 mb-3 mb-lg-0">
                <div className="card border-light">
                  <div class="card-header report-card-bg-yellow text-light border-0">
                    ENTRADA
                  </div>
                  <div className="card-body py-4">
                    <h3 className="fw-bold text-warning fs-1">80%</h3>
                    <p className="mb-0 fs-4">{entrada80}</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-sm-6 mb-3 mb-lg-0">
                <div className="card border-light">
                  <div class="card-header report-card-bg-yellow text-light border-0">
                    30 DIAS
                  </div>
                  <div className="card-body py-4">
                    <h3 className="fw-bold text-warning fs-1">10%</h3>
                    <p className="mb-0 fs-4">{entrada10}</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 mb-3 mb-lg-0">
                <div className="card border-light">
                  <div class="card-header report-card-bg-yellow text-light border-0">
                    60 DIAS
                  </div>
                  <div className="card-body py-4">
                    <h3 className="fw-bold text-warning fs-1">10%</h3>
                    <p className="mb-0 fs-4">{entrada10}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="report-section-height">
          <div className="report-image-header py-3 fw-semibold text-center text-light">
            <span>TETO SOLAR - (88) 99228-5655</span>
          </div>
          <div className="mt-4 d-flex flex-column align-items-center">
            <h4 className="fw-semibold text-primary text-center">Economia</h4>
          </div>

          <div className="d-flex flex-column align-items-center justify-content-center">
            {economiaData.map((item) => {
              return (
                <div
                  key={item.id}
                  className="row my-2 report-print-width report-cards"
                >
                  <h6>{item.ano}</h6>
                  <div className="col-lg-4 col-sm-6 mb-3 mb-lg-0">
                    <div className="card border-light">
                      <div class="card-header report-card-bg text-light border-0">
                        ENEL
                      </div>
                      <div className="card-body py-4">
                        <h6 className="fw-bold">Fatura mensal</h6>
                        <p className="mb-0">{item.enel}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-sm-6 mb-3 mb-lg-0">
                    <div className="card border-light">
                      <div class="card-header report-card-bg text-light border-0">
                        TETO SOLAR
                      </div>
                      <div className="card-body py-4">
                        <h6 className="fw-bold">Fatura mensal</h6>
                        <p className="mb-0">{item.tetoSolar}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 mb-3 mb-lg-0">
                    <div className="card border-light">
                      <div class="card-header report-card-bg-green text-light border-0">
                        ECONOMIA
                      </div>
                      <div className="card-body py-4">
                        <h6 className="fw-bold">Sua economia mensal</h6>
                        <p className="mb-0">{item.economia}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="report-section-height">
          <div className="report-image-header py-3 fw-semibold text-center text-light">
            <span>TETO SOLAR - (88) 99228-5655</span>
          </div>
          <div className="mt-4 d-flex flex-column align-items-center">
            <h4 className="fw-semibold text-primary text-center mt-4">
              Financiamento
            </h4>
          </div>
          <div className="d-flex justify-content-center">
            <div className="row my-4 report-print-width report-cards">
              <div className="col-lg-6 mb-3 mb-lg-0">
                <div className="card border-light">
                  <div className="card-body py-4">
                    <p className="fw-semibold">Itens inclusos</p>
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <BsFillCheckCircleFill className="fs-4 report-icon-star text-success" />
                      <div>
                        <p className="mb-0">
                          Projeto da instalação, incluindo informações sobre os
                          esforços do sistema sobre a estrutura do imóvel.
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <BsFillCheckCircleFill className="fs-4 report-icon-star text-success" />
                      <div>
                        <p className="mb-0">
                          Painéis fotovoltaicos, inversores ou microinversores,
                          dispositivos de proteção e quadros de conexão.
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <BsFillCheckCircleFill className="fs-4 report-icon-star text-success" />
                      <div>
                        <p className="mb-0">
                          suportes para painéis fotovoltaicos, para instalação
                          no telhado
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <BsFillCheckCircleFill className="fs-4 report-icon-star text-success" />
                      <div>
                        <p className="mb-0">
                          Suporte técnico para o processo de conexão à rede
                          junto à concessionária.
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <BsFillCheckCircleFill className="fs-4 report-icon-star text-success" />
                      <div>
                        <p className="mb-0">
                          Manual de instalação, operação e manutenção
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <BsFillCheckCircleFill className="fs-4 report-icon-star text-success" />
                      <div>
                        <p className="mb-0">
                          Transporte do material até o local da instalação.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mb-3 mb-lg-0">
                <div className="card border-light">
                  <div className="card-body py-4">
                    <p className="fw-semibold">Itens não inclusos</p>
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <BsFillXCircleFill className="fs-4 report-icon-star text-danger" />
                      <div>
                        <p className="mb-0">
                          Possíveis adequações necessárias ao peso dos
                          equipamentos, incluindo-se a construção de bases no
                          terreno.
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <BsFillXCircleFill className="fs-4 report-icon-star text-danger" />
                      <div>
                        <p className="mb-0">
                          Adequação das instalações existentes para os
                          requisitos da concessionária.
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <BsFillXCircleFill className="fs-4 report-icon-star text-danger" />
                      <div>
                        <p className="mb-0">
                          Sistema de Para-raios e aterramentos, mesmo que
                          adequação de sistemas exixtentes.
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <BsFillXCircleFill className="fs-4 report-icon-star text-danger" />
                      <div>
                        <p className="mb-0">
                          Licenças ambientais, se necessáio.
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <BsFillXCircleFill className="fs-4 report-icon-star text-danger" />
                      <div>
                        <p className="mb-0">
                          Quaisquer outros itens não mencionados claramente
                          nesta proposta.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
