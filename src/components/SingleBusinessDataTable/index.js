import "./style.scss";
import NewBusiness from "../../pages/business/new";
import {
  BsFillPieChartFill,
  BsFillSendFill,
  BsPencilFill,
  BsFillTrash3Fill,
} from "react-icons/bs";
import { AiFillPlusSquare } from "react-icons/ai";
import { useState } from "react";

const business = [
  {
    id: "202303001",
    name: "Maria Santos",
    creationDate: "14/03/2023",
    status: "Fechado",
    power: "2.3",
    amount: "29.999,99",
  },
  {
    id: "202303002",
    name: "Antônio Filho",
    creationDate: "15/03/2023",
    status: "Perdido",
    power: "2.3",
    amount: "27.999,99",
  },
  {
    id: "2023030036",
    name: "Empresa XYZ",
    creationDate: "16/03/2023",
    status: "Em aberto",
    power: "2.3",
    amount: "139.999,99",
  },
  {
    id: "202303004",
    name: "Luciana Ferreira",
    creationDate: "17/03/2023",
    status: "Em aberto",
    power: "2.3",
    amount: "49.999,99",
  },
];

export default function SingleBusinessDataTable(props) {
  const [situation, setSituation] = useState([]);
  const selectOptions = [
    {
      value: "Aberta",
      label: "Em aberto",
    },
    {
      value: "Ganhos",
      label: "Fechados",
    },
    {
      value: "Perdas",
      label: "Perdidos",
    },
  ];

  return (
    <div className="p-3 mb-3 bg-white rounded-3">
      <div className="d-flex flex-column flex-sm-row justify-content-between">
        <h5 className="card-content-title fw-semibold mb-3">{props.title}</h5>
        <button
          className="btn btn-primary text-light d-flex align-items-center justify-content-sm-start justify-content-center gap-2"
          type="submit"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <AiFillPlusSquare />
          Novo negócio
        </button>
      </div>
      <NewBusiness />
      <hr className="my-3 text-body-tertiary" />
      <div className="d-flex flex-column flex-md-row justify-content-end">
        <form className="mb-3 justify-content-end">
          <div className="row">
            <div className="col-md-auto">
              <select
                className="form-select"
                aria-label="Selecionar"
                onChange={(e) => setSituation(e.target.value)}
              >
                {selectOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
      <div className="row">
        <div className="mb-3 mb-sm-0">
          <div className="card border-light-subtle">
            <div className="card-body">
              <h6 className="card-title">Informações da geradora</h6>
              <div className="table-responsive">
                <table className="table caption-top table-sm">
                  <thead>
                    <tr>
                      <th scope="col">Número</th>
                      <th scope="col">Nome</th>
                      <th scope="col">Data</th>
                      <th scope="col">Status</th>
                      <th scope="col">Potência</th>
                      <th scope="col">Valor</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {business.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.creationDate}</td>
                          <td>
                            <span className="badge rounded-pill text-bg-lightblue text-primary">
                              {item.status}
                            </span>
                          </td>
                          <td>{item.power}</td>
                          <td>{item.amount}</td>
                          <td>
                            <div className="d-flex gap-2 justify-content-end">
                              <button
                                type="button"
                                className="btn btn-light btn-sm text-primary d-flex align-items-center"
                              >
                                <BsFillPieChartFill />
                              </button>
                              <button
                                type="button"
                                className="btn btn-light btn-sm text-primary d-flex align-items-center"
                              >
                                <BsFillSendFill />
                              </button>
                              <button
                                type="button"
                                className="btn btn-light btn-sm text-primary d-flex align-items-center"
                              >
                                <BsPencilFill />
                              </button>
                              <button
                                type="button"
                                className="btn btn-light btn-sm text-danger d-flex align-items-center"
                              >
                                <BsFillTrash3Fill />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div
                className="btn-toolbar justify-content-end"
                role="toolbar"
                aria-label="Toolbar with button groups"
              >
                <div
                  className="btn-group"
                  role="group"
                  aria-label="First group"
                >
                  <button
                    type="button"
                    className="d-flex btn btn-outline-secondary text-primary align-items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-left-short"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary text-primary active"
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary text-primary"
                  >
                    2
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary text-primary"
                  >
                    3
                  </button>
                  <button
                    type="button"
                    className="d-flex btn btn-outline-secondary text-primary align-items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-right-short"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
