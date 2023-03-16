import './customer-data-table.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext, useMemo } from 'react';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';
import MyModal from '../communs/ModalDelete';
import { toast } from 'react-toastify';
import Pagination from '../pagination/Pagination';
import { VscNewFile, VscSearch } from "react-icons/vsc";
import { BsFillPencilFill } from "react-icons/bs";

//PAGINATION
let PageSize = 5;

const CustomerDataTable = (props) => {
  
  const [clientes, setClientes] = useState([])
  const [name, setName] = useState([])
  const [totalPages, setTotalPages] =useState([])

  

  const [idSelected, setIdSelected] = useState([])
  
  const { token } = useContext(AuthContext)
  const navigate = useNavigate();

   //Pagination
   const [currentPage, setCurrentPage] = useState(1);

   const currentTableData = useMemo(() => {
     const firstPageIndex = (currentPage - 1) * PageSize;
     const lastPageIndex = firstPageIndex + PageSize;
     return clientes;
   }, [currentPage, clientes]);
 
   
   function onPageChanged(data) {
    const filtro = {
      fantasy:name,
      corporatename:"",
      document:"",
      page:data-1,
      pageSize:5
    }


  
    api.post('/client/byparam', filtro,{
      headers: {
        'Authorization': `Basic ${localStorage.getItem("token")}`
      }
    }).then((response) => {
      setClientes(response.data.clients)
      
    })
    setCurrentPage(data);
  };

   
 function edit(id){
  navigate("/customers/edit/"+id)
 }
  useEffect(() => {



    listaUsers("%");
   // setUpdateUsers(false)

    return () => { }


  }, [])

  async function listaUsers(name) {
      
    if (token.token){
      localStorage.setItem("token",token.token)
      
    }
    //console.log(localStorage.getItem("token"))
    const filtro = {
      fantasy:name,
      corporatename:"",
      document:"",
      page:0,
      pageSize:5
    }
    
    await api.post('/client/byparam', filtro,{
      headers: {
        'Authorization': `Basic ${localStorage.getItem("token")}`
      }
    })
      .then((response) => {
        setClientes(response.data.clients)
        setTotalPages(response.data.totalItems)

      }).catch((err) => {
        console.log(err)
      })
      
  }

  async function handleAfterDel(e){

    await api.delete('/client/delete/'+idSelected, {
      headers: {
        'Authorization': `Basic ${localStorage.getItem("token")}`
      }
    })
      .then((response) => {
        listaUsers(name)
        toast.success("Operação realizada com sucesso!",{
          autoClose: 1000,
        })
      }).catch((err) => {
        console.log(err)
      })
  }
  function handleMask(e){
    listaUsers(name)
    setCurrentPage(1);
    e.preventDefault()
  }

  
  return (
    <form onSubmit={handleMask}> 
    <div className="p-3 mb-3 bg-white border rounded-3">
      <h5 className="card-content-title fw-semibold">{props.listTitle}</h5>
      <hr className='my-4' />
      <div className="input-group mb-3 search-w">
        <input type="text" className="form-control" placeholder="Buscar..." aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e) => setName(e.target.value)} />
        
        <div className='btn-create' id="btn-create">
        <button className="btn btn-primary text-light d-flex align-items-center" type="button" id="button-addon2" onClick={handleMask}>
          <VscSearch/>
      
        </button>
        <Link to={"/customers/new"} className="btn btn-primary text-light"><VscNewFile/></Link>
      </div>

      </div>
      <div>
        <div className='table-responsive'>
        <table className="table">
          <tbody>
            {currentTableData && currentTableData.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.fantasy}</td>
                  <td>{user.phone}</td>
                  <td><span className="badge bg-light text-secondary">{user.userType}</span></td>
                  <td>
                    <div className="d-flex gap-2 justify-content-end">
                      <button type="button" className="btn btn-light btn-sm text-primary d-flex align-items-center" onClick={()=>{
                        edit(user.id)
                      }}>
                        <BsFillPencilFill/>
                      </button>
                      <button type="button" className="btn btn-light btn-sm text-danger d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{
                        setIdSelected(user.id)
                      }}>

                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                          </svg>
                        </button>
                        <MyModal userId={user.id} uc=" o Cliente" onClick={handleAfterDel}/>
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
            onPageChange={ data => onPageChanged(data)}
          />


        </div>
      </div>
      
    </div>
    </form>
  );
};

export default CustomerDataTable;
