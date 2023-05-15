import './customer-data-table.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext, useMemo } from 'react';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';
import MyModal from '../communs/ModalDelete';
import { toast } from 'react-toastify';
import Pagination from '../pagination/Pagination';
import { AiFillPlusSquare } from "react-icons/ai";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import { VscSearch } from "react-icons/vsc";
import { TextField } from '@mui/material';
let PageSize = 5;

const AfflitedDataTable = (props) => {

  const [objs, setObjects] = useState([])
  const [name, setName] = useState([])
  const [totalPages, setTotalPages] = useState([])
  const [idSelected, setIdSelected] = useState([])
  const { token } = useContext(AuthContext)
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return objs;
  }, [currentPage, objs]);

  function onPageChanged(data) {
    const filtro = {
      name: name,
      page: data - 1,
      pageSize: 5
    }

    const { } = data;

    api.post('/afflited/byparam', filtro, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    }).then((response) => {
      setObjects(response.data.tutorials)

    })
    setCurrentPage(data);
  }
  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  function edit(id) {
    navigate("/affliteds/edit/" + id)
  }
  useEffect(() => {

    const storageUser = localStorage.getItem('cliente')

    list("%");

    return () => { }

  }, [])

  async function list(name) {
   
    const filtro = {
      fantasy: "%" + name + "%",
      corporatename: "%",
      document: "%",
      page: 0,
      pageSize: 5

    }

    await api.post('/afflited/byparam', filtro, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    })
      .then((response) => {
        setObjects(response.data.tutorials)
        setTotalPages(response.data.totalItems)

      }).catch((err) => {
        console.log(err)
      })

  }

  async function handleAfterDel(e) {

    await api.delete('/afflited/delete/' + idSelected, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    })
      .then((response) => {
        list(name)
        toast.success("Operação realizada com sucesso!", {
          autoClose: 1000,
        })
      }).catch((err) => {
        console.log(err)
      })
  }
  function afterSubmit(e) {
    e.preventDefault()
    list(name)

  }
  return (
    <form onSubmit={afterSubmit}>

      <div className="p-3 mb-3 bg-white border rounded-3">

        <div className='afflitedsfilter'>
          <h5 className="card-content-title fw-semibold">{props.listTitle}</h5>
          <Link to={"/affliteds/new"} className="btn btn-primary text-light "><AiFillPlusSquare /> Novo Afiliado</Link>
        </div>
        <hr className='my-4' />
        <div className="input-group mb-3 search-w">
          <TextField id="name" maxLength={50} className="form-control" label="Nome / Fantasia" variant="outlined" value={name || ''}
            onChange={(e) => setName(e.target.value)} onKeyUp={(e) => { list(name) }} />

          <div className='btn-create'>
            <button className="btn btn-primary text-light d-flex align-items-center" type="button" id="button-addon2" onClick={afterSubmit}>
              <VscSearch />
            </button>
          </div>
        </div>
        <div>
          <div className='table-responsive'>

            <table className="table">
              <tbody>

                <tr>
                  <th>
                    Nome
                  </th>
                  <th>
                    Telefone
                  </th>
                  <th>
                  </th>
                  <th>
                  </th>
                </tr>

                {objs.map((user) => {
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
                          <MyModal userId={user.id} uc=" o Filiado" onClick={handleAfterDel} />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
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
    </form>
  );
};

export default AfflitedDataTable;
