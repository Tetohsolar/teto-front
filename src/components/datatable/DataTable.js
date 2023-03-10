import './datatable.scss'
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext, useMemo } from 'react'
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';
import MyModal from './ModalDelete'
import ReactPaginate from 'react-paginate';
import Pagination from '../pagination/Pagination';
import { VscNewFile,VscSearch, VscEdit } from "react-icons/vsc";


//PAGINATION
let PageSize = 10;

const DataTable = (props) => {


  const { token } = useContext(AuthContext)

  const [users, setUsers] = useState([])
  const [userDel, setUserDel] = useState([])
  const [userFind, setUserFind] = useState('')
  const [page, setPage] = useState(1)
  const [updateUsers, setUpdateUsers] = useState(false)




  //Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return users;
  }, [currentPage, users]);

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };


  //call  all users when start page
  useEffect(() => {
    console.log('chamou')

    async function listaUsers() {
      setUpdateUsers(true)
      await api.get('/user/all', {
        headers: {
          'Authorization': `token ${token.token}`
        }
      }).then((response) => {

        setUsers(response.data.users)

      }).catch((err) => {
        console.log(err)
      })
    }
    listaUsers();
    setUpdateUsers(false)
  }, [updateUsers])





  //find user 
  async function handleSearchUser() {
    let lista = []
    let filtro = {
      "name": "%" + userFind + "%",
      "email": "%",
      "page": 0,
      "pageSize": 5
    }
    if (userFind != null) {
      await api.post('/user/byparam', filtro, {
        headers: {
          'Authorization': `token ${token.token}`
        }
      })
        .then((response) => {
          setUsers(response.data.users)
        }).catch((err) => {
          console.log(err)
        })

    }
    else {
      await api.get('/user/all', {
        headers: {
          'Authorization': `token ${token.token}`
        }
      }).then((response) => {

        setUsers(response.data.users)

      }).catch((err) => {
        console.log(err)
      })

    }


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


  return (
    <div className="p-3 mb-3 bg-white border rounded-3 container">

      <h5 className="card-content-title fw-semibold">{props.listTitle}</h5>
      <p>Crie novos usu??rios para acessar sua conta.</p>
      <hr className="mnpm i bootstrap-icons-4" />
      <div className="input-group mb-3 search-w">
        <input type="text" className="form-control"
          onChange={(e) => setUserFind(e.target.value)}
          placeholder="Buscar..." aria-label="Recipient's username"
          aria-describedby="button-addon2" />
        <div className='btn-create'>
        <button className="btn btn-primary text-light d-flex align-items-center"
          onClick={(e) => { handleSearchUser(e) }}
          type="button" id="button-addon2">
         <VscSearch/>
        </button>
      </div>

      <Link to={"/users/new"} className="btn btn-primary text-light">
      <VscNewFile/>
      </Link>
      </div>
      
      <div className="table-w">
        <div className="table-responsive">
          <table className="table table-borderless">

            <tbody>

              {currentTableData && currentTableData.map((user) => {
                return (

                  <tr key={user.id}>
                    <td className="td-img">
                      <img className="table-avatar" src={"https://api.dicebear.com/5.x/thumbs/svg?seed=Lucy"} alt="Avatar" />
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
                          <VscEdit/>
                          </button>
                        </Link>
                        <button type="button" class="btn btn-light btn-sm text-danger d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e) => updateListUser(user)}>

                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                          </svg>
                        </button>
                        <MyModal userId={userDel.id} />
                      </div>
                    </td>
                  </tr>


                );

              })}
            </tbody>
          </table>
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={users.length}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)}
          />


        </div>
      </div>
      <Link to={"/users/new"} className="btn btn-primary text-light">
        Criar novo usu??rio
      </Link>



    </div >
  );
};

export default DataTable;