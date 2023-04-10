import "./style.scss";
import { useState } from "react";

const address = "Varjota";

const generationAndPriceData = [
  {
    id: 5465,
    name: "Geração esperada",
    inversor: "854 kWh",
    microInversor: "808 kWh",
  },
  {
    id: 4984,
    name: "Área necessária",
    inversor: "20 m²",
    microInversor: "19 m²",
  },
  {
    id: 6858,
    name: "Peso do sistema",
    inversor: "349 kg",
    microInversor: "330 kg",
  },
  {
    id: 8971,
    name: "Porc. atendida",
    inversor: "100%",
    microInversor: "95%",
  },
  {
    id: 6549,
    name: "Valor Total",
    inversor: "R$ 26.700,00",
    microInversor: "R$ 27.000,00",
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
                      <th scope="col">{address}</th>
                      <th scope="col">Inversor</th>
                      <th scope="col">Micro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generationAndPriceData.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.inversor}</td>
                          <td>{item.microInversor}</td>
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
