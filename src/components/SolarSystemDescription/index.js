import WithInversor from "../WithInversor";
import WithMicroinversor from "../WithMicroinversor";
import "./style.scss";

export default function SolarSystemDescription(props) {
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
        <div className="mb-3 col-xxl-6">
          <div className="card border-light-subtle">
            <div className="card-body">
              <h6 className="card-title">Com Inversor</h6>
              <div className="table-responsive">
                <WithInversor />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3 col-xxl-6">
          <div className="card border-light-subtle">
            <div className="card-body">
              <h6 className="card-title">Com Microinversor</h6>
              <div className="table-responsive">
                <WithMicroinversor />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
