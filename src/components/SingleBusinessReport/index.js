import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

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
    <div className="p-3 mb-3 bg-white rounded-3">
      <article>
        <section className="mb-5">
          <div className="row">
            <div className="mb-3 mb-sm-0">
              <div className="card border-light-subtle">
                <div className="card-body">
                  <h6 className="card-title">Capa</h6>
                  <p>Proposta: 202301085</p>
                  <p>INVERSOR: 6,98 kWp</p>
                  <p>MICRO INVERSOR: 6,60 kWp</p>
                  <p>Izabel Cristina</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-5">
          <h5 className="card-content-title fw-semibold mb-3">
            Como a nova taxa impacta sua economia
          </h5>
          <div className="row mb-3">
            <div className="col-lg-4 mb-3 mb-sm-0">
              <div className="card border-light-subtle">
                <div className="card-body">
                  <h6 className="card-title">2023</h6>
                  <div style={{ width: "100%", height: 256 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart width={400} height={400}>
                        <Pie
                          data={data}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={renderCustomizedLabel}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
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
                        <span className="fw-light">Primary</span>
                      </div> 
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-success" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Success</span>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-warning" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Warning</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-danger" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Danger</span>
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
                        <Pie
                          data={data}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={renderCustomizedLabel}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
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
                        <span className="fw-light">Primary</span>
                      </div> 
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-success" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Success</span>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-warning" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Warning</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-danger" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Danger</span>
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
                        <Pie
                          data={data}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={renderCustomizedLabel}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
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
                        <span className="fw-light">Primary</span>
                      </div> 
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-success" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Success</span>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-warning" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Warning</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-danger" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Danger</span>
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
                        <Pie
                          data={data}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={renderCustomizedLabel}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
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
                        <span className="fw-light">Primary</span>
                      </div> 
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-success" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Success</span>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-warning" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Warning</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-danger" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Danger</span>
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
                        <Pie
                          data={data}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={renderCustomizedLabel}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
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
                        <span className="fw-light">Primary</span>
                      </div> 
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-success" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Success</span>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-warning" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Warning</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-danger" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Danger</span>
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
                        <Pie
                          data={data}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={renderCustomizedLabel}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
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
                        <span className="fw-light">Primary</span>
                      </div> 
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-success" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Success</span>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-warning" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Warning</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill text-danger" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        <span className="fw-light">Danger</span>
                      </div>                  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-5">
          <h5 className="card-content-title fw-semibold mb-3">
            Descrição do Sistema Solar
          </h5>
          <div className="row mb-3">
            <div className="mb-3">
              <div className="card border-light-subtle">
                <div className="card-body">
                  <h6 className="card-title">Com Inversor</h6>
                  ...
                </div>
              </div>
            </div>
            <div className="mb-3 mb-sm-0">
              <div className="card border-light-subtle">
                <div className="card-body">
                  <h6 className="card-title">Com Microinversor</h6>
                  ...
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-5">
          <h5 className="card-content-title fw-semibold mb-3">
            Geração de Preço
          </h5>
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
          <h5 className="card-content-title fw-semibold mb-3">
            Variação Anual
          </h5>
          <div className="row mb-3">
            <div className="mb-3 mb-sm-0">
              <div className="card border-light-subtle">
                <div className="card-body">
                  <h6 className="card-title">Gráfico</h6>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-5">
          <h5 className="card-content-title fw-semibold mb-3">Garantias</h5>
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
          <h5 className="card-content-title fw-semibold mb-3">
            Indicadores Financeiros
          </h5>
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
          <h5 className="card-content-title fw-semibold mb-3">
            Pagamento à vista
          </h5>
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
          <h5 className="card-content-title fw-semibold mb-3">Economia</h5>
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
          <h5 className="card-content-title fw-semibold mb-3">Financiamento</h5>
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
          <h5 className="card-content-title fw-semibold mb-3">
            Itens inclusos/não inclusos
          </h5>
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
