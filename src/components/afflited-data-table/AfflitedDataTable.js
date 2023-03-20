import './customer-data-table.scss'
import { Link, useNavigate } from 'react-router-dom';
import Avatar from "boring-avatars";
import { useEffect, useState, useContext, useMemo } from 'react';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';
import MyModal from '../communs/ModalDelete';
import { toast } from 'react-toastify';

import Pagination from '../pagination/Pagination';
import { VscNewFile } from "react-icons/vsc";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
let PageSize = 10;


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
      pageSize: 10

    }

    const { currentPage, totalPages, pageLimit } = data;

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
    console.log(token);
    const filtro = {
      fantasy: "%" + name + "%",
      corporatename: "%",
      document: "%",
      page: 0,
      pageSize: 10

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
    list(name)
    e.preventDefault()
  }


  return (
    <form onSubmit={afterSubmit}>

      <div className="p-3 mb-3 bg-white border rounded-3">
        <h5 className="card-content-title fw-semibold">{props.listTitle}</h5>
        <hr className='my-4' />
        <div className="input-group mb-3 search-w">
          <input type="text" className="form-control" placeholder="Buscar Afiliado"
            aria-label="Recipient's username" aria-describedby="button-addon2"
            onChange={(e) => setName(e.target.value)} onKeyUp={(e) => { list(name) }} />
          <div className='btn-create'>
            <button className="btn btn-primary text-light d-flex align-items-center" type="button" id="button-addon2" onClick={afterSubmit}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>

          </div>

          <div>
            <Link to={"/affliteds/new"} className="btn btn-primary text-light mais"><VscNewFile /></Link>
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
    </form>
  );
};

export default AfflitedDataTable;
