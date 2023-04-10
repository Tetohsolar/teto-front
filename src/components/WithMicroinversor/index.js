import "./style.scss";
import {
  BsFillPieChartFill,
  BsFillSendFill,
  BsPencilFill,
  BsFillTrash3Fill,
} from "react-icons/bs";
import { AiFillPlusSquare } from "react-icons/ai";
import { useState } from "react";

const withMicroinversorData = [
  {
    id: 6546545646,
    name: "Painel solar J.A. 550W",
    amount: 12,
  },
  {
    id: 6549654654,
    name: "Microinversor DEYE SUN2000G3-US-220",
    amount: 3,
  },
  {
    id: 4321651656,
    name: "Estrutura para Telhado Cerâmico",
    amount: "Incluso",
  },
  {
    id: 5468719817,
    name: "Geração média mensal (1ºano)",
    amount: "808 kWh",
  },
  {
    id: 91874165566,
    name: "Valor Total",
    amount: "R$ 27.000,00",
  },
];

export default function WithMicroinversor(props) {
  return (
    <div className="p-3 mb-3 bg-white rounded-3">
      <h5 className="card-content-title fw-semibold">{props.title}</h5>
      <div className="row">
        <div className="mb-3 mb-sm-0">
          <div className="card border-light-subtle">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table caption-top table-sm">
                  <thead>
                    <tr>
                      <th scope="col">6,98 kWp</th>
                      <th scope="col">Quantiddade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {withMicroinversorData.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.amount}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}