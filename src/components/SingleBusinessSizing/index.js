import "./style.scss";

export default function SingleBusinessSizing(props) {
  const data = {
    cliente: "João dos Santos",
    usuario: "Ana Silva",
    fatorSolar: "1580",
    tipoDeTelhado: "Telhado Cerâmico",
    tipoDeLigacao: "Trifásico",
    rateios: "Rateio X",
    modalidade: "Convencional",
    grupo: "A",
    subgrupo: "A1",
    demandaFp: "123.0",
    energiaFp: "456.0",
    demandaP: "789.0",
    energiaP: "123.1",
  };

  return (
    <div className="p-3 mb-3 bg-white rounded-3">
      <h5 className="card-content-title mb-3 fw-semibold">{props.title}</h5>
      <div className="row">
        <div className="mb-3">
          <div className="card border-light-subtle">
            <div className="card-body">
              <h6 className="card-title mb-3">Informações da geradora</h6>
              <div className="table-responsive">
                <table className="table caption-top table-sm mb-0">
                  <tbody>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Cliente
                      </th>
                      <td>{data.cliente}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Usuário
                      </th>
                      <td>{data.usuario}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Fator solar
                      </th>
                      <td>{data.fatorSolar}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Tipo de telhado
                      </th>
                      <td>{data.tipoDeTelhado}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Rateios
                      </th>
                      <td>{data.rateios}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Modalidade
                      </th>
                      <td>{data.modalidade}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Grupo
                      </th>
                      <td>{data.grupo}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Subgrupo
                      </th>
                      <td>{data.subgrupo}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Demanda FP
                      </th>
                      <td>{data.demandaFp}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Energia FP
                      </th>
                      <td>{data.energiaFp}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Demanda P
                      </th>
                      <td>{data.demandaP}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Energia P
                      </th>
                      <td>{data.energiaP}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <div className="card border-light-subtle">
            <div className="card-body">
              <h6 className="card-title">Informações básicas</h6>
              <div className="table-responsive">
                <table className="table caption-top table-sm">
                  <tbody>
                    <tr>
                      <td>a</td>
                      <td>b</td>
                    </tr>
                    <tr>
                      <td>c</td>
                      <td>d</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card border-light-subtle">
            <div className="card-body">
              <h6 className="card-title">Endereço</h6>
              <div className="table-responsive">
                <table className="table caption-top table-sm">
                  <tbody>
                    <tr>
                      <td>a</td>
                      <td>b</td>
                    </tr>
                    <tr>
                      <td>c</td>
                      <td>d</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
