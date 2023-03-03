import './datatable.scss'
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react'
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';
import MyModal from './ModalDelete'
import Avatar from "boring-avatars";



const DataTable = (props) => {


  const { token } = useContext(AuthContext)

  const [users, setUsers] = useState([])
  const [userDel, setUserDel] = useState([])

  const [updateUsers, setUpdateUsers] = useState(false)

  const { deleteUser } = useContext(AuthContext)


  async function updateStateUser(response) {
    let lista = [];
    const isCollectionEmpty = response.size == 0;
    if (!isCollectionEmpty) {

      let arr = Object.entries(response.users)
      arr.forEach((([key, value]) => (
        lista.push({
          id: value.id,
          name: value.name,
          imagem: value.imagem,
          email: value.email,

        }))

      ))
    }
    setUsers(users => [...lista])
  }

  useEffect(() => {

    const storageUser = localStorage.getItem('cliente')


    async function listaUsers() {
      await api.get('/user/all', {
        headers: {
          'Authorization': `token ${storageUser.token}`
        }
      })
        .then((response) => {

          updateStateUser(response.data)

        }).catch((err) => {
          console.log(err)
        })


    }
    listaUsers();
    setUpdateUsers(false)

    return () => { }


  }, [updateUsers])


  // async function handleDeleteUser(user) {
  //   deleteUser(user.id)
  //   console.log(user)
  //   setUpdateUsers(true)

  // }


  //set user to modal and update user list after 2 seconds
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
    setUpdateUsers(false)
  }




  return (
    <div className="p-3 mb-3 bg-white border rounded-3">

      <h5 className="card-content-title fw-semibold">{props.listTitle}</h5>
      <p>Crie novos usuários para acessar sua conta.</p>
      <hr className="my-4" />
      <div className="input-group mb-3 search-w">
        <input type="text" className="form-control" placeholder="Buscar..." aria-label="Recipient's username" aria-describedby="button-addon2" />
        <button className="btn btn-primary text-light d-flex align-items-center" type="button" id="button-addon2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </div>
      <div>
        <div className="table-responsive">
          <table className="table">
            <tbody>
              {users && users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td className="td-img">
                      <img className="table-avatar" src={"https://api.dicebear.com/5.x/thumbs/svg?seed=Lucy"} alt="Avatar" />
                    </td>
                    <td className="td-img"><Avatar size={32} name="Mary Baker" variant="beam" colors={["#8B8B8B", "#C5C5C5"]} /></td>
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
                      <div className="d-flex gap-2 justify-content-end">

                        {/* <Link to={`/users/edit/`}>

                          <button type="button" onClick={() => setStorageUserLocal(user)} className="btn btn-light btn-sm text-primary d-flex align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                            </svg>
                          </button>
                        </Link> */}

                        <Link to={`/users/edit/${user.id}`}>
                          <button type="button" onClick={() => setStorageUserLocal(user)} className="btn btn-light btn-sm text-primary d-flex align-items-center">
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

                        {/* <button type="button" onClick={() => handleDeleteUser(user)} className="btn btn-light btn-sm text-danger d-flex align-items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                          </svg>
                        </button> */}




                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Link to={"/users/new"} className="btn btn-primary text-light">
        Criar novo usuário
      </Link>



    </div>
  );
};

export default DataTable;


