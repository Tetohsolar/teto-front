import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import TabelaProdutoEditavel from '../../components/prods';
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

export default function SystemTypeform() {
  const { token } = React.useContext(AuthContext)
  const [item, setItem] = React.useState("");

  const handleChange = (event) => {
    setItem(event.target.value);
  };
  const [marcas, setMarcas] = React.useState([])
  const [potenciaModulo, setPotenciaModulo] = React.useState('465')
  const [idSelectedProd, setIdSelectedProd] = React.useState('')
  const [modeloInversor, setModeloInversor] = React.useState([])

  const list = ["Item 1", "Item 2"];
  const [dadosProdutos, setDadosProdutos] = React.useState([
    {
      id: 1, type: "", brand: marcas, model: "", power: potenciaModulo, qtd: 1, brands: [], products: []
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
      id: idN, type: "Placa", brand: '', model: '', power: potenciaModulo, qtd: 1
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

    console.log(item.model)
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
        return novoDados;
      });
    })

  }
  async function onBlurMarca(item) {

    if (item.type !== "") {
      let type = "M"
      if (item.type === "P") {
        type = "P";
      }
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

    let category = "Nenhum"
    if (item.type === "P") {
      category = "Placa"
    }
    else if (item.type === "I") {
      category = "Inversor"
    } else if (item.type === "M") {
      category = "Microinversor"
    }

    const filtro = {
      brand: item.brand,
      category: category,
      "page": 0,
      "pageSize": 100
    }

    console.log(filtro)
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
                      <TabelaProdutoEditavel token={token} dados={dadosProdutos} handleEdit={handleEditProds}
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
