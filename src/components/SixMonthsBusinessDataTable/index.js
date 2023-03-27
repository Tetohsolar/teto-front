import './style.scss'
import NewBusiness from '../../pages/business/new';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import Pagination from '../pagination/Pagination';



const SixMonthsBusinessDataTable = (props) => {
  const PageSize= 5
  const [objs, setObjects] = useState([])
  const [totalPages, setTotalPages] = useState([])
  const { token } = useContext(AuthContext)
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {

    list("%");
    
 
   return () => { }
 
 
 }, [])

 function onPageChanged(data) {


  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const currentDate = `${year}-${month}-${'01'}`;
  const lastDay = new Date(year, month, 0).getDate();
  const EndDate = `${year}-${month.toString().padStart(2, '0')}-${lastDay.toString().padStart(2, '0')}`;
    const filtro = {
      fantasy: "%",
      document: "%",
      page: data-1,
      pageSize: 5, 
      number: "%",
      dateSt:currentDate,
      dateEnd:EndDate
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
 async function list(){

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const currentDate = `${year}-${month}-${'01'}`;
  const lastDay = new Date(year, month, 0).getDate();
  const EndDate = `${year}-${month.toString().padStart(2, '0')}-${lastDay.toString().padStart(2, '0')}`;
    const filtro = {
      fantasy: "%",
      document: "%",
      page: 0,
      pageSize: 5, 
      number: "%",
      dateSt:currentDate,
      dateEnd:EndDate
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

  const totalValue = totalPages
  return (
    <div className="p-3 mb-3 bg-white rounded-3">
      <h5 className="card-content-title mb-3 fw-semibold">{props.listTitle}</h5>
      <NewBusiness />
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
                          <td>{format(new Date(item.createdAt),'dd/MM/yyyy')}</td>
                          <td><span className="badge rounded-pill text-bg-lightblue text-primary">{item.situation}</span></td>
                          <td className='alinhadaDireita'>{item.systempower}</td>
                          <td className='alinhadaDireita'>{formatter.format(item.amount)}</td>
                          <td>
                            <div className="d-flex gap-2 justify-content-end">
                              <button
                                type="button"
                                className="btn btn-light btn-sm text-primary d-flex align-items-center"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                                  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                                </svg>
                              </button>
                              <button
                                type="button"
                                className="btn btn-light btn-sm text-primary d-flex align-items-center"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-pencil-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className ='pagidireita'>
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

export default SixMonthsBusinessDataTable;
