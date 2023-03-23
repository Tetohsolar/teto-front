import './style.scss'
import NewBusiness from '../../pages/business/new';

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

const SixMonthsBusinessDataTable = (props) => {
  const totalValue = "99"
  return (
    <div className="p-3 mb-3 bg-white rounded-3">
      <h5 className="card-content-title mb-3 fw-semibold">{props.listTitle}</h5>
      <NewBusiness />
      <div className="row">
        <div className="mb-3 mb-sm-0">
          <div className="card border-light-subtle">
            <div className="card-body">
              <h6 className="card-title">{`Total de negócios: ${totalValue}`}</h6>
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
                          <td><span className="badge rounded-pill text-bg-lightblue text-primary">{item.status}</span></td>
                          <td>{item.power}</td>
                          <td>{item.amount}</td>
                          <td>
                            <div className="d-flex gap-2 justify-content-end">
                              <button
                                type="button"
                                className="btn btn-light btn-sm text-primary d-flex align-items-center"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                                  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                                </svg>
                              </button>
                              <button
                                type="button"
                                className="btn btn-light btn-sm text-primary d-flex align-items-center"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-pencil-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="btn-toolbar justify-content-end" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group" role="group" aria-label="First group">
                  <button type="button" className="d-flex btn btn-outline-secondary text-primary align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/></svg>
                  </button>
                  <button type="button" className="btn btn-outline-secondary text-primary active">1</button>
                  <button type="button" className="btn btn-outline-secondary text-primary">2</button>
                  <button type="button" className="btn btn-outline-secondary text-primary">3</button>
                  <button type="button" className="d-flex btn btn-outline-secondary text-primary align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/></svg>
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
};

export default SixMonthsBusinessDataTable;
