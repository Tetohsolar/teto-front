import "./style.scss";
import { useState } from "react";

const generationAndPriceData = [
  {
    id: 6541654561,
    name: "Painel solar Jinko 465W",
    amount: 15,
  },
  {
    id: 2165165564,
    name: "Inversor Growatt MIN 5000TL-X",
    amount: 1,
  },
  {
    id: 9546198496,
    name: "Estrutura para Telhado Cerâmico",
    amount: "Incluso",
  },
  {
    id: 6541984654,
    name: "Geração média mensal (1ºano)",
    amount: "854 kWh",
  },
  {
    id: 6549846546,
    name: "Valor Total",
    amount: "R$ 26.700,00",
  },
];

export default function GenerationAndPriceDataTable(props) {
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
                    {generationAndPriceData.map((item) => {
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
