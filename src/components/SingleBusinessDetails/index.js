import { AiFillCodepenCircle, AiFillPlusSquare } from "react-icons/ai";
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
              <div className="d-flex justify-content-between mb-3">
                <h6 className="card-title mb-3">Informações básicas</h6>
                <button
                  className="btn btn-light text-primary d-flex align-items-center justify-content-center"
                  type="submit"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                  </svg>
                </button>
              </div>
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
              <div className="d-flex justify-content-between mb-3">
                <h6 className="card-title mb-3">Endereço</h6>
                <button
                  className="btn btn-light text-primary d-flex align-items-center justify-content-center"
                  type="submit"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                  </svg>
                </button>
              </div>
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
