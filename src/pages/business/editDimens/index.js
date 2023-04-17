import { useEffect, useState, useContext } from 'react'
import { SidebarWrapperContext } from '../../../context/SidebarWrapperContext'
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { useLocation, useParams } from 'react-router-dom'
import api from '../../../api';
import { AuthContext } from '../../../context/AuthContext';

const EditDimensionamento = () => {

  const { sidebarWrapper } = useContext(SidebarWrapperContext);
  const pageTitle = "Atualização do Dimensionamento do Projeto";

  const location = useLocation()

  const [name, setName] = useState('')
  const [fatorS, setFatorS] = useState('')
  const [telhado, setTelhado] = useState('')
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
  const { token } = useContext(AuthContext)


  const { businessId } = useParams();











  useEffect(() => {

    loadbId()
  }, [])


  async function loadbId() {

    await api.get('/business/get/' + businessId, {
      headers: {
        'Authorization': `Basic ${token}`
      }

    }).then((response) => {
      console.log(response)
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
      fatorS,
      telhado,
      tipoL,
      modalidade,
      grupo,
      subgrupo,
      demandaFp,
      demandaP,
      energiaFp,
      energiaP,
      tipoSistema

    }
    const t = JSON.stringify(data);
    const saida = JSON.parse(t);
    console.log(saida)

    await api.patch('/business/update/' + businessId, saida, {
      headers: {
        'Authorization': `Basic ${token}`
      }

    }).then((response) => {




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
              <div className="row g-3 " >
                <div className="col-md-4">
                  <label htmlFor="inputFirstName" className="form-label">
                    Nome:
                  </label>
                  <input type="text" className="form-control" id="inputFirstName" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="col-md-2 ">
                  <label htmlFor="inputFirstName" className="form-label">
                    Usuário:
                  </label>
                  <input type="text" className="form-control" id="inputFirstName" value={donoN} onChange={(e) => setDonoN(e.target.value)} />
                </div>

                <div className="col-md-2">
                  <label htmlFor="inputFirstName" className="form-label">
                    Tipo de Telhado:
                  </label>

                  <select name="tipoLigacao" className="form-select" id="tipoTelhado" value={telhado} onChange={(e) => setTelhado(e.target.value)} >
                    <option value="">Selecione</option>
                    <option value="ceramico">Cerâmico</option>
                    <option value="metalico">Metálico</option>
                    <option value="solo">Solo</option>
                    <option value="fibrocimento">Fibrocimento</option>
                    <option value="laje">Laje</option>

                  </select>

                </div>
              </div>
              <div className="row g-3 p2" >


                <div className="col-md-2">
                  <label htmlFor="inputFirstName" className="form-label">
                    Tipo de Ligação:
                  </label>

                  <select name="tipoLigacao" className="form-select" id="tipoLigacao" value={tipoL} onChange={(e) => setTipoL(e.target.value)}>
                    <option value="">Selecione</option>
                    <option value="tri">Trifásico</option>
                    <option value="mono">Monofásico</option>

                  </select>
                </div>
                <div className="col-md-2">
                  <label htmlFor="inputFirstName" className="form-label">
                    Fator Solar:
                  </label>
                  <input type="text" className="form-control" id="inputFirstName" value={fatorS} onChange={(e) => setFatorS(e.target.value)} />
                </div>
              </div>
              <div className="row g-3 p2" >
                <div className="col-md-2">
                  <label htmlFor="inputFirstName" className="form-label">
                    Grupo:
                  </label>


                  <select className="form-select" id="inputGrupo" value={grupo} onChange={(e) => setGrupo(e.target.value)}  >
                    <option value="">Selecione</option>
                    <option value="A">Grupo A</option>
                    <option value="B">Grupo B</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label htmlFor="inputFirstName" className="form-label">
                    Sub-Grupo:
                  </label>


                  <select className="form-select" id="inputSubgrupo" value={subgrupo} onChange={(e) => setSubGrupo(e.target.value)} >
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
              <div className="row g-3 p2" >
                <div className="col-md-2">
                  <label htmlFor="inputFirstName" className="form-label">
                    Demanda FP:
                  </label>
                  <input type="text" className="form-control" id="inputFirstName" value={demandaFp} onChange={(e) => setDemandaFp(e.target.value)} />
                </div>
                <div className="col-md-2">
                  <label htmlFor="inputFirstName" className="form-label">
                    Demanda Ponta:
                  </label>
                  <input type="text" className="form-control" id="inputFirstName" value={demandaP} onChange={(e) => setDemandaP(e.target.value)} />
                </div>
              </div>
              <div className="row g-3 p2" >
                <div className="col-md-2">
                  <label htmlFor="inputFirstName" className="form-label">
                    Energia FP:
                  </label>
                  <input type="text" className="form-control" id="inputFirstName" value={energiaP} onChange={(e) => setEnergiaFp(e.target.value)} />
                </div>
                <div className="col-md-2">
                  <label htmlFor="inputFirstName" className="form-label">
                    Energia Ponta:
                  </label>
                  <input type="text" className="form-control" id="inputFirstName" value={energiaP} onChange={(e) => setEnergiaP(e.target.value)} />
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
          </form>
        </div>

      </div>
    </div>
  )
}

export default EditDimensionamento