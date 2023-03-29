import './style.scss'
import NewBusiness from '../../pages/business/new';
import { AiOutlinePartition } from 'react-icons/ai';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api';
import { useContext, useEffect, useMemo, useState } from 'react';
import Pagination from '../pagination/Pagination';
import { format } from 'date-fns'
import { AiFillPlusSquare } from "react-icons/ai";
import { VscSearch } from "react-icons/vsc";
import { BsFillPieChartFill, BsFillSendFill, BsPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import InputMask from 'react-input-mask';
import moment from 'moment/moment';

function DateInput(props) {
  return (
    <InputMask
      mask='99/99/9999'
      value={props.value}
      onChange={props.onChange}
      onKeyUp={props.onKeyUp}
      onKeyDown={props.onKeyDown}
      className="form-control" required={props.required} placeholder={props.placeholder}
      type={props.type} name={props.name} id={props.id} >
    </InputMask>
  );
}

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})
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

let PageSize = 5;
const BusinessDataTable = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [objs, setObjects] = useState([])
  const [totalPages, setTotalPages] = useState([])
  const [idSelected, setIdSelected] = useState([])
  const { token } = useContext(AuthContext)
  const [name, setName] = useState([])
  const [data, setData] = useState([])
  const [numero, setNumero] = useState([])
  const [situation, setSituation] = useState([])

  useEffect(() => {

    list("%");


    return () => { }


  }, [])

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return objs;
  }, [currentPage, objs]);

  async function list(name) {

    var dateString = String(data);
    var dateCaract = String(data).replace('_', '');

    var dateParts = dateString.split("/");
    var dateObject = String(dateParts[2]) + "-" + String(dateParts[1]) + "-" + String(dateParts[0]);
    let datanova = '2000-02-01';

    if (dateCaract.length >= 10 && moment(dateObject).isValid()) {
      datanova = dateObject
    }

    const filtro = {
      fantasy: "%" + name + "%",
      document: "%",
      page: 0,
      pageSize: 5,
      number: numero,
      dateSt: datanova,
      situation: `${situation}`
    }


    await api.post('/business/byparam', filtro, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    })
      .then((response) => {
        setObjects(response.data.business)
        setTotalPages(response.data.totalItems)

      }).catch((err) => {
        console.log(err)
      })

  }


  function onPageChanged(data) {

    var dateString = String(data);
    var dateCaract = String(data).replace('_', '');

    var dateParts = dateString.split("/");
    var dateObject = String(dateParts[2]) + "-" + String(dateParts[1]) + "-" + String(dateParts[0]);
    let datanova = '2000-02-01';

    if (dateCaract.length >= 10 && moment(dateObject).isValid()) {
      datanova = dateObject
    }

    const filtro = {
      fantasy: "%" + name + "%",
      document: "%",
      page: data - 1,
      pageSize: 5,
      number: numero,
      dateSt: datanova,
      situation: `${situation}`
    }

    api.post('/business/byparam', filtro, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    })
      .then((response) => {
        setObjects(response.data.business)
        setTotalPages(response.data.totalItems)

      }).catch((err) => {
        console.log(err)
      })
    setCurrentPage(data);

  }
  function find() {
    list("%")
  }

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const totalValue = `${totalPages}`
  return (
    <div className="p-3 mb-3 bg-white rounded-3">
      <div className="d-flex flex-column flex-sm-row justify-content-between">
        <h5 className="card-content-title fw-semibold mb-3">{props.listTitle}</h5>
        <button
          className="btn btn-primary text-light d-flex align-items-center justify-content-sm-start justify-content-center gap-2"
          type="submit"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          <AiFillPlusSquare />
          Novo negócio
        </button>
      </div>
      <NewBusiness />
      <hr className="" />
      <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
        <div className="filtro">
          <input type="numero" className="form-control" placeholder="Número" aria-label="Number" aria-describedby="button-addon2" onChange={(e) => setNumero(e.target.value)} onKeyUp={(e) => { list(name) }} />
          <input type="text" className="form-control" placeholder="Nome" aria-label="Name" aria-describedby="button-addon2" onChange={(e) => setName(e.target.value)} onKeyUp={(e) => { list(name) }} />
          <DateInput className="form-control" placeholder="Data" aria-label="Date" aria-describedby="button-addon2" onChange={(e) => { setData(e.target.value) }}
            onKeyUp={(e) => {
              list(name)
            }} />

          <button className="btn btn-primary filtro2" type="button" id="button-addon2">
            <span className="d-flex align-items-center">
              <VscSearch />
            </span>
          </button>
        </div>







        <form className="mb-3 justify-content-end">
          <div className="row">
            <div className="col-md-auto">
              <select className="form-select" aria-label="Selecionar" onChange={(e) => setSituation(e.target.value)} onKeyUp={find} onClick={find}>
                {selectOptions.map((option) => (<option key={option.value} value={option.value} >{option.label}</option>))}
              </select>
            </div>
          </div>
        </form>
      </div>
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
                      <th scope="col" className='alinhadaDireita'>Potência</th>
                      <th scope="col" className='alinhadaDireita'>Valor</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>

                    {objs.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.number}</td>
                          <td>{item.Client.fantasy}</td>
                          <td>{format(new Date(item.createdAt), 'dd/MM/yyyy')}</td>
                          <td><span className="badge rounded-pill text-bg-lightblue text-primary">{item.situation}</span></td>
                          <td className='alinhaDireita'>{item.systempower}</td>
                          <td className='alinhaDireita'>{formatter.format(item.amount)}</td>
                          <td>

                            <div className="d-flex gap-2 justify-content-end">
                              <button
                                type="button"
                                className="btn btn-light btn-sm text-primary d-flex align-items-center"
                              >

                                <BsFillPieChartFill />
                              </button>
                              {/* <button
                                type="button"
                                className="btn btn-light btn-sm text-primary d-flex align-items-center"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                                  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                                </svg>
                                <BsFillSendFill />
                              </button> */}
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
              <div className='pagidireita'>
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={totalPages}
                  pageSize={PageSize}
                  onPageChange={data => onPageChanged(data)}
                />
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
