import { useEffect, useState, useContext, useRef } from 'react'
import { SidebarWrapperContext } from '../../../context/SidebarWrapperContext'
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../../api';
import { AuthContext } from '../../../context/AuthContext';
import { toast } from 'react-toastify';

const EditDimensionamento = () => {

  const { sidebarWrapper } = useContext(SidebarWrapperContext);
  const pageTitle = "Atualização do Dimensionamento do Projeto";


  const [name, setName] = useState()
  const [fatorS, setFatorS] = useState()
  const [telhado, setTelhado] = useState()
  const [tipoL, setTipoL] = useState()
  const [modalidade, setModalidade] = useState()
  const [grupo, setGrupo] = useState()
  const [subgrupo, setSubGrupo] = useState()
  const [demandaFp, setDemandaFp] = useState()
  const [energiaFp, setEnergiaFp] = useState()
  const [demandaP, setDemandaP] = useState()
  const [energiaP, setEnergiaP] = useState()
  const [tipoSistema, setTipoSistema] = useState()
  const [donoN, setDonoN] = useState()
  const [energiaPontaTratada, setEnergiaPontaTratada] = useState(0)
  const [consumoMedio, setConsumoMedio] = useState('')
  const [geracaoSugerida, setGeracaoSugerida] = useState('')
  const [geracaoSugeridaParcial, setGeracaoSugeridaParcial] = useState('')
  const { token } = useContext(AuthContext)
  const navigate = useNavigate();
  const inputDemFP = useRef();
  const inputDemP = useRef();
  const inputEnergiaFP = useRef();
  const inputEnergiaP = useRef();
  const { businessId } = useParams();


  useEffect(() => {

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
        //setGeracaoDesejada(valor)
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

        //GeracaoSugerida
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
      setTelhado(response.data.roof)
      setTipoL(response.data.typeConnection)
      setModalidade(response.data.modality)
      setGrupo(response.data.group)
      setSubGrupo(response.data.subgroup)
      setDemandaFp(response.data.demadaFp)
      setEnergiaFp(response.data.energiaFp)
      setDemandaP(response.data.demandaP)
      setEnergiaP(response.data.energiaP)
      setTipoSistema(response.data.type)

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
    // const t = JSON.stringify(data);
    // const saida = JSON.parse(t);
    console.log(data)


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

          <form >
            <table className='table_view'>

              <div className='p-3 bg-white border rounded-1'>
                <div className="row g-3 " >
                  <div className="col-md-5">
                    <div className="container-fluid">
                      <label htmlFor="inputFirstName" className="form-label">
                        Nome:
                      </label>
                      <input type="text" className="form-control" id="inputFirstName" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                  </div>
                  <div className="col-md-3 ">
                    <div className="container-fluid">
                      <label htmlFor="inputFirstName" className="form-label">
                        Usuário:
                      </label>
                      <input type="text" className="form-control" id="inputFirstName" value={donoN} onChange={(e) => setDonoN(e.target.value)} />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="container-fluid">
                      <label htmlFor="inputFirstName" className="form-label">
                        Tipo de Telhado:
                      </label>

                      <select name="tipoLigacao" className="form-select" id="tipoTelhado" value={telhado} onChange={(e) => setTelhado(e.target.value)} >
                        <option value="">Selecione</option>
                        <option value="Cerâmico">Cerâmico</option>
                        <option value="Metálico">Metálico</option>
                        <option value="Em Solo">Solo</option>

                      </select>
                    </div>
                  </div>
                </div>
                <div className="row g-3 p2" >
                  <div className="col-md-2">
                    <div className="container-fluid">
                      <label htmlFor="inputFirstName" className="form-label">
                        < > Tipo de Ligação:</>
                      </label>

                      <select name="tipoLigacao" className="form-select" id="tipoLigacao" value={tipoL} onChange={(e) => setTipoL(e.target.value)}>
                        <option value="">Selecione</option>
                        <option value="Trifásico">Trifásico</option>
                        <option value="Monofásico">Monofásico</option>

                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="container-fluid">
                      <label htmlFor="inputFirstName" className="form-label">
                        <> Fator Solar:</>
                      </label>
                      <input type="text" className="form-control" id="inputFirstName" value={fatorS} onChange={(e) => { setFatorS(e.target.value); }} />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="container-fluid">
                      <label htmlFor="modalidade" className="form-label">
                        Modalidade:
                      </label>
                      <select className="form-select" id="modalidade" value={modalidade} onChange={(e) => { setModalidade(e.target.value); }}>
                        <option value="Convencional">Convencional</option>
                        <option value="HA">Horos. Azul</option>
                        <option value="HV">Horos. Verde</option>
                        <option value="Rural">Rural</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row g-3 p2" >
                  <div className="col-md-2">
                    <div className="container-fluid">
                      <label htmlFor="inputFirstName" className="form-label">
                        <> Grupo:</>
                      </label>
                      <select className="form-select" id="inputGrupo" value={grupo} onChange={(e) => setGrupo(e.target.value)}  >
                        <option value="">Selecione</option>
                        <option value="A">Grupo A</option>
                        <option value="B">Grupo B</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="container-fluid">
                      <label htmlFor="inputFirstName" className="form-label">
                        <>Sub-Grupo:</>
                      </label>
                      <select className="form-select" id="inputSubgrupo" value={subgrupo} onChange={(e) => setSubGrupo(e.target.value)}  >
                        <option value="">Selecione</option>
                        {grupo === "A" ? <>
                          <option value="A3">A3</option>
                          <option value="A4">A4</option>
                        </>
                          :
                          <>
                            <option value="B1">B1</option>
                            <option value="B2">B2</option>
                            <option value="B3">B3</option>
                          </>}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="container-fluid">
                      <label htmlFor="inputGeracaoSugerida" className="form-label">
                        <strong>Consumo Médio:</strong>
                      </label>
                      <input type="text" className="form-control" id="inputGeracaoSugerida" value={consumoMedio || ''} onChange={(e) => { setConsumoMedio(e.target.value); handleGrupoAConsMedio(e.target.value) }} />
                    </div>
                  </div>
                </div>
                <div className="row g-3 p2" >
                  <div className="col-md-2">
                    <div className="container-fluid">
                      <label htmlFor="inputFirstName" className="form-label">
                        <>Demanda FP:</>
                      </label>
                      <input type="text" ref={inputDemFP} className="form-control" id="inputFirstName" value={demandaFp || ''} onChange={(e) => { setDemandaFp(e.target.value); }} />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="container-fluid">
                      <label htmlFor="inputFirstName" className="form-label">
                        <>Demanda Ponta:</>
                      </label>
                      <input type="text" ref={inputDemP} className="form-control" id="inputFirstName" value={demandaP || ''} onChange={(e) => { setDemandaP(e.target.value); handleGrupoAConsMedio() }} />
                    </div>
                  </div>
                </div>
                <div className="row g-3 p2" >
                  <div className="col-md-2">
                    <div className="container-fluid">
                      <label htmlFor="inputFirstName" className="form-label">
                        <>Energia FP:</>
                      </label>
                      <input type="text" ref={inputEnergiaFP} className="form-control" id="inputFirstName" value={energiaFp || ''} onChange={(e) => { setEnergiaFp(e.target.value); }} />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="container-fluid">
                      <label htmlFor="inputFirstName" className="form-label">
                        <>Energia Ponta:</>
                      </label>
                      <input type="text" ref={inputEnergiaP} className="form-control" id="inputFirstName" value={energiaP || ''} onChange={(e) => { setEnergiaP(e.target.value); handleGrupoAConsMedio(e.target.value) }} />
                    </div>
                  </div>
                </div>
                <div className="row g-3 p2" >
                  <div className="col-md-2">
                    <div className="container-fluid">
                      <label htmlFor="inputGeracaoSugerida" className="form-label">
                        <strong>Geração Sugerida:</strong>
                      </label>
                      <input type="text" className="form-control" id="inputGeracaoSugerida" value={geracaoSugerida || ''} onChange={(e) => setGeracaoSugerida(e.target.value)} />
                    </div>
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
              </div>
            </table>
          </form>
        </div>
      </div>
    </div>

  )
}



export default EditDimensionamento