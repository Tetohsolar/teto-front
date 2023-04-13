import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import SolarSystemDescription from "../SolarSystemDescription";
import GenerationAndPrice from "../GenerationAndPrice";
import AnnualVariation from "../AnnualVariation";
import "./single-business-report.scss";
import bgReport from "../../assets/img/teto-solar-visual-signature.png";
import reportHouseIlustration from "../../assets/img/report-house-illustration.png";

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
  return (
    <div className="p-3 mb-4 bg-white rounded-3">
      <article>
        <section className="mb-5">
          <div className="row">
            <div className="mb-3 mb-sm-0">
              <div className="card border-0">
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
            Como a nova taxa impacta sua economia
          </h3>
          <div className="row mb-3">
            <div className="col-lg-4 mb-3 mb-sm-0">
              <div className="card border-light-subtle">
                <div className="card-body">
                  <h6 className="card-title">2023</h6>
                  <div style={{ width: "100%", height: 256 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart width={400} height={400}>
                        <Pie data={data} cx="50%" cy="50%" labelLine={true} label={renderCustomizedLabel} outerRadius={80} fill="#8884d8" dataKey="value">
                          {data.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="d-flex flex-column flex-sm-row gap-sm-3 mt-3">
                    <div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-primary" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Azul</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-success" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Verde</span>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-warning" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Amarelo</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-danger" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Vermelho</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-3 mb-sm-0">
              <div className="card border-light-subtle">
                <div className="card-body">
                  <h6 className="card-title">2024</h6>
                  <div style={{ width: "100%", height: 256 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart width={400} height={400}>
                        <Pie data={data} cx="50%" cy="50%" labelLine={true} label={renderCustomizedLabel} outerRadius={80} fill="#8884d8" dataKey="value">
                          {data.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="d-flex flex-column flex-sm-row gap-sm-3 mt-3">
                    <div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-primary" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Azul</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-success" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Verde</span>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-warning" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Amarelo</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-danger" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Vermelho</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card border-light-subtle">
                <div className="card-body">
                  <h6 className="card-title">2005</h6>
                  <div style={{ width: "100%", height: 256 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart width={400} height={400}>
                        <Pie data={data} cx="50%" cy="50%" labelLine={true} label={renderCustomizedLabel} outerRadius={80} fill="#8884d8" dataKey="value">
                          {data.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="d-flex flex-column flex-sm-row gap-sm-3 mt-3">
                    <div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-primary" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Azul</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-success" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Verde</span>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-warning" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Amarelo</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-danger" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Vermelho</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 mb-3 mb-sm-0">
              <div className="card border-light-subtle">
                <div className="card-body">
                  <h6 className="card-title">2026</h6>
                  <div style={{ width: "100%", height: 256 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart width={400} height={400}>
                        <Pie data={data} cx="50%" cy="50%" labelLine={true} label={renderCustomizedLabel} outerRadius={80} fill="#8884d8" dataKey="value">
                          {data.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="d-flex flex-column flex-sm-row gap-sm-3 mt-3">
                    <div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-primary" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Azul</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-success" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Verde</span>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-warning" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Amarelo</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-danger" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Vermelho</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-3 mb-sm-0">
              <div className="card border-light-subtle">
                <div className="card-body">
                  <h6 className="card-title">2027</h6>
                  <div style={{ width: "100%", height: 256 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart width={400} height={400}>
                        <Pie data={data} cx="50%" cy="50%" labelLine={true} label={renderCustomizedLabel} outerRadius={80} fill="#8884d8" dataKey="value">
                          {data.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="d-flex flex-column flex-sm-row gap-sm-3 mt-3">
                    <div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-primary" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Azul</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-success" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Verde</span>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-warning" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Amarelo</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-danger" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Vermelho</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card border-light-subtle">
                <div className="card-body">
                  <h6 className="card-title">2030</h6>
                  <div style={{ width: "100%", height: 256 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart width={400} height={400}>
                        <Pie data={data} cx="50%" cy="50%" labelLine={true} label={renderCustomizedLabel} outerRadius={80} fill="#8884d8" dataKey="value">
                          {data.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="d-flex flex-column flex-sm-row gap-sm-3 mt-3">
                    <div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-primary" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Azul</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-success" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Verde</span>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-warning" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Amarelo</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-danger" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Vermelho</span>
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
