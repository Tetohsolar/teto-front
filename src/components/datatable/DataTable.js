import './datatable.scss'
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext, useMemo } from 'react'
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';
import MyModal from './ModalDelete'
import Pagination from '../pagination/Pagination';

//PAGINATION
let PageSize = 5;

const DataTable = (props) => {


  const { token } = useContext(AuthContext)

  const [users, setUsers] = useState([])
  const [userDel, setUserDel] = useState([])
  const [userFind, setUserFind] = useState('')
  const [updateUsers, setUpdateUsers] = useState(false)
  const [totalPages, setTotalPages] =useState([])

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return users;
  }, [currentPage, users]);

  function onPageChanged(data) {
    const filtro = {
      name:userFind,
      page:data-1,
      pageSize:5
    }
    console.log(userFind);

    
    api.post('/user/byparam', filtro,{
      headers: {
        'Authorization': `Basic ${localStorage.getItem("token")}`
      }
    }).then((response) => {
      //console.log(response.data.users)
      setUsers(response.data.users)
      setCurrentPage(data);  
    })
    
  }
   const paginate = ({ selected }) => {
     setCurrentPage(selected + 1);
   };


   async function listaUsers() {
    setUpdateUsers(true)
    const filtro = {
      name:userFind,
      page:0,
      pageSize:5
    }

    
    await api.post('/user/byparam', filtro, {
      headers: {
        'Authorization': `Basic ${localStorage.getItem("token")}`
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


  return (
    <div className="p-3 mb-3 bg-white border rounded-3 container">

      <h5 className="card-content-title fw-semibold">{props.listTitle}</h5>
      <p>Crie novos usuários para acessar sua conta.</p>
      <hr className="mnpm i bootstrap-icons-4" />
      <div className="input-group mb-3 search-w">
        <input type="text" className="form-control"
          onChange={(e) => setUserFind(e.target.value)}
          placeholder="Buscar..." aria-label="Recipient's username"
          aria-describedby="button-addon2" />

        <button className="btn btn-primary text-light d-flex align-items-center"
          onClick={(e) => { handleSearchUser(e) }}
          type="button" id="button-addon2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                            </svg>
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
            totalCount={totalPages}
            pageSize={PageSize}
            onPageChange={page => onPageChanged(page)}
          />


        </div>
      </div>
      <Link to={"/users/new"} className="btn btn-primary text-light">
        Criar novo usuário
      </Link>



    </div >
  );
};

export default DataTable;