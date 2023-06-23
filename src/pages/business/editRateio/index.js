import { useEffect, useState, useContext } from 'react'
import { SidebarWrapperContext } from '../../../context/SidebarWrapperContext'
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { useLocation, useParams } from 'react-router-dom'
import api from '../../../api';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import TabelaRateioBusiness from '../../../components/rateio-table';


const EditBussinessShare = () => {

  const navigate = useNavigate();
  const [marcas, setMarcas] = useState([])
  const [modeloInversor, setModeloInversor] = useState([])
  const [idSelectedProd, setIdSelectedProd] = useState('')
  const { token } = useContext(AuthContext)
  const { sidebarWrapper } = useContext(SidebarWrapperContext);
  const pageTitle = "Atualização dos Rateios do Projeto";
  const [potenciaModulo, setPotenciaModulo] = useState('465')
  const [idRateio, setIdRateio] = useState(1)
  const [idSelected, setIdSelected] = useState('')
  const [geracaoSugeridaParcial, setGeracaoSugeridaParcial] = useState('')
  const [geracaoDesejada, setGeracaoDesejada] = useState('')
  const [geracaoSugerida, setGeracaoSugerida] = useState('')
  const [geracaoTotal, setGeracaoTotal] = useState(0.0)
  const [potenciaConsiderada, setPotenciaConsiderada] = useState('')
  const [nPlacas, setNplacas] = useState(0)
  const [potenciaSistema, setPotenciaSistema] = useState(0)

  function calculaGeracaoTotal() {
    const campoParaSomar = 'suggestedGeneration'; // Campo do JSON que será somado
    const soma = dados.reduce((acumulador, item) => acumulador + parseFloat(item[campoParaSomar]), 0);
    let sugg = parseFloat(geracaoSugeridaParcial) + parseFloat(soma);
    setGeracaoTotal(sugg)
    setGeracaoSugerida(sugg)
    setGeracaoDesejada(sugg)
    let placas = Math.floor((sugg * 12000) / (potenciaConsiderada * potenciaModulo))

    setNplacas(placas)
    let potSistema = (placas * potenciaModulo) / 1000;
    var numeroArredondado = Math.round(potSistema * 100) / 100;
    setPotenciaSistema(numeroArredondado)

  }


  const { businessId } = useParams();

  useEffect(() => {

    loadbId(businessId)
  }, [])

  const [dados, setDados] = useState([

  ]);
  async function calculaDemandaRateios(item) {
    if (item.modality === "Convencional" || item.modalidade === "Rural" || item.modalidade === "Outros") {
      item.suggestedGeneration = item.avgconsumption;
      item.energiaFP = 0;
      item.energiaP = 0;
      item.demandaFP = 0;
      item.demandaP = 0;
    } else {
      const enpt = 0.620784 //await buscaGeracaoSugeridaRateio(item.subgroup,item.modality,item.energiaPonta,"CE")
      console.log(enpt)
      const valor = parseFloat(item.energiaFP) + parseFloat(item.energiaP);
      const result = parseFloat(item.energiaFP) + Math.round(parseFloat(item.energiaP) / parseFloat(enpt))
      item.suggestedGeneration = result;
      item.avgconsumption = valor;
    }
  }

  const handleEdit = (id, campo, valor) => {
    setDados(prevDados => {
      const novoDados = [...prevDados];
      const index = novoDados.findIndex(item => item.id === id);
      if (campo !== "CIP" || campo !== "avgconsumption" || campo !== "suggestedGeneration") {
        calculaDemandaRateios(novoDados[index], valor)
      }
      
      novoDados[index][campo] = valor;
      if (campo ==="subgroup" ){
        if ((valor==="A3" ||valor==="A4")){
          novoDados[index]['group'] = "A";
        } else{
          novoDados[index]['demandaFP'] = "0";
          novoDados[index]['energiaFP'] = "0";
          novoDados[index]['demandaP'] = "0";
          novoDados[index]['energiaP'] = "0";

          if(valor==="B1"){
            novoDados[index]['modality'] = "Convencional";
          }
          if(valor==="B2"){
            novoDados[index]['modality'] = "Rural";
          }
          if(valor==="B3"){
            novoDados[index]['modality'] = "Outros";
          }
        }
        
      }
      return novoDados;
    });
  };
  const [novoItem, setNovoItem] = useState({
    id: idRateio, modality: "Convencional", group: 'B', subgroup: 'B1', demandaFP: 0, energiaFP: 0,
    demandaP: 0, energiaP: 0, avgconsumption: 0, suggestedGeneration: 0, CIP: 0
  });

  const handleAfterDel = () => {

    const quantidadeItens = dados.length;
    if (quantidadeItens > 1) {
      setDados(prevDados => prevDados.filter(item => item.id !== idSelected));
    }

  }
  const handleAdd = () => {
    let idN = idRateio + 1

    let novoItem =
    {
      id: idN, modality: "Convencional", group: 'B', subgroup: 'B1', demandaFP: 0, energiaFP: 0,
      demandaP: 0, energiaP: 0, avgconsumption: 0, suggestedGeneration: 0, CIP: 0
    }
    setIdRateio(idN)
    setDados(prevDados => [...prevDados, novoItem]);
  };

  async function updateDimensionamento(e) {
    e.preventDefault();

    const data = {
      shares: dados
    }

    const url = '/business/update/shares/' + businessId;


    await api.patch(url, data, {
      headers: {
        'Authorization': `Basic ${token}`
      }

    }).then((response) => {
      navigate("/business/view/" + businessId)

    }).catch((response) => {
      console.log(response)

    })

  }
  async function loadbId() {


    await api.get('/business/get/' + businessId, {
      headers: {
        'Authorization': `Basic ${token}`
      }

    }).then((response) => {


      if (response.data.shares.length === 0) {
        const data = [
          {
            id: 1, modality: "Convencional", group: 'B', subgroup: 'B1', demandaFP: 0, energiaFP: 0,
            demandaP: 0, energiaP: 0, avgconsumption: 0, suggestedGeneration: 0, CIP: 0
          }]
        setDados(data)

      } else {
        setDados(response.data.shares)

      }


    }).catch((error) => { console.log(error) })

  }
  return (
    <div>
      <Navbar />
      <div className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}>
        <Sidebar activeButtonProfile="active" />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <h5 className="pb-3">{pageTitle}</h5>

          <form >
            <div className='p-3 bg-white border rounded-1'>

              <div className="row g-3 p2" >

                <div class="card-body">
                  <div className="row d-flex justify-content-start">
                    <div className="table-responsive">
                      <TabelaRateioBusiness token={token} dados={dados} handleEdit={handleEdit}
                        handleAdd={handleAdd} setIdSelected={setIdSelected}
                        handleAfterDel={handleAfterDel} calculaGeracaoTotal={calculaGeracaoTotal}
                      />

                    </div>
                  </div>
                </div>

                <div className="col-md-2">
                  <button className="btn btn-primary text-light" type="submit" onClick={updateDimensionamento}>
                    Atualizar
                  </button>
                </div>

              </div>

            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default EditBussinessShare