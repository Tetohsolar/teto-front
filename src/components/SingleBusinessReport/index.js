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

const pagamentoData = {
  value1: "R$ 718.880,00",
  value2: "R$ 89.860,00",
  value3: "R$ 89.860,00",
};

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
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `teto_solar_proposta_${proposta}`,
  });

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
                  Ass. de Pesquisa e Pres. de Ecos. Aquático
                </h5>
              </div>
              <div className="bg-white rounded-3 border">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Proposta</th>
                        <th scope="col">Inversor</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{proposta}</td>
                        <td>{inversor}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="report-footer my-3">
              <p className="fs-5 fw-semibold mb-2">Caucaia-CE</p>
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
                    Valor do Investimento: <span>{`R$ 898.600,00`}</span>
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
                    <p className="mb-0 fs-4">{pagamentoData.value1}</p>
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
                    <p className="mb-0 fs-4">{pagamentoData.value2}</p>
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
                    <p className="mb-0 fs-4">{pagamentoData.value3}</p>
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
