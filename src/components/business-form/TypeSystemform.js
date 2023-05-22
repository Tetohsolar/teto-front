import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import TabelaProdutoEditavel from '../prods';
import api from '../../api';


import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Category } from "@mui/icons-material";

export default function SystemTypeform(props) {

  const searchSunIndexByCityState = async () => {
    try {
      

      let long = 0
      let lat = 0

      await api.post('/sunindex/get',
        { "city": props.dados.city, "state":props.dados.state }, {
        headers: {
          'Authorization': `Basic ${token}`
        }

      }).then((response) => {
        long = response.data.lon
        lat = response.data.lat
      
      }).catch(console.log("eror"))


      console.log("passou long e lat", long +"" + lat)
      const response = await  fetch('https://developer.nrel.gov/api/pvwatts/v8.json?api_key=gMkc2FocnfJ99EMRUZfgs52ZmG6ElrjFf7qs0FLb&lat=-3.6895&lon=-40.3485&azimuth=0&system_capacity=0.86&tilt=7&array_type=1&module_type=1&losses=0');
      const ret = await response.json();
     // setSunIndex(ret.outputs.ac_annual)
      props.dados.sunIndex = ret.outputs.ac_annual
    
    } catch (err) {
      console.log(err)

    }
  };
  const { token } = React.useContext(AuthContext)
  const [item, setItem] = React.useState("");

  const handleChange = (event) => {
    setItem(event.target.value);
  };
  const [marcas, setMarcas] = React.useState([])
  const [potenciaModulo, setPotenciaModulo] = React.useState('')
  const [idSelectedProd, setIdSelectedProd] = React.useState('')
  const [modeloInversor, setModeloInversor] = React.useState([])

  const [listCategory, setListCategory] = useState([])

  async function loadCategorys(type) {
    try {

      await api.get('/typesystem/all', {
        headers: {
          'Authorization': `Basic ${token}`
        }
      }).then((response) => {
        
        setListCategory(response.data.types)

      }).catch((error) => {
        console.log(error.response.data.message)
      });


    } catch (err) {
      console.log(err)

    }
  }

  const list = ["Item 1", "Item 2"];
  const [dadosProdutos, setDadosProdutos] = React.useState([
    {
      id: 1, type: "", brand: marcas, model: "", power: potenciaModulo, qtd: 1, brands: [], products: [], preco:0
    }
  ]);
  
  const handleEditProds = async (id, campo, valor) => {
    setDadosProdutos(prevDados => {
      const novoDados = [...prevDados];
      const index = novoDados.findIndex(item => item.id === id);
      novoDados[index][campo] = valor;
      return novoDados;
    });
  };
  const handleAddProd = () => {
    let idN = idProd + 1

    let novoItem =
    {
      id: idN, type: "1", brand: '', model: '', power: potenciaModulo, qtd: 1, preco:0
    }
    setIdProd(idN)
    setDadosProdutos(prevDados => [...prevDados, novoItem]);
  };
  const handleAfterDelProd = () => {

    const quantidadeItens = dadosProdutos.length;
    if (quantidadeItens > 1) {
      setDadosProdutos(prevDados => prevDados.filter(item => item.id !== idSelectedProd));
    }

  }
  const [idProd, setIdProd] = React.useState(1)

  const { businessId } = useParams();

  React.useEffect(() => {

    loadCategorys()
    //loadbId(businessId)

    if (props.dados.produtos){
      setDadosProdutos(props.dados.produtos)
    }

    
  }, [])

  async function loadbId() {

    await api.get('/business/get/' + businessId, {
      headers: {
        'Authorization': `Basic ${token}`
      }

    }).then((response) => {

      if (response.data.products.length > 0) {
        setDadosProdutos(response.data.products)
        for (let i = 0; i < response.data.products.length; i++) {
          onBlurMarca(response.data.products[i]);
          onBlurProdutoMarca(response.data.products[i]);
        }
      }

    }).catch((error) => { console.log(error) })

  }
  async function carregaPotencia(item) {
    console.log(item)

    if (item.model===""){
      
      setDadosProdutos(prevDados => {
        const novoDados = [...prevDados];
        const index = novoDados.findIndex(it => it.id === item.id);
        novoDados[index]["power"] = "";
        novoDados[index]["price"] = "";
        return novoDados;
      });
    return
    }
   
    const filtro = {
      codef: item.model.trim()
    }
   
    await api.post('/products/getpowerbycod/', filtro, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    }).then((response) => {
      console.log("aqui calculado")

      setDadosProdutos(prevDados => {
        const novoDados = [...prevDados];
        const index = novoDados.findIndex(it => it.id === item.id);
        novoDados[index]["power"] = response.data.power;
        novoDados[index]["price"] = response.data.price;
        if (parseInt(item.type)===3) {
        let sugg =  parseFloat(props.dados.suggestedGeneration);
      
        if (parseFloat(props.dados.rsuggestedGeneration)){
          sugg = sugg + parseFloat(props.dados.rsuggestedGeneration) 
        } 

       
        let potenciaConsiderada = props.dados.consideredpower

        console.log(potenciaConsiderada)

        let placas = Math.floor((sugg * 12000) / (potenciaConsiderada * response.data.power))
        console.log("PASSA AQUI " +placas)
        novoDados[index]["qtd"] = placas;}
        return novoDados;
      });
      props.dados.produtos = dadosProdutos
    })

  }
  async function onBlurMarca(item) {
    console.log("yipo é " + item.type)
    let type = item.type
    if (item.type !== "") {
      const filtro = {
        "type": type
      }

      console.log(filtro)
      await api.post('/brands/all', filtro, {
        headers: {
          'Authorization': `Basic ${token}`

        }
      }).then((response) => {
        setDadosProdutos(prevDados => {
          const novoDados = [...prevDados];
          const index = novoDados.findIndex(it => it.id === item.id);
          novoDados[index]["brands"] = response.data.brand;
          return novoDados;
        });
      }).catch((error) => {
      });

    }
    else {
      item["brands"] = []
    }
  }
  async function onBlurProdutoMarca(item) {

    let category = item.type
    console.log(item.type)
    const filtro = {
      brand: item.brand,
      category: category,
      "page": 0,
      "pageSize": 100
    }

    await api.post('/products/byparam', filtro, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    }).then((response) => {

      setDadosProdutos(prevDados => {
        const novoDados = [...prevDados];
        const index = novoDados.findIndex(it => it.id === item.id);
        novoDados[index]["products"] = response.data.tutorials;
        return novoDados;
      });
    })

  }
  return (
    <React.Fragment>
      <box>
       
        <div class="card">
                <div class="card-header">
                  Produtos que compõe o kit
                </div>

        <div className="card-body">
                <div className="row d-flex justify-content-start">
                    <div className="table-responsive">
                  
                      <TabelaProdutoEditavel token={token} dados={dadosProdutos} category={listCategory} handleEdit={handleEditProds}
                        handleAdd={handleAddProd} setIdSelected={setIdSelectedProd}
                        handleAfterDel={handleAfterDelProd} marcas={marcas} produtos={modeloInversor} onBlurType={onBlurMarca}
                        onBlurBrand={onBlurProdutoMarca} carregaPotencia={carregaPotencia}
                      />
                    </div>
                    </div>
                </div>
        </div>
      
      </box>
    </React.Fragment>
  );
}
