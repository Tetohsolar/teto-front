import "./style.scss";

export default function SingleBusinessSizing(props) {
  const generatorInfoData = {
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

  const systemInfoData = {
    tipoDeSistema: "Sistema com Inversor",
    potenciaDoPainel: 465,
    NumeroDePlacas: 15,
    mediaMensal: 854,
    PotenciaDoSistema: 6.98,
  };

  const systemDescriptionData = {
    marcaDaPlaca: "Jinko",
    modeloDaPlaca: "JKM465W-60HL4-V",
    MarcaDoInversor: "Growatt",
    ModeloDoInversor: "MIN 5000TL-X",
    GarantiaDoInversor: 10,
    NúmeroDeInversores: 1,
  };

  return (
    <div className="p-3 mb-3 bg-white rounded-3">
      <h5 className="card-content-title mb-3 fw-semibold">{props.title}</h5>
      <div className="row">
        <div className="mb-3 col-lg-6">
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
                      <td>{generatorInfoData.cliente}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Usuário
                      </th>
                      <td>{generatorInfoData.usuario}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Fator solar
                      </th>
                      <td>{generatorInfoData.fatorSolar}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Tipo de telhado
                      </th>
                      <td>{generatorInfoData.tipoDeTelhado}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Rateios
                      </th>
                      <td>{generatorInfoData.rateios}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Modalidade
                      </th>
                      <td>{generatorInfoData.modalidade}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Grupo
                      </th>
                      <td>{generatorInfoData.grupo}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Subgrupo
                      </th>
                      <td>{generatorInfoData.subgrupo}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Demanda FP
                      </th>
                      <td>{generatorInfoData.demandaFp}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Energia FP
                      </th>
                      <td>{generatorInfoData.energiaFp}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Demanda P
                      </th>
                      <td>{generatorInfoData.demandaP}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Energia P
                      </th>
                      <td>{generatorInfoData.energiaP}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="mb-3">
              <div className="card border-light-subtle">
                <div className="card-body">
                  <h6 className="card-title mb-3">Informações do sistema</h6>
                  <div className="table-responsive">
                    <table className="table caption-top table-sm mb-0">
                      <tbody>
                        <tr>
                          <th scope="row" className="fw-semibold">
                            Tipo de sistema
                          </th>
                          <td>{systemInfoData.tipoDeSistema}</td>
                        </tr>
                        <tr>
                          <th scope="row" className="fw-semibold">
                            Potência do painel
                          </th>
                          <td>{systemInfoData.potenciaDoPainel}</td>
                        </tr>
                        <tr>
                          <th scope="row" className="fw-semibold">
                            Núm. de placas{" "}
                          </th>
                          <td>{systemInfoData.NumeroDePlacas}</td>
                        </tr>
                        <tr>
                          <th scope="row" className="fw-semibold">
                            Média mensal{" "}
                          </th>
                          <td>{systemInfoData.mediaMensal}</td>
                        </tr>
                        <tr>
                          <th scope="row" className="fw-semibold">
                            Potência do sistema
                          </th>
                          <td>{systemInfoData.PotenciaDoSistema}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3 mb-sm-0">
              <div className="card border-light-subtle">
                <div className="card-body">
                  <h6 className="card-title mb-3">Descrição do sistema</h6>
                  <div className="table-responsive">
                    <table className="table caption-top table-sm mb-0">
                      <tbody>
                        <tr>
                          <th scope="row" className="fw-semibold">
                            Marca da placa{" "}
                          </th>
                          <td>{systemDescriptionData.marcaDaPlaca}</td>
                        </tr>
                        <tr>
                          <th scope="row" className="fw-semibold">
                            Modelos da placa{" "}
                          </th>
                          <td>{systemDescriptionData.modeloDaPlaca}</td>
                        </tr>
                        <tr>
                          <th scope="row" className="fw-semibold">
                            Marca doo Inversor{" "}
                          </th>
                          <td>{systemDescriptionData.MarcaDoInversor}</td>
                        </tr>
                        <tr>
                          <th scope="row" className="fw-semibold">
                            Modelo do inversor
                          </th>
                          <td>{systemDescriptionData.ModeloDoInversor}</td>
                        </tr>
                        <tr>
                          <th scope="row" className="fw-semibold">
                            Garantia do inversor
                          </th>
                          <td>{systemDescriptionData.GarantiaDoInversor}</td>
                        </tr>
                        <tr>
                          <th scope="row" className="fw-semibold">
                            Núm. de inversores
                          </th>
                          <td>{systemDescriptionData.NúmeroDeInversores}</td>
                        </tr>
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
  );
}
