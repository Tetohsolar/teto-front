import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import SolarSystemDescription from "../SolarSystemDescription";
import GenerationAndPrice from "../GenerationAndPrice";
import AnnualVariation from "../AnnualVariation";
import bgReport from "../../assets/img/teto-solar-visual-signature.png";
import reportHouseIlustration from "../../assets/img/report-house-illustration.png";
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
      content: ()=> componentRef.current,
      documentTitle:"emp-data",
    }
  )

  return (
    <div className="p-3 mb-4 bg-white rounded-3 single-business-report">
      <div className="d-flex flex-column flex-sm-row justify-content-end mb-3">
        <button onClick={handlePrint} className="btn btn-primary text-light d-flex align-items-center justify-content-sm-start justify-content-center gap-2" type="submit" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer-fill" viewBox="0 0 16 16">
            <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z"/>
            <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
          </svg>
          Imprimir
        </button>
      </div>
      <article ref={componentRef}>
        <section className="mb-5">
          <div className="row ">
            <div className="mb-3 mb-sm-0">
              <div className="card border-0 report-cover ">
                <div className="report-bg card-body bg-primary d-flex flex-column align-items-center justify-content-center text-white py-5 text-center">
                  <img className="report-logo my-5"
                    src={bgReport}
                    alt="Imagem de fundo do relatório"
                  />
                  <p className="fs-5">Proposta: 202301085</p>
                  <p className="fs-3">INVERSOR: 6,98 kWp</p>
                  <p className="fs-3">MICRO INVERSOR: 6,60 kWp</p>
                  <p className="fs-1">Izabel Cristina</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-5">
          <h3 className="card-content-title fw-semibold mb-5 text-primary text-center">
            Como funciona a energia solar?
          </h3>
          <div className="row mb-3">
            <div className="mb-3 mb-sm-0">
            <div className="card border-0">
                <div className="card-body d-flex flex-column align-items-center justify-content-center mb-5">
                  <img className="report-house-illustration"
                    src={reportHouseIlustration}
                    alt="Imagem de fundo do relatório"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-6 mb-3 mb-sm-0">
              <div className="card border-light-subtle">
                <div className="card-body">
                  <div>
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <div className="text-warning">  
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-primary fw-bold">Sustentabilidade</h3>
                        <p className="fs-5 mb-0">Energia limpa, ambiente amigável</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="text-warning">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                      </svg>
                    </div>
                      <div>
                        <h3 className="text-primary fw-bold">Renovável</h3>
                        <p className="fs-5 mb-0">Energia abundante, acessível e inesgotáve</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <div className="text-warning">  
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-primary fw-bold">Retorno de investiment</h3>
                        <p className="fs-5 mb-0">Garantia de retorno de iinvestiment</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <div className="text-warning">  
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-primary fw-bold">Valorização do imóvel</h3>
                        <p className="fs-5 mb-0">alorização imediata em cecrca de 80% sobre o valor do imóvel</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-3 mb-sm-0">
              <div className="card border-light-subtle">
                <div className="card-body">
                  <div>
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <div className="text-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-primary fw-bold">Sustentabilidade</h3>
                        <p className="fs-5 mb-0">Energia limpa, ambiente amigável</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <div className="text-warning">   
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-primary fw-bold">Renovável</h3>
                        <p className="fs-5 mb-0">Energia abundante, acessível e inesgotáve</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <div className="text-warning">  
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-primary fw-bold">Retorno de investiment</h3>
                        <p className="fs-5 mb-0">Garantia de retorno de iinvestiment</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <div className="text-warning">  
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-primary fw-bold">Valorização do imóvel</h3>
                        <p className="fs-5 mb-0">alorização imediata em cecrca de 80% sobre o valor do imóvel</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-5">
          <h3 className="card-content-title fw-semibold mb-5 text-primary text-center">
            Descrição do Sistema Solar
          </h3>
          <div className="mb-3">
            <div className="card border-light-subtle">
              <div className="card-body">
                <SolarSystemDescription />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-5">
          <h3 className="card-content-title fw-semibold mb-5 text-primary text-center">
            Geração e Preço
          </h3>
          <GenerationAndPrice />
        </section>

        <section className="mb-5">
          <h3 className="card-content-title fw-semibold mb-5 text-primary text-center">
            Variação Anual
          </h3>
          <AnnualVariation />
        </section>

        <section className="mb-5">
          <h3 className="card-content-title fw-semibold mb-5 text-primary text-center">Garantias</h3>
          <div className="row mb-3">
            <div className="mb-3 mb-sm-0">
              <div className="card border-light-subtle">
                <div className="card-body">
                  <h6 className="card-title">Tabela</h6>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-5">
          <h4 className="card-content-title fw-semibold mb-3">
            Indicadores Financeiros
          </h4>
          <div className="row mb-3">
            <div className="mb-3 mb-sm-0">
              <div className="card border-light-subtle">
                <div className="card-body">
                  <h6 className="card-title">Tabela</h6>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-5">
          <h4 className="card-content-title fw-semibold mb-3">
            Pagamento à vista
          </h4>
          <div className="row mb-3">
            <div className="mb-3 mb-sm-0">
              <div className="card border-light-subtle">
                <div className="card-body">
                  <h6 className="card-title">Tabela</h6>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-5">
          <h4 className="card-content-title fw-semibold mb-3">Economia</h4>
          <div className="row mb-3">
            <div className="mb-3 mb-sm-0">
              <div className="card border-light-subtle">
                <div className="card-body">
                  <h6 className="card-title">Cards</h6>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-5">
          <h4 className="card-content-title fw-semibold mb-3">Financiamento</h4>
          <div className="row mb-3">
            <div className="mb-3 mb-sm-0">
              <div className="card border-light-subtle">
                <div className="card-body">
                  <h6 className="card-title">Tabela</h6>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h4 className="card-content-title fw-semibold mb-3">
            Itens inclusos/não inclusos
          </h4>
          <div className="row">
            <div className="mb-3 mb-sm-0">
              <div className="card border-light-subtle">
                <div className="card-body">
                  <h6 className="card-title">Tabela</h6>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
