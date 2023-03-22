import './style.scss'
import NewBusiness from '../../pages/business/new';

const business = [
  {
    id: 130320230001,
    creationDate: "13/03/2023",
    expirationDate: "14/03/2023",
    status: "Pode editar",
    power: "2.3",
    amount: "99.999,99",
  },
  {
    id: 130320230002,
    creationDate: "13/03/2023",
    expirationDate: "14/03/2023",
    status: "Pode ver",
    power: "2.1",
    amount: "73.777,77",
  },
  {
    id: 130320230003,
    creationDate: "13/03/2023",
    expirationDate: "14/03/2023",
    status: "Pode editar",
    power: "3.2",
    amount: "123.456,78",
  },
  {
    id: 130320230004,
    creationDate: "13/03/2023",
    expirationDate: "14/03/2023",
    status: "Pode ver",
    power: "4.3",
    amount: "78.88,33",
  },
];

const BusinessDataTable = (props) => {
  const averageValue = "199.999,99"
  return (
    <div className="p-3 mb-3 bg-white rounded-3">
      <div className="d-flex justify-content-between">
        <h5 className="card-content-title fw-semibold">{props.listTitle}</h5>
        <button
          className="btn btn-primary text-light d-flex align-items-center gap-2"
          type="submit"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-plus-square-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
          </svg>
          Novo negócio
        </button>
      </div>
      <NewBusiness />
      <hr className="my-3 text-body-tertiary" />
      <form class="row mb-3 justify-content-end">
        <div class="col-auto">
          <select class="form-select" aria-label="Selecionar">
            <option selected>Em aberto</option>
            <option value="1">Fechados</option>
            <option value="2">Perdidos</option>
          </select>
        </div>
      </form>
      <div className="row">
        <div className="mb-3 mb-sm-0">
          <div className="card border-light-subtle">
            <div className="card-body">
              <h6 className="card-title">{`Valor médio: ${averageValue}`}</h6>
              <div className="table-responsive">
                <table className="table caption-top table-sm">
                  <thead>
                    <tr>
                      <th scope="col">Número</th>
                      <th scope="col">Criado em</th>
                      <th scope="col">Validade</th>
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
                          <td>{item.creationDate}</td>
                          <td>{item.expirationDate}</td>
                          <td><span class="badge rounded-pill text-bg-lightblue text-primary">{item.status}</span></td>
                          <td>{item.power}</td>
                          <td>{item.amount}</td>
                          <td>
                            <div className="d-flex gap-2 justify-content-end">
                              <button
                                type="button"
                                className="btn btn-light btn-sm text-primary d-flex align-items-center"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pie-chart-fill" viewBox="0 0 16 16">
                                  <path d="M15.985 8.5H8.207l-5.5 5.5a8 8 0 0 0 13.277-5.5zM2 13.292A8 8 0 0 1 7.5.015v7.778l-5.5 5.5zM8.5.015V7.5h7.485A8.001 8.001 0 0 0 8.5.015z"/>
                                </svg>
                              </button>
                              <button
                                type="button"
                                className="btn btn-light btn-sm text-primary d-flex align-items-center"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
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
                              <button
                                type="button"
                                className="btn btn-light btn-sm text-danger d-flex align-items-center"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-trash3-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div class="btn-toolbar justify-content-end" role="toolbar" aria-label="Toolbar with button groups">
                  <div class="btn-group" role="group" aria-label="First group">
                    <button type="button" class="btn btn-outline-secondary">1</button>
                    <button type="button" class="btn btn-outline-secondary">2</button>
                    <button type="button" class="btn btn-outline-secondary">3</button>
                    <button type="button" class="btn btn-outline-secondary">4</button>
                  </div>
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

export default BusinessDataTable;
