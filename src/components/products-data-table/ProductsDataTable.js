import './products-data-table.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext, useMemo } from 'react';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';
import MyModal from '../communs/ModalDelete';
import { toast } from 'react-toastify';
import Pagination from '../pagination/Pagination';
import { VscNewFile, VscSearch } from "react-icons/vsc";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";


//PAGINATION
let PageSize = 5;

const ProductsDataTable = (props) => {

  const [totalPages, setTotalPages] = useState([])
  const [products, setProducts] = useState([])
  const [name, setName] = useState([])
  const [idSelected, setIdSelected] = useState([])
  const [brand, setBrand] = useState([])
  const [category, setCategory] = useState([])



  const { token } = useContext(AuthContext)
  const navigate = useNavigate();


  //Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return products;
  }, [currentPage, products]);

  function onPageChanged(data) {
    const filtro = {
      description: name,
      brand: brand,
      category: category,
      page: data - 1,
      pageSize: 5
    }

    const { } = data;

    api.post('/products/byparam', filtro, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    }).then((response) => {
      setProducts(response.data.tutorials)

    })
    setCurrentPage(data);

  };


  function edit(id) {
    navigate("/products/edit/" + id)
  }
  useEffect(() => {

    list("%");
   
    return () => { }

  }, [])

  async function list(name) {
    const filtro = {
      codef: "%",
      brand: "%" + brand + "%",
      category: "%" + category + "%",
      description: "%" + name + "%",
      descriptionTec: "%",
      descriptionFriendly: "%",
      page: 0,
      pageSize: 5
    }

    await api.post('/products/byparam', filtro, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    })
      .then((response) => {
        setProducts(response.data.tutorials)
        setTotalPages(response.data.totalItems)

      }).catch((err) => {
        console.log(err)
      })

  }

  async function handleAfterDel(e) {

    await api.delete('/products/delete/' + idSelected, {
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
  function handleSeach(e) {
    list(name)
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSeach}>
      <div className="p-3 mb-3 bg-white border rounded-3">
        <h5 className="card-content-title fw-semibold">{props.listTitle}</h5>
        <hr className='my-4' />
        <div className="input-group">
          <div className='filtro'>
          <div className="col-md-5">
            <input type="text" className="form-control" placeholder="Descrição" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e) => setName(e.target.value)} />
           </div> 
           <div className="col-md-4">
            <select name="pets" id="input-user-type" className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Selecionar...</option>
            <option value="Inversor">Inversor</option>
            <option value="Microinversor">Microninversor</option>
            <option value="Placa">Placa</option>
          </select>
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Marca" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e) => setBrand(e.target.value)} />
          </div>
          </div>
          <div className='btn-create' id="btn-create">
            <button className="btn btn-primary text-light d-flex align-items-center" type="button" id="button-addon2" onClick={handleSeach}>
              <VscSearch />
            </button>
            <Link to={"/products/new"} className="btn btn-primary text-light"><VscNewFile /></Link>
          </div>
        </div>
        <div>
          <div className='table-responsive'>
            <table className="table">
              <tbody>
                <tr className='cab1'>
                <th className='cab2'>Descrição</th>
                <th className='cab3'>Categoria</th>

                <th>Marca</th>


                </tr>
                {currentTableData && currentTableData.map((obj) => {
                  return (
                    <tr key={obj.id}>
                      <td>{obj.description}</td>
                      <td>{obj.category}</td>
                      <td>{obj.brand}</td>
                      <td>
                        <div className="d-flex gap-2 justify-content-end">
                          <button type="button" className="btn btn-light btn-sm text-primary d-flex align-items-center" onClick={() => {
                            edit(obj.id)
                          }}>
                            <BsFillPencilFill />
                          </button>
                          <button type="button" className="btn btn-light btn-sm text-danger d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
                            setIdSelected(obj.id)
                          }}>

                            <BsFillTrash3Fill />
                          </button>
                          <MyModal userId={obj.id} uc=" o Produto" onClick={handleAfterDel} />
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

export default ProductsDataTable;
