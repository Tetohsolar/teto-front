import { AuthContext } from '../../context/AuthContext';
import './productform.scss';
import { useState, useContext, useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import api from '../../api';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import DecimalMaskedTextField from '../communs/DecimalMaskedTextField';
import { BsPlusLg } from "react-icons/bs";
import EditBrand from '../modalBrand';
import EditCategory from '../modalCategory';



const ProductForm = (props) => {
  const [codigo, setCodigo] = useState('')
  const [marca, setMarca] = useState('')
  const [categoria, setCategoria] = useState('')
  const [descricao, setDescricao] = useState('')
  const [descricaoTec, setDescricaoTec] = useState('')
  const [descricaoAmigavel, setDescricaoAmigavel] = useState('')
  const [garantia, setGarantia] = useState('')
  const [fornecedor, setFornecedor] = useState('')
  const [preco, setPreco] = useState('')
  const [pot, setPotencia] = useState('')
  const [peso, setPeso] = useState('')
  const [dimensao, setDimensao] = useState('')
  const [hiddenmarca, setHiddenMarca] = useState('')
  const { Id } = useParams();
  const [idSelected, setIdSelected] = useState('')
  const { signUp, token } = useContext(AuthContext)
  const navigate = useNavigate();
  const [brands, setBrands] = useState('')
  const [listCategory, setListCategory] = useState([])

  async function loadCategorys(type) {
    try {

      await api.get('/typesystem/all', {
        headers: {
          'Authorization': `Basic ${token}`
        }
      }).then((response) => {
        console.log(response.data.types)
        setListCategory(response.data.types)

      }).catch((error) => {
        toast.error(error.response.data.message)
      });


    } catch (err) {
      console.log(err)

    }
  }
  async function loadBrandByProduct(type) {
    try {
      const filtro = {
        "type": '%'
      }


      await api.post('/brands/all', filtro, {
        headers: {
          'Authorization': `Basic ${token}`
        }
      }).then((response) => {
        setBrands(response.data.brand)

      }).catch((error) => {
        toast.error(error.response.data.message)
      });


    } catch (err) {
      console.log(err)

    }
  }

  async function loadById(id) {
    try {

      await api.get('/products/get/' + id, {
        headers: {
          'Authorization': `Basic ${token}`
        }

      }).then((response) => {
        setCodigo(response.data.codef)
        setDescricao(response.data.description)
        
        setCategoria(response.data.TypeSystemId)
       
        setMarca(response.data.brand)
        setDescricaoTec(response.data.descriptionTec)
        setDescricaoAmigavel(response.data.descriptionFriendly)
        setGarantia(response.data.guarantee)
        setFornecedor(response.data.supplier)
        setPreco(response.data.price)
        setPeso(response.data.weight)
        setDimensao(response.data.dimenssion)
        setIdSelected(response.data.id)
        setPotencia(response.data.power)

      }).catch((error) => {
        toast.error(error.response.data.message)
      });

    } catch (err) {
      console.log(err)

    }
  }

  useEffect(() => {
    loadCategorys()
    loadBrandByProduct()
    if (Id) {
      loadById(Id)
    }
    return () => { }

  }, [])

  function limpaCampos() {
    setCodigo('')
    setMarca('P')
    setCategoria('Placa')
    setDescricao('')
    setDescricaoTec('')
    setDescricaoAmigavel('')
    setGarantia('')
    setFornecedor('')
    setPreco('')
    setPeso('')
    setDimensao('')
  }
  async function saveProduct(codef, brand, category, description, descriptionTec,
    descriptionFriendly, garantia, fornecedor, preco, peso, dimensao, idSelected, pot) {
    const json = {
      codef: codef,
      description: description,
      brand: brand,
      category: category,
      descriptionTec: descriptionTec,
      descriptionFriendly: descriptionFriendly,
      guarantee: garantia,
      supplier: fornecedor,
      weight: parseFloat(String(peso).replace(',', '.')),
      price: parseFloat(String(preco).replace(',', '.')),
      dimenssion: dimensao,
      power: pot
    }

    if (idSelected) {
      await api.patch('/products/update/' + idSelected, json
        , {
          headers: {
            'Authorization': `Basic ${token}`
          }

        }).then((response) => {

        }).catch(
          (response) => {
            toast.error(response.response.data.message)
            throw new Error()
          }
        );

    } else {

      await api.post('/products/create', json
        , {
          headers: {
            'Authorization': `Basic ${token}`
          }

        }).then((response) => {

          toast.success('Operação realizada com sucesso');
        }).catch(
          (response) => {
            toast.error(response.response.data.message)
            throw new Error();

          }
        )
    }
  }
  async function handleSave(e) {

    e.preventDefault();

    if (true) {
      try {
        await saveProduct(codigo, marca, categoria, descricao, descricaoTec,
          descricaoAmigavel, garantia, fornecedor, preco, peso, dimensao, idSelected, pot)
        navigate("/products");
        toast.success("Operação realizada com sucesso!", {
          autoClose: 1000,
        })

      } catch (error) {
        console.log(error);
      }
    }
  }

  async function loadBrand(cat, brand) {
    if (categoria) {
      cat = categoria
      console.log("aqui")
    }

    if (cat === "Inversor") {
      cat = "M"
    } else
      if (cat === "Microinversor") {
        cat = "M"
      }
      else {
        cat = "P"
      }
    await loadBrandByProduct(cat).then(setMarca(brand))
  }
  return (
    <div className="p-3 mb-3 bg-white border rounded-3">
      <ToastContainer />
      <h5 className="card-content-title fw-semibold">{props.listTitle}</h5>
      <p>Cadastre novos produtos para seus clientes.</p>

      <form className="row g-3" onSubmit={handleSave}>
        <div className="col-md-4">

          <TextField id="inputCodigo*" maxLength={50} className="form-control" label="Código*" variant="outlined" value={codigo || ''} onChange={(e) => setCodigo(e.target.value)} />

        </div>


        <div className="col-md-3">

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Categoria*</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categoria}
              label="Categoria"
              onChange={(e) => setCategoria(e.target.value)}
              onClick={loadBrand}
            >


              {
                listCategory.length &&
                listCategory.map((option, i) => {
                  return (<MenuItem key={i} value={option.id}>{option.name}</MenuItem>)
                })
              }
            </Select>
          </FormControl>
        </div>
        <div className="col-md-1">
        <button  type="button" className="btn btn-light btn-sm text-danger d-flex align-items-center"
        data-bs-toggle="modal" data-bs-target="#modalBrand"> <BsPlusLg/> </button>
        <EditCategory  businessId={Id} uc="" reloadBrands={loadCategorys} />
        </div>

        <div className="col-md-3">

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Marca*</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={marca}
              label="inputMarca"
              onChange={(e) => setMarca(e.target.value)}
              

            >

              {
                brands.length &&
                brands.map((option, i) => {
                  return (<MenuItem key={i} value={option.name}>{option.name}</MenuItem>)
                })
              }
              
             
            </Select>
          </FormControl>

          
        </div>
        <div className="col-md-1">
        <button  type="button" className="btn btn-light btn-sm text-danger d-flex align-items-center"
        data-bs-toggle="modal" data-bs-target="#modalBrand"> <BsPlusLg/> </button>
        <EditBrand  businessId={Id} uc="" reloadBrands={loadBrandByProduct} />
        </div>


        <div className="col-md-11">

          <TextField id="inputCodigo*" maxLength={50} className="form-control" label="Descrição*" variant="outlined" value={descricao || ''} onChange={(e) => setDescricao(e.target.value)} />

        </div>
        <div className="col-md-5">

          <TextField id="inputFornecedor" maxLength={50} className="form-control" label="Fornecedor" variant="outlined" value={fornecedor || ''} onChange={(e) => setFornecedor(e.target.value)} />


        </div>
        <div className="col-md-6">
          <TextField id="inputGarantia" maxLength={50} className="form-control" label="Garantia" variant="outlined" value={garantia || ''} onChange={(e) => setGarantia(e.target.value)} />
        </div>

        <div className="col-md-2">

          <DecimalMaskedTextField className='number' label="Preço*" variant="outlined" value={preco || ''} onChange={(e) => setPreco(e.target.value)}> </DecimalMaskedTextField>

        </div>
        <div className="col-md-2">

          <DecimalMaskedTextField className='number' label="Potência*" variant="outlined" value={pot || ''} onChange={(e) => setPotencia(e.target.value)}> </DecimalMaskedTextField>
        </div>
        <div className="col-md-2">

          <DecimalMaskedTextField className='number' label="Peso (kg)" variant="outlined" value={peso || ''} onChange={(e) => setPeso(e.target.value)}> </DecimalMaskedTextField>

        </div>
        <div className="col-md-5">
          <FormControl fullWidth>
            <TextField maxLength={300} label="Dimensão" variant="outlined" value={dimensao || ''} onChange={(e) => setDimensao(e.target.value)}> </TextField>
          </FormControl>
        </div>
        <div className="col-md-11">

          <TextField id="inputGarantia" maxLength={50} className="form-control" label="Descrição Técnica" variant="outlined" value={descricaoTec || ''} onChange={(e) => setDescricaoTec(e.target.value)} />

        </div>
        <div className="col-md-11">

          <TextField id="inputGarantia" maxLength={50} className="form-control" label="Descrição Amigável" variant="outlined" value={descricaoAmigavel || ''} onChange={(e) => setDescricaoAmigavel(e.target.value)} />
        </div>
        <div className="d-grid gap-2 d-md-block col-12">
          <div className="customerCliente">
            <button className="btn btn-primary text-light" type="submit" >
              Salvar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;