import { AuthContext } from '../../context/AuthContext';
import './productform.scss';
import { useState, useContext, useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputMask from 'react-input-mask';
import { redirect, useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import api from '../../api';
import {NumericFormat} from 'react-number-format';


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
  const [peso, setPeso] = useState('')
  const [dimensao, setDimensao] = useState('')
  const {Id} = useParams();
  const [idSelected,setIdSelected] = useState('')



  const { signUp, token } = useContext(AuthContext)
  const navigate = useNavigate();

  async function loadById(id) {

    try {
      const storageUser = localStorage.getItem('token')

      await api.get('/products/get/' + id, {
        headers: {
          'Authorization': `Basic ${storageUser}`
        }

      }).then((response) => {
        setCodigo(response.data.codef)
        setDescricao(response.data.description)
        setMarca(response.data.brand)
        setCategoria(response.data.category)
        setDescricaoTec(response.data.descriptionTec)
        setDescricaoAmigavel(response.data.descriptionFriendly)
        setGarantia(response.data.guarantee)
        setFornecedor(response.data.supplier)
        setPreco(response.data.price)
        setPeso(response.data.weight)
        setDimensao(response.data.dimenssion)
        setIdSelected(response.data.id)
        

        
      }).catch((error) => {
        toast.error(error.response.data.message)
      });

    } catch (err) {

    }


  }

  useEffect(() => {


    const storageUser = localStorage.getItem('cliente')
    if (Id){
    loadById(Id)
    }

    return () => { }

  }, [])

  function limpaCampos() {
    setCodigo('')
    setMarca('')
    setCategoria('')
    setDescricao('')
    setDescricaoTec('')
    setDescricaoAmigavel('')
    setGarantia('')
    setFornecedor('')
    setPreco('')
    setPeso('')
    setDimensao('')
  }
  async function saveProduct(codef,brand,category,description,descriptionTec,
  descriptionFriendly,garantia,fornecedor,preco,peso,dimensao,idSelected){
    const json = {codef: codef,
      description: description,
      brand: brand,
      category: category,
      descriptionTec: descriptionTec,
      descriptionFriendly: descriptionFriendly,
      guarantee:garantia,
      supplier:fornecedor,
      weight:parseFloat(peso.replace(',','.')),
      price:parseFloat(preco.replace(',','.')),
      dimenssion:dimensao, 
    }

   
    if (idSelected) {
      await api.patch('/products/update/'+idSelected, json
      , {
        headers: {
          'Authorization': `Basic ${token.token}`
        }

      }).then((response) => {
       // console.log(response.data.message)
       //toast.success(response.data.message).then(limpaCampos())
      }).catch(
        (response) => {
          toast.error(response.response.data.message)
          throw new Error() 

        }
      );

    }else {

    
  await api.post('/products/create', json
    , {
    headers: {
      'Authorization': `Basic ${token.token}`
    }

  }).then((response) => {
    ///console.log(response.data.message)
    toast.success('Opera????o realizada com sucesso');
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
         await saveProduct(codigo,marca,categoria,descricao,descricaoTec,
          descricaoAmigavel,garantia,fornecedor,preco,peso,dimensao,idSelected)
         navigate("/products");
         toast.success("Opera????o realizada com sucesso!",{
          autoClose: 1000,
        })
      
        }catch(error){
         console.log(error);
      }
      
    }

  }



  /*function validaCampos(codigo, marca, descricao, descricaoTec, descricaoAmigavel, garantia, fornecedor, preco, peso) {

    if (codigo !== '' && marca !== '' && descricao !== '') {
      return true
    if (descricaoTec !== '' && descricaoAmigavel !== '' && garantia !== '') {
      return true
    if (fornecedor !== '' && preco !== '' && peso !== '') {
      return true
    }
    else {
    return false
    }

  }
}    



/**/
  return (
    <div className="p-3 mb-3 bg-white border rounded-3">
      <ToastContainer />

      <h5 className="card-content-title fw-semibold">{props.listTitle}</h5>
      <p>Cadastre novos produtos para seus clientes.</p>
     
      <form className="row g-3" onSubmit={handleSave}>
        <div className="col-md-4">
          <label htmlFor="inputCodigo" className="form-label">
           C??digo
          </label>
          <input type="text"  maxLength={50} className="form-control" id="inputCodigo" value={codigo || ''} onChange={(e) => setCodigo(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputMarca" className="form-label">
            Marca
          </label>
          <input type="marca" maxLength={100} className="form-control" id="inputMarca" value={marca || ''} onChange={(e) => setMarca(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputCategoria" className="form-label">
            Categoria
          </label>
          <input type="categoria" maxLength={100} className="form-control" id="inputCategoria" value={categoria || ''} onChange={(e) => setCategoria(e.target.value)} />
        </div>
        <div className="col-md-12">
          <label htmlFor="descricao" className="form-label">
            Descri????o
          </label>
          <input type="descricao" maxLength={200} className="form-control" id="inputDescricao" value={descricao || ''} onChange={(e) => setDescricao(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputGarantia" className="form-label">
            Garantia
          </label>
          <input type="text" maxLength={100} className="form-control" id="inputGarantia" value={garantia || ''} onChange={(e) => setGarantia(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputFornecedor" className="form-label">
            Fornecedor
          </label>
          <input type="text" maxLength={100}className="form-control" id="inputFornecedor" value={fornecedor || ''} onChange={(e) => setFornecedor(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputPreco" className="form-label">
           Pre??o
          </label>
          <NumericFormat decimalScale={2} placeholder="" decimalSeparator="," className="form-control number" value={preco||''} onChange={(e) => setPreco(e.target.value)}/>
          </div>
        <div className="col-md-4">
          <label htmlFor="inputPeso" className="form-label">
           Peso (Kg)
          </label>
          
          <NumericFormat decimalScale={2} placeholder="" decimalSeparator=","className="form-control number" value={peso||''} onChange={(e) => setPeso(e.target.value)}/>
        </div>
        <div className="col-md-4">
          <label htmlFor="inputDimensao" className="form-label">
            Dimens??o
          </label>
          <input type="dimensao" className="form-control" id="inputDimensao" value={dimensao || ''} onChange={(e) => setDimensao(e.target.value)} />
        </div>
        <div className="col-md-12">
        <label htmlFor="inputDescricaoTec" className="form-label">
            Descri????o T??cnica 
          </label>
          <textarea type="text" maxLength={200} className="form-control" id="inputDescricaoTec" value={descricaoTec || ''} onChange={(e) => setDescricaoTec(e.target.value)} />
        </div>
        <div className="col-md-12">
          <label htmlFor="inputDescricaoAmigavel" className="form-label">
            Descri????o Amig??vel
          </label>
          <textarea type="text" maxLength={200} className="form-control" id="inputDescricaoAmigavel" value={descricaoAmigavel || ''} onChange={(e) => setDescricaoAmigavel(e.target.value)} />
        </div>
      
        <div className="d-grid gap-2 d-md-block col-12">
          <button className="btn btn-primary text-light" type="submit" >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;