import * as React from "react";
import Grid from "@mui/material/Grid";
import TabelaProdutoEditavel from '../prods';
import api from '../../api';
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { useState } from "react";
import NumberFormatCustom from "../communs/DecimalMaskedTextField";

export default function SystemTypeform(props) {


  const { token } = React.useContext(AuthContext)
  const [marcas, setMarcas] = React.useState([])
  const [potenciaModulo, setPotenciaModulo] = React.useState('')
  const [idSelectedProd, setIdSelectedProd] = React.useState('')
  const [modeloInversor, setModeloInversor] = React.useState([])
  const [potenciaSistema, setPotenciaSistema] = React.useState('')
  const [nPlacas, setNplacas] = React.useState('')

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
      id: 1, type: "", brand: marcas, model: "", power: potenciaModulo, qtd: 1, brands: [], products: [], preco: 0
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
      id: idN, type: "", brand: '', model: '', power: potenciaModulo, qtd: 1, preco: 0
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

    let sugg = parseFloat(String(props.dados.rsuggestedDesired).replace(".", ''))

    //loadbId(businessId)
    if (props.dados.rsuggestedDesired===undefined ||props.dados.rsuggestedDesired==="" ){
      props.dados.rsuggestedDesired = props.dados.suggestedDesired
    }

    if (props.dados.possuirateio!==undefined &&props.dados.possuirateio==="S" ){
  
      sugg = parseFloat(props.dados.rsuggestedDesired)+parseFloat(props.dados.suggestedDesired)
     
    } else {
      props.dados.rsuggestedDesired = props.dados.suggestedDesired
    }
     
    console.log("MACAO",props.dados.rsuggestedDesired)
    console.log("MACAO",props.dados.suggestedDesired)
     
    if (props.dados.consideredpower===0){
       searchSunIndexByCityState();
    }

    if (props.dados.produtos) {
      
      let arrayJson= props.dados.produtos
      let Nplaca = 0
      let power = 0
     
      let potenciaConsiderada = props.dados.consideredpower
      
     //let placas = Math.floor((sugg * 12000)/())

      for (let j = 0; j < arrayJson.length; j++) {
        if (arrayJson[j].type === '3') {
          power = arrayJson[j].power
          let placas = Math.floor((sugg * 12000) / (potenciaConsiderada * power))
          Nplaca = placas
          arrayJson[j].qtd =placas
        }
      }

      setDadosProdutos(props.dados.produtos)
      props.dados.systempower = (Nplaca * power) / 1000
      setPotenciaSistema(props.dados.systempower)
      setNplacas(Nplaca)
      props.dados.Nplaca = Nplaca
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

    if (item.model === "") {

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
        if (parseInt(item.type) === 3) {
          let sugg = parseFloat(String(props.dados.rsuggestedDesired).replace(".", ''));

          let potenciaConsiderada = props.dados.consideredpower
          console.log("potencia")
          console.log(potenciaConsiderada)
          let placas = Math.floor((sugg * 12000) / (potenciaConsiderada * response.data.power))
          console.log("PASSA AQUI " + placas)
          novoDados[index]["qtd"] = placas;

          props.dados.nplacas = placas
          props.dados.potenciaSistema = (placas * response.data.power) / 1000
          props.dados.panelpower = novoDados[index]["power"]
          setPotenciaSistema(props.dados.potenciaSistema)
          setNplacas(props.dados.nplacas)

        }
        return novoDados;
      });
      props.dados.produtos = dadosProdutos
    })

  }


  const searchSunIndexByCityState = async () => {
    try {
      

      let long = 0
      let lat = 0
      let sunIndex = 0
     // console.log(props.dados.city,props.dados.state)

      await api.post('/sunindex/get',
        { "city": props.dados.city, "state":props.dados.state }, {
        headers: {
          'Authorization': `Basic ${token}`
        }

      }).then((response) => {
        long = response.data.lon
        lat = response.data.lat
        sunIndex = response.data.anual
      
      }).catch( (e)=>{ console.log(e)})

      props.dados.sunIndex = sunIndex

      if (props.dados.lost){
        let potConsiderada = sunIndex * (1-(props.dados.lost/100))
        props.dados.sunIndex = sunIndex
        props.dados.consideredpower = potConsiderada
       // props.dados.lost = perdas
        }

     // console.log("SUM INDEX" + props.dados.lost)
    } catch (err) {
      console.log(err)
    }
  };

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
      <br></br>
      <box>


        <div class="card">
          <div class="card-header">
            Dados do  kit
          </div>

          <div className="card-body">
            <div className="row d-flex justify-content-start">
              <Grid container spacing={3}>

                <Grid item xs={12} sm={3}>
                  <NumberFormatCustom readOnly label={"Nº Placas"} variant="outlined" decimal={2} value={nPlacas} ></NumberFormatCustom>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <NumberFormatCustom readOnly label={"Potência do Sistema"} variant="outlined" decimal={2} value={potenciaSistema} ></NumberFormatCustom>
                </Grid>
              </Grid>

            </div>
          </div>
        </div>

      </box>
    </React.Fragment>
  );
}
