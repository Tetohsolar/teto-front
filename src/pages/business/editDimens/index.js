import { useEffect, useState, useContext, useRef } from 'react'
import { SidebarWrapperContext } from '../../../context/SidebarWrapperContext'
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../../api';
import { AuthContext } from '../../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { InputLabel, MenuItem, Select, TextField, FormControl } from '@mui/material';
import NumberFormatCustom from '../../../components/communs/DecimalMaskedTextField';


const EditDimensionamento = () => {

  const { sidebarWrapper } = useContext(SidebarWrapperContext);
  const pageTitle = "Atualização do Dimensionamento do Projeto";

  const [name, setName] = useState()
  const [fatorS, setFatorS] = useState()
  const [telhado, setTelhado] = useState(0)
  const [tipoL, setTipoL] = useState('')
  const [modalidade, setModalidade] = useState('')
  const [grupo, setGrupo] = useState('')
  const [subgrupo, setSubGrupo] = useState('')
  const [demandaFp, setDemandaFp] = useState('')
  const [energiaFp, setEnergiaFp] = useState('')
  const [demandaP, setDemandaP] = useState('')
  const [energiaP, setEnergiaP] = useState('')
  const [tipoSistema, setTipoSistema] = useState('')
  const [donoN, setDonoN] = useState('')
  const [energiaPontaTratada, setEnergiaPontaTratada] = useState(0)
  const [consumoMedio, setConsumoMedio] = useState('')
  const [geracaoSugerida, setGeracaoSugerida] = useState('')
  const [telhados, setTelhados] = useState([])

  const [geracaoSugeridaParcial, setGeracaoSugeridaParcial] = useState('')
  const { token } = useContext(AuthContext)
  const navigate = useNavigate();
  const inputDemFP = useRef();
  const inputDemP = useRef();
  const inputEnergiaFP = useRef();
  const inputEnergiaP = useRef();
  const { businessId } = useParams();


  useEffect(() => {

    buscaTelhados()
    loadbId()


  }, [])

  async function buscaGeracaoSugerida() {
    setEnergiaPontaTratada(0)

    await api.post('/taxkhw/byparam', {
      "subgroup": "A3",
      "modal": "HA",
      "ep": energiaP,
      "state": "CE"

    }, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    }
    ).then((response) => {
      console.log(response.data.Taxkwh.toFixed(6))

      setEnergiaPontaTratada(response.data.Taxkwh.toFixed(6))

    })

  }
  async function buscaTelhados() {


    await api.get('/roofs/all',

      {
        headers: {
          'Authorization': `Basic ${token}`
        }
      }
    ).then((response) => {
      setTelhados(response.data.roofs)
    })

  }

  function handleGrupoAConsMedio(e) {
    buscaGeracaoSugerida()

    if (modalidade === "Convencional" || modalidade === "Rural" || modalidade === "Outros") {
      try {

        setGeracaoSugerida(`${e} KWh`)
        return
      }
      catch (error) {
        console.log(error)
      }

    }

    if (modalidade === "HA" && subgrupo === "A3" && energiaFp !== null && energiaP !== null) {
      try {
        buscaGeracaoSugerida()
        let consMedio = parseFloat(inputEnergiaFP.current.value) + parseFloat(inputEnergiaP.current.value)
        setConsumoMedio(consMedio)

        const result = parseFloat(inputEnergiaFP.current.value) + Math.round(parseFloat(inputEnergiaP.current.value) / parseFloat(energiaPontaTratada))

        { result >= 0 ? setGeracaoSugerida(result) : setGeracaoSugerida('') }

      } catch (error) {
        console.log(error)
      }

    }

    else if (modalidade === "HV" && subgrupo === "A4" && energiaFp !== null && energiaP !== null) {
      try {
        const valor = parseFloat(inputEnergiaFP.current.value) + parseFloat(inputEnergiaP.current.value)
        setConsumoMedio(valor)

        let result = parseFloat(inputEnergiaFP.current.value) + Math.round(parseFloat(inputEnergiaP.current.value) / parseFloat(energiaPontaTratada))

        { result >= 0 ? setGeracaoSugerida(result) : setGeracaoSugerida('') }
        setGeracaoSugeridaParcial(result)

      } catch (error) {
        console.log(error)
      }

    }

    else if (modalidade === "HA" && subgrupo === "A4" && demandaFp !== null && energiaFp !== null && energiaP !== null) {

      try {
        const valor = parseFloat(inputDemFP.current.value) + parseFloat(inputEnergiaFP.current.value) + parseFloat(inputEnergiaP.current.value)
        setConsumoMedio(valor)

        let result = parseFloat(inputDemFP.current.value) + parseFloat(inputEnergiaFP.current.value) + Math.round(parseFloat(inputEnergiaP.current.value) / parseFloat(energiaPontaTratada))
        { result > 0 ? setGeracaoSugerida(result) : setGeracaoSugerida('') }
        setGeracaoSugeridaParcial(result)

      } catch (error) {
        console.log(error)
      }

    }
    else {
      setConsumoMedio('')
      setGeracaoSugerida('')
    }

  }

  async function loadbId() {

    await api.get('/business/get/' + businessId, {
      headers: {
        'Authorization': `Basic ${token}`
      }

    }).then((response) => {

      setName(response.data["Client.fantasy"])
      setDonoN(response.data['User.name'])
      setFatorS(response.data.sunIndex)
      setTelhado(response.data.RoofId)
      setTipoL(response.data.typeConnection)
      setModalidade(response.data.modality)
      setGrupo(response.data.group)
      setSubGrupo(response.data.subgroup)
      setDemandaFp(response.data.demadaFp)
      setEnergiaFp(response.data.energiaFp)
      setDemandaP(response.data.demandaP)
      setEnergiaP(response.data.energiaP)
      setTipoSistema(response.data.type)
      setGeracaoSugerida(response.data.suggestedGeneration)
      setConsumoMedio(response.data.avgconsumption)

    }).catch((error) => { console.log(error) })

  }

  async function updateDimensionamento(e) {
    e.preventDefault();

    const data = {
      name,
      donoN,
      sunIndex: fatorS,
      roof: telhado,
      typeConnection: tipoL,
      modality: modalidade,
      group: grupo,
      subgroup: subgrupo,
      demadaFp: demandaFp,
      demandaP: demandaP,
      energiaFp: energiaFp,
      energiaP: energiaP,
      type: tipoSistema

    }

    await api.patch('/business/update/' + businessId, data, {
      headers: {
        'Authorization': `Basic ${token}`
      }

    }).then((response) => {

      toast.success("Dados atualizados com sucesso!", {
        autoClose: 1000,
      })

      navigate("/business/view/" + businessId)

    }).catch((error) => {
      console.log(error)
      toast.error("Erro ao atualizar dados!", {
        autoClose: 1000,
      })

    })

  }

  return (
    <div>

      <Navbar />
      <div className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}>
        <Sidebar activeButtonProfile="active" />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <h5 className="pb-3">{pageTitle}</h5>
          <div className='p-3 mb-3 bg-white border rounded-3'>
            <ToastContainer />
            <h5 className="card-content-title fw-semibold">{"Editar Negocio"}</h5>
            <hr className="my-4" />
            <form >

              <div className="row" >
                <div className="col-md-5">
                  <br></br>


                  <TextField id="inputFirstName" maxLength={50} className="form-control" label='Nome' variant="outlined" value={name || ''} onChange={(e) => setName(e.target.value)} />


                </div>
                <div className="col-md-4 ">
                  <br></br>


                  <TextField id="inputFirstName" maxLength={50} className="form-control" label='Usuário' variant="outlined" value={donoN || ''} onChange={(e) => setDonoN(e.target.value)} />

                </div>
              </div>
              <div className="row g-3 p2" >
                <div className="col-md-3">
                  <br></br>

                  <FormControl fullWidth>
                    <InputLabel id="tipoTelhado">Tipo de Telhado</InputLabel>
                    <Select
                      labelId="tipoTelhado"
                      id="tipoTelhado"
                      value={telhado}
                      label="Categoria"
                      onChange={(e) => setTelhado(e.target.value)}

                    >
                      <MenuItem key={-1} value={''}></MenuItem>
                      {
                        telhados.length > 0 &&
                        telhados.map((option, i) => {
                          return (<MenuItem key={i} value={option.id}>{option.name}</MenuItem>)
                        })
                      }

                    </Select>
                  </FormControl>

                </div>
                <br></br>

                <div className="col-md-3">

                  <br></br>
                  <FormControl fullWidth>
                    <InputLabel id="tipoLigacao">Tipo de Ligação</InputLabel>
                    <Select
                      labelId="tipoLigacao"
                      id="tipoLigacao"
                      value={tipoL}
                      label="Telhado"
                      onChange={(e) => setTipoL(e.target.value)}

                    >
                      <MenuItem value={'Monofásico'}>Monofásico</MenuItem>
                      <MenuItem value={'Bifásico'}>Bifásico</MenuItem>
                      <MenuItem value={'Trifásico'}>Trifásico</MenuItem>

                    </Select>
                  </FormControl>


                </div>
                <div className="col-md-3">

                  <br></br>
                  <NumberFormatCustom type="number" label={"Fator Solar"} variant="outlined" value={fatorS} onChange={(e) => setFatorS(e.target.value)} ></NumberFormatCustom>

                </div>
              </div>
              <div className="row " >
                <div className="col-md-3">

                  <br></br>

                  <FormControl fullWidth>
                    <InputLabel id="inputSubgrupo"> Subgrupo</InputLabel>
                    <Select
                      labelId="inputSubgrupo"
                      id="inputSubgrupo"
                      value={subgrupo}
                      label="inputSubgrupo"
                      onChange={(e) => setSubGrupo(e.target.value)}
                    >

                      <MenuItem value={'B1'}>B1</MenuItem>
                      <MenuItem value={'B2'}>B2</MenuItem>
                      <MenuItem value={'B3'}>B3</MenuItem>
                      <MenuItem value={'A3'}>A3</MenuItem>
                      <MenuItem value={'A4'}>A4</MenuItem>
                    </Select>
                  </FormControl>

                </div>

                <div className="col-md-3">
                  <br></br>
                  <FormControl fullWidth>
                    <InputLabel id="inputGrupo">Grupo</InputLabel>
                    <Select
                      labelId="tipoLigacao"
                      id="inputGrupo"
                      value={grupo}
                      label="inputGrupo"
                      onChange={(e) => setGrupo(e.target.value)}
                    >

                      <MenuItem value={'A'}>Grupo A</MenuItem>
                      <MenuItem value={'B'}>Grupo B</MenuItem>

                    </Select>
                  </FormControl>

                </div>

                <div className="col-md-3">
                  <br></br>
                  <FormControl fullWidth>

                    <InputLabel id="tipoLigacao">Modalidade</InputLabel>
                    <Select
                      labelId="tipoLigacao"
                      id="modalidade"
                      value={modalidade}
                      label="modalidade"
                      onChange={(e) => { setModalidade(e.target.value); }}

                    >
                      <MenuItem value={'Convencional'}>Convencional</MenuItem>
                      <MenuItem value={'Rural'}>Rural</MenuItem>
                      <MenuItem value={'outros'}>Outros</MenuItem>
                      <MenuItem value={'HA'}>Horos. Azul</MenuItem>
                      <MenuItem value={'HV'}>Horos.Verde</MenuItem>

                    </Select>
                  </FormControl>

                  <br></br>

                </div>
              </div>
              <div className="row" >
                <div className="col-md-3">
                  <br></br>

                  <NumberFormatCustom type="number" label={"Consumo Médio"} variant="outlined" value={consumoMedio} onChange={(e) => setConsumoMedio(e.target.value)} ></NumberFormatCustom>

                </div>

                <div className="col-md-3">
                  <br></br>

                  <NumberFormatCustom type="number" label={"Demanda FP"} variant="outlined" value={demandaFp} onChange={(e) => setDemandaFp(e.target.value)} ></NumberFormatCustom>

                </div>

                <div className="col-md-3">
                  <br></br>

                  <NumberFormatCustom type="number" label={"Demanda Ponta"} variant="outlined" value={demandaP} onChange={(e) => setDemandaP(e.target.value)} ></NumberFormatCustom>

                </div>
              </div>

              <div className="row " >
                <div className="col-md-3">

                  <br></br>

                  <NumberFormatCustom type="number" label={"Energia FP"} variant="outlined" value={energiaFp} onChange={(e) => setEnergiaFp(e.target.value)} ></NumberFormatCustom>

                </div>

                <div className="col-md-3">
                  <br></br>

                  <NumberFormatCustom type="number" label={"Energia Ponta"} variant="outlined" value={energiaP} onChange={(e) => setEnergiaP(e.target.value)} ></NumberFormatCustom>

                </div>

                <div className="col-md-3">
                  <br></br>

                  <NumberFormatCustom type="number" label={"Geração Sugerida"} variant="outlined" value={geracaoSugerida} onChange={(e) => setGeracaoSugerida(e.target.value)} ></NumberFormatCustom>

                </div>

              </div>
              <div className="row g-3 p2" >
                <div className="col-md-10">
                </div>
                <div className="col-md-2">
                  <button className="btn btn-primary text-light" type="submit" onClick={updateDimensionamento}>
                    Atualizar
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default EditDimensionamento