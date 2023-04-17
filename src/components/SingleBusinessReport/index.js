import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import SolarSystemDescription from "../SolarSystemDescription";
import GenerationAndPrice from "../GenerationAndPrice";
import AnnualVariation from "../AnnualVariation";
import bgReport from "../../assets/img/teto-solar-visual-signature.png";
import tetoSolarInfographic from "../../assets/img/teto-solar-infographic.png";
import {
  BsArrowRight,
  BsFillCheckCircleFill,
  BsFillPencilFill,
  BsFillPrinterFill,
  BsFillStarFill,
  BsFillXCircleFill,
} from "react-icons/bs";

import "./single-business-report.scss";

const data = [
  { name: "Group A", value: 8 },
  { name: "Group B", value: 84 },
  { name: "Group C", value: 5 },
  { name: "Group D", value: 3 },
];

const COLORS = ["#1b6b9d", "#198754", "#ffc107", "#dc3545"];

const renderCustomizedLabel = ({ percent }) => {
  return `${(percent * 100).toFixed(0)}%`;
};

export default function SingleBusinessReport() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
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
                        <td>202303129</td>
                        <td>237,60 kWp</td>
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
                <div className="card border-light-subtle">
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
                <div className="card border-light-subtle">
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
                <div className="card border-light-subtle">
                  <div class="card-header report-card-bg text-light border-0">
                    Estimativa de Geração Inversor X Microinversor
                  </div>
                  <div className="card-body">
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Otto</td>
                            <td>@mdo</td>
                          </tr>
                          <tr>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
                          <tr>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
                          <tr>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
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
                <div className="card border-light-subtle">
                  <div class="card-header report-card-bg text-light border-0">
                    Estimativa de Geração Inversor X Microinversor
                  </div>
                  <div className="card-body">
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Otto</td>
                            <td>@mdo</td>
                          </tr>
                          <tr>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
                          <tr>
                            <td>Thornton</td>
                            <td>@fat</td>
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
                <div className="card border-light-subtle">
                  <div class="card-header report-card-bg text-light border-0">
                    Estimativa de Geração Inversor X Microinversor
                  </div>
                  <div className="card-body">
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Otto</td>
                            <td>@mdo</td>
                          </tr>
                          <tr>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
                          <tr>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
                          <tr>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
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
                <div className="card border-light-subtle">
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
                <div className="card border-light-subtle">
                  <div class="card-header report-card-bg text-light border-0">
                    Valor do Investimento: <span>{`R$ 898.600,00`}</span>
                  </div>
                  <div className="card-body">
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Otto</td>
                            <td>@mdo</td>
                          </tr>
                          <tr>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
                          <tr>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
                          <tr>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
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
              Pagamento à vista (sugestão)
            </h4>
          </div>
          <div className="d-flex justify-content-center">
            <div className="row mb-3 report-print-width report-cards">
              <div className="col mb-3 mb-lg-0">
                <div className="card border-light-subtle">
                  <div class="card-header report-card-bg text-light border-0">
                    Valor do Investimento: <span>{`R$ 898.600,00`}</span>
                  </div>
                  <div className="card-body">
                    <div class="table-responsive">
                      <table class="table">
                        <tbody>
                          <tr>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                          </tr>
                          <tr>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@mdo</td>
                          </tr>
                          <tr>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@mdo</td>
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
          <div className="mt-4 d-flex flex-column align-items-center">
            <h4 className="fw-semibold text-primary text-center">Economia</h4>
          </div>

          <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="row my-2 report-print-width report-cards">
              <h6>2023</h6>
              <div className="col-lg-4 col-sm-6 mb-3 mb-lg-0">
                <div className="card border-light-subtle">
                  <div class="card-header report-card-bg text-light border-0">
                    ENEL
                  </div>
                  <div className="card-body py-4">
                    <h6 className="fw-bold">Fatura mensal</h6>
                    <p className="mb-0">{`R$ 19.907,59`}</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-sm-6 mb-3 mb-lg-0">
                <div className="card border-light-subtle">
                  <div class="card-header report-card-bg text-light border-0">
                    TETO SOLAR
                  </div>
                  <div className="card-body py-4">
                    <h6 className="fw-bold">Fatura mensal</h6>
                    <p className="mb-0">{`R$ 2.662,89`}</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 mb-3 mb-lg-0">
                <div className="card border-light-subtle">
                  <div class="card-header report-card-bg-yellow text-light border-0">
                    ECONOMIA
                  </div>
                  <div className="card-body py-4">
                    <h6 className="fw-bold">Sua economia mensal</h6>
                    <p className="mb-0">{`R$ 16.996,00`}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row my-2 report-print-width report-cards">
              <h6>2024</h6>
              <div className="col-lg-4 col-sm-6 mb-3 mb-lg-0">
                <div className="card border-light-subtle">
                  <div class="card-header report-card-bg text-light border-0">
                    ENEL
                  </div>
                  <div className="card-body py-4">
                    <h6 className="fw-bold">Fatura mensal</h6>
                    <p className="mb-0">{`R$ 19.907,59`}</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-sm-6 mb-3 mb-lg-0">
                <div className="card border-light-subtle">
                  <div class="card-header report-card-bg text-light border-0">
                    TETO SOLAR
                  </div>
                  <div className="card-body py-4">
                    <h6 className="fw-bold">Fatura mensal</h6>
                    <p className="mb-0">{`R$ 2.662,89`}</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 mb-3 mb-lg-0">
                <div className="card border-light-subtle">
                  <div class="card-header report-card-bg-yellow text-light border-0">
                    ECONOMIA
                  </div>
                  <div className="card-body py-4">
                    <h6 className="fw-bold">Sua economia mensal</h6>
                    <p className="mb-0">{`R$ 16.996,00`}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row my-2 report-print-width report-cards">
              <h6>2025</h6>
              <div className="col-lg-4 col-sm-6 mb-3 mb-lg-0">
                <div className="card border-light-subtle">
                  <div class="card-header report-card-bg text-light border-0">
                    ENEL
                  </div>
                  <div className="card-body py-4">
                    <h6 className="fw-bold">Fatura mensal</h6>
                    <p className="mb-0">{`R$ 19.907,59`}</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-sm-6 mb-3 mb-lg-0">
                <div className="card border-light-subtle">
                  <div class="card-header report-card-bg text-light border-0">
                    TETO SOLAR
                  </div>
                  <div className="card-body py-4">
                    <h6 className="fw-bold">Fatura mensal</h6>
                    <p className="mb-0">{`R$ 2.662,89`}</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 mb-3 mb-lg-0">
                <div className="card border-light-subtle">
                  <div class="card-header report-card-bg-yellow text-light border-0">
                    ECONOMIA
                  </div>
                  <div className="card-body py-4">
                    <h6 className="fw-bold">Sua economia mensal</h6>
                    <p className="mb-0">{`R$ 16.996,00`}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row my-2 report-print-width report-cards">
              <h6>2026</h6>
              <div className="col-lg-4 col-sm-6 mb-3 mb-lg-0">
                <div className="card border-light-subtle">
                  <div class="card-header report-card-bg text-light border-0">
                    ENEL
                  </div>
                  <div className="card-body py-4">
                    <h6 className="fw-bold">Fatura mensal</h6>
                    <p className="mb-0">{`R$ 19.907,59`}</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-sm-6 mb-3 mb-lg-0">
                <div className="card border-light-subtle">
                  <div class="card-header report-card-bg text-light border-0">
                    TETO SOLAR
                  </div>
                  <div className="card-body py-4">
                    <h6 className="fw-bold">Fatura mensal</h6>
                    <p className="mb-0">{`R$ 2.662,89`}</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 mb-3 mb-lg-0">
                <div className="card border-light-subtle">
                  <div class="card-header report-card-bg-yellow text-light border-0">
                    ECONOMIA
                  </div>
                  <div className="card-body py-4">
                    <h6 className="fw-bold">Sua economia mensal</h6>
                    <p className="mb-0">{`R$ 16.996,00`}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row my-2 report-print-width report-cards">
              <h6>2027</h6>
              <div className="col-lg-4 col-sm-6 mb-3 mb-lg-0">
                <div className="card border-light-subtle">
                  <div class="card-header report-card-bg text-light border-0">
                    ENEL
                  </div>
                  <div className="card-body py-4">
                    <h6 className="fw-bold">Fatura mensal</h6>
                    <p className="mb-0">{`R$ 19.907,59`}</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-sm-6 mb-3 mb-lg-0">
                <div className="card border-light-subtle">
                  <div class="card-header report-card-bg text-light border-0">
                    TETO SOLAR
                  </div>
                  <div className="card-body py-4">
                    <h6 className="fw-bold">Fatura mensal</h6>
                    <p className="mb-0">{`R$ 2.662,89`}</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 mb-3 mb-lg-0">
                <div className="card border-light-subtle">
                  <div class="card-header report-card-bg-yellow text-light border-0">
                    ECONOMIA
                  </div>
                  <div className="card-body py-4">
                    <h6 className="fw-bold">Sua economia mensal</h6>
                    <p className="mb-0">{`R$ 16.996,00`}</p>
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
            <h4 className="fw-semibold text-primary text-center mt-4">
              Financiamento
            </h4>
          </div>
          <div className="d-flex justify-content-center">
            <div className="row my-4 report-print-width report-cards">
              <div className="col-lg-6 mb-3 mb-lg-0">
                <div className="card border-light-subtle">
                  <div className="card-body py-4">
                    <p>Itens inclusos</p>
                    <div className="d-flex align-items-start gap-3 mb-4">
                      <BsFillCheckCircleFill className="fs-4 report-icon-star text-success" />
                      <div>
                        <h6 className="fw-bold">Sustentabilidade</h6>
                        <p className="mb-0">
                          Energia limpa, ambiente amigável.
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start gap-3 mb-4">
                      <BsFillCheckCircleFill className="fs-4 report-icon-star text-success" />
                      <div>
                        <h6 className="fw-bold">Renovável</h6>
                        <p className="mb-0">
                          Energia abundante, acessível e inesgotável.
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start gap-3 mb-4">
                      <BsFillCheckCircleFill className="fs-4 report-icon-star text-success" />
                      <div>
                        <h6 className="fw-bold">Retorno de investimento</h6>
                        <p className="mb-0">
                          Garantia de retorno de iinvestimento.
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start gap-3">
                      <BsFillCheckCircleFill className="fs-4 report-icon-star text-success" />
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
                <div className="card border-light-subtle">
                  <div className="card-body py-4">
                    <p>Itens não inclusos</p>
                    <div className="d-flex align-items-start gap-3 mb-4">
                      <BsFillXCircleFill className="fs-4 report-icon-star text-danger" />
                      <div>
                        <h6 className="fw-bold">Baixo custo de manutenção</h6>
                        <p className="mb-0">
                          Sistemas fotovoltaicos demandam baixa manutenção.
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start gap-3 mb-4">
                      <BsFillXCircleFill className="fs-4 report-icon-star text-danger" />
                      <div>
                        <h6 className="fw-bold">Economia</h6>
                        <p className="mb-0">
                          Economia de até 95% da conta de energia.
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start gap-3 mb-4">
                      <BsFillXCircleFill className="fs-4 report-icon-star text-danger" />
                      <div>
                        <h6 className="fw-bold">Otimização do espaço</h6>
                        <p className="mb-0">Instalações simples e rápidas.</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start gap-3">
                      <BsFillXCircleFill className="fs-4 report-icon-star text-danger" />
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
      </article>
    </div>
  );
}
