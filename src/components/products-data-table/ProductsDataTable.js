import './products-data-table.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext, useMemo } from 'react';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';
import MyModal from '../communs/ModalDelete';
import { toast } from 'react-toastify';
import Pagination from '../pagination/Pagination';
import { VscSearch } from "react-icons/vsc";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import { AiFillPlusSquare } from "react-icons/ai";
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';


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
  const [brands, setBrands]= useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return products;
  }, [currentPage, products]);

  const [listCategory, setListCategory] = useState([])

  async function loadCategorys(type) {
    try {

      await api.get('/typesystem/all', {
        headers: {
          'Authorization': `Basic ${token}`
        }
      }).then((response) => {
        setListCategory(response.data.types)}).catch((error) => {
        toast.error(error.response.data.message)
      });


    } catch (err) {
      console.log(err)

    }
  }

  async function loadBrands(type) {
    try {

      const filtro = {
        "type": '%'
      }
      await api.post('/brands/all', filtro,{
        headers: {
          'Authorization': `Basic ${token}`
        }
      }).then((response) => {
        console.log(response.data.brand)
        setBrands(response.data.brand)

      }).catch((error) => {
        toast.error(error.response.data.message)
      });


    } catch (err) {
      console.log(err)

    }
  }

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

    loadCategorys()
    loadBrands()

    list("%");

    return () => { }

  }, [])

  async function list(name) {
    const filtro = {
      codef: "%",
      brand: brand,
      category: category,
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

  function find() {
    list("%")
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
        <div className='containerCustom'>
          <h5 className="card-content-title fw-semibold">{props.listTitle}</h5>
          <Link to={"/products/new"} className="btn btn-primary text-light"><AiFillPlusSquare /> Novo produto</Link>
        </div>
        <hr className='my-4' />
        <div className="input-group">
          <div className='filtro'>
            <div className="col-md-5 descprod">

              <TextField id="name" maxLength={50} className="form-control " label="Descrição" variant="outlined" value={name || ''} onChange={(e) => setName(e.target.value)} onKeyUp={(e) => { list(name) }} />

            </div>

            <div className="col-md-3 categoria">

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Categoria"
                  onChange={(e) => setCategory(e.target.value)}
                  onBlur={(e)=>find() }
                >
                  <MenuItem value="" >...</MenuItem>
                  {listCategory ? listCategory.map((option) => (<MenuItem key={option.id} value={option.id} >{option.name}</MenuItem>)) : ""}

                </Select>
              </FormControl>
            </div>

            <div className="col-md-3">

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Marca</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={brand}
                  label="Marca"
                  onChange={(e) => setBrand(e.target.value)
                  }
                  onBlur={(e)=>find()}
                >
                   <MenuItem value="" >...</MenuItem>
                  {brands ? brands.map((option) => (<MenuItem key={option.id} value={option.name} >{option.name}</MenuItem>)) : ""}

                </Select>
              </FormControl>
            </div>
            <div className='btn-create' id="btn-create">
            <button className="btn btn-primary text-light d-flex align-items-center" type="button" id="button-addon2" onClick={handleSeach}>
              <VscSearch />
            </button>
          </div>
          </div>
          
        </div>
        <div>
          <div className='table-responsive'>
            <br></br>
            <br></br>
            <table className="table">
              <tbody>
                <tr className='cab1'>
                  <th className='cab2'>Descrição</th>
                  <th className='cab3'>Categoria</th>

                  <th>Marca</th>
                  <th>

                  </th>

                </tr>
                {currentTableData && currentTableData.map((obj) => {
                  return (
                    <tr key={obj.id}>
                      <td>{obj.description}</td>
                      <td>{obj.TypeSystem.name}</td>
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
            <div className='paginationCustomer'>
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

export default ProductsDataTable;
