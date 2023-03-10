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
//PAGINATION
let PageSize = 10;


const AfflitedDataTable = (props) => {
  
  const [objs, setObjects] = useState([])
  const [name, setName] = useState([])
  const [totalPages, setTotalPages] = useState([])
  const [idSelected, setIdSelected] = useState([])
  
  const { token } = useContext(AuthContext)
  const navigate = useNavigate();

//Pagination
const [currentPage, setCurrentPage] = useState(1);

const currentTableData = useMemo(() => {
  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  return objs;
}, [currentPage, objs]);


function onPageChanged(data) {
 const filtro = {
   name:name,
   page:data-1,
   pageSize:10
   
 }
 

 const { currentPage, totalPages, pageLimit } = data;

 api.post('/afflited/byparam', filtro,{
   headers: {
     'Authorization': `Basic ${localStorage.getItem("token")}`
   }
 }).then((response) => {
   setObjects(response.data.tutorials)
   
 })
 setCurrentPage(data);
}
const paginate = ({ selected }) => {
  setCurrentPage(selected + 1);
};



 function edit(id){
  navigate("/affliteds/edit/"+id)
 }
  useEffect(() => {

    const storageUser = localStorage.getItem('cliente')


    list("%");
   // setUpdateUsers(false)

    return () => { }


  }, [])

  async function list(name) {
      
    if (token.token){
      localStorage.setItem("token",token.token)
    }
    //console.log(localStorage.getItem("token"))
    const filtro = {
      fantasy:"%"+name+"%",
      corporatename:"%",
      document:"%",
      page:0,
      pageSize:10

    }
    
    await api.post('/afflited/byparam', filtro,{
      headers: {
        'Authorization': `Basic ${localStorage.getItem("token")}`
      }
    })
      .then((response) => {
        //console.log(response.data.tutorials)
        setObjects(response.data.tutorials)
        setTotalPages(response.data.totalItems)

      }).catch((err) => {
        console.log(err)
      })
      
  }

  async function handleAfterDel(e){

    await api.delete('/afflited/delete/'+idSelected, {
      headers: {
        'Authorization': `Basic ${localStorage.getItem("token")}`
      }
    })
      .then((response) => {
        list(name)
        toast.success("Opera????o realizada com sucesso!",{
          autoClose: 1000,
        })
      }).catch((err) => {
        console.log(err)
      })
  }
  function afterSubmit(e){
    list(name)
    e.preventDefault()
  }

  
  return (
    <form onSubmit={afterSubmit}> 

    <div className="p-3 mb-3 bg-white border rounded-3">
      <h5 className="card-content-title fw-semibold">{props.listTitle}</h5>
      <hr className='my-4' />
      <div className="input-group mb-3 search-w">
        <input type="text" className="form-control" placeholder="Buscar Afiliado" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e) => setName(e.target.value)} />
        <div className='btn-create'>
        <button className="btn btn-primary text-light d-flex align-items-center" type="button" id="button-addon2" onClick={afterSubmit}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      
      </div>
      



       <div>
       <Link to={"/affliteds/new"} className="btn btn-primary text-light mais"><VscNewFile/></Link>
       </div>
       </div>

      <div>
        <div className='table-responsive'>
        <table className="table">
          <tbody>
            {objs.map((user) => {
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                        </svg>
                      </button>
                      <button type="button" className="btn btn-light btn-sm text-danger d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{
                        setIdSelected(user.id)
                      }}>

                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                          </svg>
                        </button>
                        <MyModal userId={user.id} uc=" o Filiado" onClick={handleAfterDel}/>
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

export default AfflitedDataTable;
