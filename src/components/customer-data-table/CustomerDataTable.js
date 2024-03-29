import './customer-data-table.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext, useMemo } from 'react';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';
import MyModal from '../communs/ModalDelete';
import { toast } from 'react-toastify';
import Pagination from '../pagination/Pagination';
import { VscSearch } from "react-icons/vsc";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import { AiFillPlusSquare } from "react-icons/ai";
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
//PAGINATION
let PageSize = 5;

const CustomerDataTable = (props) => {

  const [clientes, setClientes] = useState([])
  const [name, setName] = useState([])
  const [totalPages, setTotalPages] = useState([])
  const [idSelected, setIdSelected] = useState([])
  const { token, profilelogged, afflitedId, idLogged } = useContext(AuthContext)
  const navigate = useNavigate();

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return clientes;
  }, [currentPage, clientes]);


  function onPageChanged(data) {
    let filtro = {
      fantasy: name,
      corporatename: "",
      document: "",
      page: data - 1,
      pageSize: 5
    }

    if (profilelogged !== "Root") {

      filtro = {
        fantasy: name,
        corporatename: "",
        document: "",
        page: data - 1,
        pageSize: 5,
        AffiliatedId: afflitedId
      }
    }

    api.post('/client/byparam', filtro, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    }).then((response) => {
      setClientes(response.data.clients)

    })
    setCurrentPage(data);
  }
  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  function edit(id) {
    navigate("/customers/edit/" + id)
  }

  useEffect(() => {

    listaUsers("%");

    return () => { }

  }, [])

  async function listaUsers(name) {

    let filtro = {
      fantasy: name,
      corporatename: "",
      document: "",
      page: 0,
      pageSize: 5
    }

    if (profilelogged !== "Root") {

      filtro = {
        name: name,
        page: 0,
        corporatename: "",
        document: "",
        pageSize: 5,
        AffiliatedId: afflitedId
      }
    }
    await api.post('/client/byparam', filtro, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    })
      .then((response) => {
        setClientes(response.data.clients)
        setTotalPages(response.data.totalItems)

      }).catch((err) => {
        console.log(err)
      })

  }

  async function handleAfterDel(e) {

    await api.delete('/client/delete/' + idSelected, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    })
      .then((response) => {
        listaUsers(name)
        toast.success("Operação realizada com sucesso!", {
          autoClose: 1000,
        })
      }).catch((err) => {
        console.log(err)
      })
  }
  function handleMask(e) {
    listaUsers(name)
    setCurrentPage(1);
    e.preventDefault()
  }

  return (
    <form onSubmit={handleMask}>
      <div className="p-3 mb-3 bg-white border rounded-3 container">
        <div className='containerCustom'>
          <h5 className="card-content-title fw-semibold ">{props.listTitle}
          </h5>
          <Link to={"/customers/new"} className="btn btn-primary text-light"><AiFillPlusSquare /> Novo Cliente </Link>

        </div>
        <hr className='my-4' />
        <div className='bt-cima'>
          <div className="input-group mb-5 search-w">

            <TextField id="name" maxLength={50} className="form-control" label="Buscar" variant="outlined" value={name || ''}
              onChange={(e) => setName(e.target.value)} onKeyUp={(e) => { listaUsers(name) }} />

            <button className="btn btn-primary text-light d-flex align-items-center" type="button" id="button-addon2" onClick={handleMask}>
              <VscSearch />

            </button>
          </div>

        </div>
        <div>
          <div className='table-responsive'>
            <table className="table">
              <tbody>
                <th className='nome1'> Nome </th>
                <th className='tel1'> Telefone</th>
                {currentTableData && currentTableData.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.fantasy}</td>
                      <td>{user.phone}</td>
                      <td><span className="badge bg-light text-secondary">{user.userType}</span></td>
                      <td>
                        <div className="d-flex gap-2 justify-content-end">
                          <button type="button" className="btn btn-light btn-sm text-primary d-flex align-items-center" onClick={() => {
                            edit(user.id)
                          }}>
                            <BsFillPencilFill />
                          </button>
                          <button type="button" className="btn btn-light btn-sm text-danger d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
                            setIdSelected(user.id)
                          }}>

                            <BsFillTrash3Fill />
                          </button>
                          <MyModal userId={user.id} uc=" o Cliente" onClick={handleAfterDel} />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className='paginationCustomer'>
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
    </form>
  );
};

export default CustomerDataTable;
