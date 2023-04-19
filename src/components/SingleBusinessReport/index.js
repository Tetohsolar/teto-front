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


const garantiasData = [
  { id: 36584, name: "Painel Solar (eficiência)", value: "25 anos" },
  { id: 35848, name: "Painel Solar (defeitos)", value: "12 anos" },
  { id: 39494, name: "Inversor", value: "10 anos" },
  { id: 33649, name: "Instalação", value: "1 ano" },
];


export default function SingleBusinessReport() {
  const componentRef = useRef();
  
  const [name, setName] = useState('')
  const [numberP, setNumberP] = useState('')
  const { token } = useContext(AuthContext)
  const [tipoSistema, setTipoSistema] = useState('')
  const [potenciaS, setPotenciaS] = useState('')
  const [valor, setValor] = useState('')
  const[cidade,setCidade] = useState('')
  const [entrada80,setEntrada80] = useState ('')
  const [entrada10,setEntrada10] =useState('')
  const { reportId } = useParams();
  const [produto, setProduto] = useState ([])
  const [economia, setEconomia] =useState([])
  const [areaInversor,setAreaInversor] = useState([])
  const [pesoSistema, setPesoSistema] = useState([])
  const [porcAtendida,setPorcAtendida] = useState([])
  const [caixaAcumulado, setCaixaAcumulado] = useState([])
  const [vpl,setVpl] = useState([])
  const [payback, setPayback] = useState([])
  const [tir,setTir] = useState([])
  const [caixaAcumulado1,setCaixaAcumulado1] = useState([])
  const[caixaAcumulado2,setCaixaAcumulado2] = useState([])

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `teto_solar_proposta_${numberP}`,
  });
  const numeroFormatado = Intl.NumberFormat("pt-BR", {
    style: "decimal",
    maximumFractionDigits: 2
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
      setNumberP(response.data.number)
      //formatt(new Date(response.data.updatedAt),'dd/MM/yyyy')
      setTipoSistema(response.data.type)
      setPotenciaS(response.data.systempower)
      setValor(formatter.format(response.data.amount))
      loadAdd(response.data.ClientId)
      let oitenta = response.data.amount * 0.8
      setEntrada80((formatter.format(oitenta)))
      let dez = response.data.amount * 0.1
      setEntrada10((formatter.format(dez)))
      setProduto(response.data.products)
      setEconomia(response.data.economia)
      setAreaInversor(numeroFormatado.format(response.data.areainversor))
      setPesoSistema (numeroFormatado.format(response.data.pesosistema))
      setPorcAtendida(numeroFormatado.format(response.data.porctendida))
      setCaixaAcumulado(response.data.caixaAcumulado)
      setVpl(formatter.format(response.data.vpl))
      setPayback(response.data.payback)
      setTir(numeroFormatado.format(response.data.tir))
      caixaAcumulado1(response.data.caixaAcumuladoI)
      caixaAcumulado(response.data.caixaAcumuladoM)

    
    }).catch((error) => { console.log(error) })

  }

  async function loadAdd(Id) {

    await api.get('/client/get/' + Id, {
      headers: {
        'Authorization': `Basic ${token}`
      }

    }).then((response) => {
      
     
    })

    await api.get('/client/get/add/' + Id, {
      headers: {
        'Authorization': `Basic ${token}`
      }

    }).then((response) => {
     
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
                            <th scope="col">{tipoSistema}</th>
                            <th scope="col">Quantidade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {produto.map((item) => {
                            return (
                              <tr key={item.id}>
                                <td> {item.brand + '-'  + item.model}</td>
                                <td>{item.qtd}</td>
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
                          <tr>
                            <td>Area necessária</td>
                            <td>{areaInversor} m²</td>
                          </tr>
                          <tr>
                            <td>Peso do sistema</td>
                            <td>{pesoSistema} Kg</td>
                          </tr><tr>
                            <td>Porc. atendida </td>
                            <td>{porcAtendida} %</td>
                          </tr>
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
                        <tr>
                            <td>Caixa Acum.</td>
                            
                            <td>{caixaAcumulado==="Inversor"? caixaAcumulado1:caixaAcumulado2}</td>
                          </tr>
                          <tr>
                            <td>V.P.L</td>
                            <td>{vpl}</td>
                          </tr>
                          <tr>
                            <td>T.I.R</td>
                            <td>{tir} %</td>
                          </tr>
                          <tr>
                            <td>Payback</td>
                            <td>{payback}</td>
                          </tr>
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
            {economia.map((item) => {
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
                        <h6 className="fw-bold">Fatura anual</h6>
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
                        <h6 className="fw-bold">Fatura anual</h6>
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
                        <h6 className="fw-bold">Sua economia anual</h6>

                        <p className="mb-0">{ tipoSistema==="Inversor"? item.economiaIn:item.economiaM}</p>
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
