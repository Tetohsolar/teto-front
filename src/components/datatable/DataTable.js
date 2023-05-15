import './datatable.scss'
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext, useMemo } from 'react'
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';
import MyModal from './ModalDelete'
import Pagination from '../pagination/Pagination';
import { VscSearch } from 'react-icons/vsc';
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import { AiFillPlusSquare } from "react-icons/ai";
import { TextField } from '@mui/material';
let PageSize = 5;

const DataTable = (props) => {

 
  const { token, profilelogged,  afflitedId,idLogged} = useContext(AuthContext)

  const [users, setUsers] = useState([])
  const [userDel, setUserDel] = useState([])
  const [userFind, setUserFind] = useState('')
  const [updateUsers, setUpdateUsers] = useState(false)
  const [totalPages, setTotalPages] = useState([])
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return users;
  }, [currentPage, users]);

  function onPageChanged(data) {
    const filtro = {
      name: userFind,
      page: data - 1,
      pageSize: 5
    }

    if (profilelogged !== "Root"){

      filtro = {
        name: userFind,
        page: 0,
        pageSize: 5,
        AffiliatedId:afflitedId
      }
    }

    if (profilelogged === "User"){

      filtro = {
        name: userFind,
        page: 0,
        pageSize: 5,
        AffiliatedId:afflitedId,
        UserId:idLogged
      }
    }

    api.post('/user/byparam', filtro, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    }).then((response) => {

      setUsers(response.data.users)
      setCurrentPage(data);
    })

  }
  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };


  async function listaUsers() {
    setUpdateUsers(true)
    
    let filtro = {
      name: userFind,
      page: 0,
      pageSize: 5
    }

    if (profilelogged !== "Root"){

      filtro = {
        name: userFind,
        page: 0,
        pageSize: 5,
        AffiliatedId:afflitedId
      }
    }

    if (profilelogged === "User"){

      filtro = {
        name: userFind,
        page: 0,
        pageSize: 5,
        AffiliatedId:afflitedId,
        UserId:idLogged
      }
    }
    
    await api.post('/user/byparam', filtro, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    }).then((response) => {
      setUsers(response.data.users)
      setTotalPages(response.data.totalItems)
      setCurrentPage(1);

    }).catch((err) => {
      console.log(err)
    })
  }

  //call  all users when start page
  useEffect(() => {
    listaUsers();
    setUpdateUsers(false)
  }, [updateUsers])


  //find user 
  async function handleSearchUser() {
    listaUsers();

  }

  //set user to delete modal and update user list after 2 seconds
  function updateListUser(user) {
    setUpdateUsers(false)
    let myUser = {
      id: user.id,
      name: user.name
    }
    setUserDel(myUser)
    setTimeout((e) => {
      setUpdateUsers(true)
    }, 2000)


  }
  function handleMask(e) {
    listaUsers(users)
    setCurrentPage(1);
    e.preventDefault()
  }

  return (
    <form onSubmit={handleMask}>
      <div className="p-3 mb-3 bg-white border rounded-3 ">

        <div className='containerCustom'>
          <h5 className="card-content-title fw-semibold">{props.listTitle}</h5>
          <Link to={"/users/new"} className="btn btn-primary text-light"> <AiFillPlusSquare /> Novo usuário</Link>
        </div>
        <hr className='my-4' />
        <div className="input-group mb-3 search-w">

        <TextField id="name" maxLength={50} className="form-control" label="Buscar" variant="outlined" value={userFind || ''} 
        onChange={(e) => setUserFind(e.target.value)} onKeyUp={(e) => { listaUsers() }} />

          
          <div className='btn-create'>
            <button className="btn btn-primary text-light d-flex align-items-center" onClick={(e) => { handleSearchUser(e) }}> <VscSearch /></button>
          </div>

          <div>

          </div>
        </div>
        <div className="table-w">
          <div className="table-responsive">
            <table className="table ">

              <tbody>

                <tr>
                  <th>


                  </th>
                  <th className='nome1'>
                    Nome*

                  </th>

                  <th className='nome1'>
                    E-mail*
                  </th>
                  <th>

                  </th>
                  <th>

                  </th>

                </tr>

                {currentTableData && currentTableData.map((user) => {
                  return (

                    <tr key={user.id}>
                      <td className="td-img">
                        {/* <img className="table-avatar" src={"https://api.dicebear.com/5.x/thumbs/svg?seed=Lucy"} alt="Avatar" /> */}
                      </td>

                      <td>{user.name}</td>

                      <td>{user.email}</td>

                      <td>
                        <span className="badge bg-light text-secondary">
                          {user.userType}
                        </span>

                      </td>

                      <td>
                        <div className="d-flex gap-2">
                          <Link to={`/users/edit/${user.id}`}>
                            <button type="button" className="btn btn-light btn-sm text-primary d-flex align-items-center">
                              <BsFillPencilFill />
                            </button>
                          </Link>
                          <button type="button" className="btn btn-light btn-sm text-danger d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e) => updateListUser(user)}>

                            <BsFillTrash3Fill />
                          </button>
                          <MyModal userId={userDel.id} />
                        </div>

                      </td>

                    </tr>

                  );

                })}

              </tbody>

            </table>

            <div className='paginationCustomer'>
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={totalPages}
                pageSize={PageSize}
                onPageChange={page => onPageChanged(page)}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DataTable;