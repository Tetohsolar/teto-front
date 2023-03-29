import "./style.scss";

export default function SingleBusinessDetails(props) {
  const basicInfoData = {
    criadoModificadoEm: "13/03/2023",
    nome: "João dos Santos",
    tipoDePessoa: "PF",
    cpfCnpj: "123.456.789-00",
    telefone: "(88) 91234-5678",
    whatsapp: "(88) 91234-5678",
    email: "meu@email.com",
    informacoesAdicionais: "Negócio residencial.",
  };

  const addressData = {
    rua: "Rua ABC",
    bairro: "Centro",
    cep: "12300-000",
    estado: "Ceará",
    cidade: "Sobral",
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
                      <td>{basicInfoData.criadoModificadoEm}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Usuário
                      </th>
                      <td>{basicInfoData.nome}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Fator solar
                      </th>
                      <td>{basicInfoData.tipoDePessoa}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Tipo de telhado
                      </th>
                      <td>{basicInfoData.cpfCnpj}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Rateios
                      </th>
                      <td>{basicInfoData.telefone}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Modalidade
                      </th>
                      <td>{basicInfoData.whatsapp}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Grupo
                      </th>
                      <td>{basicInfoData.email}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Subgrupo
                      </th>
                      <td>{basicInfoData.informacoesAdicionais}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3 col-lg-6">
          <div className="card border-light-subtle">
            <div className="card-body">
              <h6 className="card-title mb-3">Informações da geradora</h6>
              <div className="table-responsive">
                <table className="table caption-top table-sm mb-0">
                  <tbody>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Rua
                      </th>
                      <td>{addressData.rua}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Bairro
                      </th>
                      <td>{addressData.bairro}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        CEP
                      </th>
                      <td>{addressData.cep}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                        Estado
                      </th>
                      <td>{addressData.estado}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-semibold">
                      Cidade
                      </th>
                      <td>{addressData.cidade}</td>
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
