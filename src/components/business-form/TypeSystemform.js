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

export default function SystemTypeform() {
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
    loadbId(businessId)
    
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
    console.log("modelo"+item.model)

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
    console.log("passou do if")
    const filtro = {
      codef: item.model.trim()
    }
    await api.post('/products/getpowerbycod/', filtro, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    }).then((response) => {

      setDadosProdutos(prevDados => {
        const novoDados = [...prevDados];
        const index = novoDados.findIndex(it => it.id === item.id);
        novoDados[index]["power"] = response.data.power;
        novoDados[index]["price"] = response.data.price;
        return novoDados;
      });
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
        <Typography variant="h6" gutterBottom>
          Itens do Kit
        </Typography>
        
        <Paper variant="outlined" sx={{ p: { xs: 10, md: 3 }, mt: 5 }}>
          <div className="row">
            <div className="mb-3 mb-sm-0">
              <div className="card border-light-subtle">
                <div className="card-body">
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                      <TabelaProdutoEditavel token={token} dados={dadosProdutos} category={listCategory} handleEdit={handleEditProds}
                        handleAdd={handleAddProd} setIdSelected={setIdSelectedProd}
                        handleAfterDel={handleAfterDelProd} marcas={marcas} produtos={modeloInversor} onBlurType={onBlurMarca}
                        onBlurBrand={onBlurProdutoMarca} carregaPotencia={carregaPotencia}
                      />
                    </Grid>

                  </Grid>
                </div>
              </div>
            </div>
          </div>
          

        </Paper>
      </box>
    </React.Fragment>
  );
}
