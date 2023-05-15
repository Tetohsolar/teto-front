import React, { useState, useContext, useEffect } from 'react'
import api from '../../../api'
import { AuthContext } from '../../../context/AuthContext'
import InputMask from 'react-input-mask';
import { ToastContainer, toast } from 'react-toastify'


export default function NewBusiness(prop) {

  const [tipoPessoa, setTipoPessoa] = useState('')
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [fone, setFone] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [cep, setCep] = useState('')
  const [numero, setNumero] = useState('')
  const [estado, setEstado] = useState('')
  const [cidade, setCidade] = useState('')
  const [bairro, setBairro] = useState('')
  const [rua, setRua] = useState('')
  const [inf_Adicionais, setInf_Adicionais] = useState('')
  const [nomeFantasia, setNomeFantasia] = useState('')
  const [usuario, setUsuario] = useState('')
  const [fatorSolar, setFatorSolar] = useState('')
  const [tipoTelhado, setTipoTelhado] = useState('')
  const [tipoLigacao, setTipoLigacao] = useState('')
  const [modalidade, setModalidade] = useState('')
  const [grupo, setGrupo] = useState('')
  const [subgrupo, setSubgrupo] = useState('')
  const [demandaFP, setDemandaFP] = useState('')
  const [energia_FP, setEnergia_FP] = useState('')
  const [demPonta, setDem_ponta] = useState('')
  const [energiaPonta, setEnergia_ponta] = useState('')
  const [energiaPontaTratada, setEnergiaPontaTratada] = useState('')
  const [consumoMedio, setConsumoMedio] = useState('')
  const [geracaoSugerida, setGeracaoSugerida] = useState('')
  const [tipoSistema, setTipoSistema] = useState('')
  const [potenciaPainel, setPotenciaPainel] = useState('')
  const [perdas, serPerdas] = useState('')
  const [mediaMensal, setMediaMensal] = useState('')
  const [cip, setCip] = useState('')
  const [bandeira, setbandeira] = useState('')
  const [fatorSimult, setFatorSimult] = useState('')
  const [precoKit, setPrecoKit] = useState('')
  const [marcaPainel, setMarcaPainel] = useState('')
  const [modeloPlaca, setModeloPlaca] = useState([])
  const [modeloInversor, setModeloInversor] = useState([])
  const [modeloMicroInversor, setModeloMicroInversor] = useState([])
  const [selectedInversor, setSelectecInversor] = useState('')
  const [selectedModeloPainel, setSelectedModeloPainel] = useState('')
  const [selectedMicroinversor, setSelectecMicroinversor] = useState('')
  const [marcaInversor, setMarcaInversor] = useState('')
  const [marcaMicroInversor, setMarcaMicroInversor] = useState('')
  const [potenciaInversor, setPotenciaInversor] = useState('')
  const [potenciaMicroInv, setPotenciaMicroInv] = useState('')
  const [qtdeMicroInve, setQtdeMicroInve] = useState('')
  const [qtdeInversor, setQtdeInversor] = useState('')
  const [qtdePainel, setQtdePainel] = useState()
  const [listaInversor, setListaInversor] = useState([])
  const { token, userName } = useContext(AuthContext)

  const [marcas, setMarcas] = useState([])
  const [produtos, setProdutos] = useState([])
  const [updateLista, setUpdateLista] = useState()

  async function loadAllProducts() {
    try {

      await api.get('/product/all', {
        headers: {
          'Authorization': `Basic ${token}`
        }

      }).then((response) => {
        setProdutos(response.data)

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
        "type": type
      }


      await api.post('/brands/all', filtro, {
        headers: {
          'Authorization': `Basic ${token}`

        }
      }).then((response) => {
        setMarcas(response.data.brand)

      }).catch((error) => {
        toast.error(error.response.data.message)
      });


    } catch (err) {
      console.log(err)

    }
  }


  async function loadBrand() {

    if (tipoSistema) {
    }
    let tipo = ''

    if (tipoSistema === "Inversor") {
      tipo = "M"
    } else
      if (tipoSistema === "Microinversor") {
        tipo = "M"
      }
      else {
        tipo = "P"
      }
    console.log(tipo)
    await loadBrandByProduct(tipo)
  }

  async function findInversores() {

    const filtro = {
      brand: "%",
      category: "Inversor",
      "page": 0,
      "pageSize": 100
    }

    await api.post('/products/byparam', filtro, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    }).then((response) => {
      setModeloInversor(response.data.tutorials)
      console.log(response.data.tutorials)

    })

  };


  async function findMicroInversor() {
    const filtro = {
      brand: "%",
      category: "Microinversor",
      "page": 0,
      "pageSize": 100
    }


    await api.post('/products/byparam', filtro, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    }).then((response) => {
      setModeloMicroInversor(response.data.tutorials)
      console.log(response.data.tutorials)

    })


  };


  async function findAllPainel() {
    console.log('chamou painel')
    const filtro = {
      brand: "%",
      category: "Placa",
      "page": 0,
      "pageSize": 100
    }

    await api.post('/products/byparam', filtro, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    }).then((response) => {
      setModeloPlaca(response.data.tutorials)

    })

  };


  function findAllProductsByBrand(e) {

    setTipoSistema(e)

    if (e === "Inversor") {
      console.log('chamou inversor')
      findInversores()

    }
    else if (e === "Microinversor") {
      console.log('chamou microinversor')
      findMicroInversor()

    }

    findAllPainel()
  }


  async function handleFindClient(e) {
    e.preventDefault();

    try {
      await api.post('/client/getbydocument',
        { "document": `${cpf}` }, {
        headers: {
          'Authorization': `Basic ${token}`
        }

      }).then((response) => {
        setNomeFantasia(response.data.fantasy)
        setNome(response.data.fantasy)
        setEmail(response.data.email)
        setFone(response.data.phone)
        setWhatsapp(response.data.zap)
        setInf_Adicionais(response.data.addInformation)
        setEstado(response.data.Addresses[0].state)
        setCidade(response.data.Addresses[0].city)
        setCep(response.data.Addresses[0].postcode)
        setRua(response.data.Addresses[0].street)
        setBairro(response.data.Addresses[0].neighborhood)
        setUsuario(userName)
        setNumero(response.data.Addresses[0].number)

      }).catch((error) => {
        toast.error(error.response.data.message)
      });

    } catch (err) {
      console.log(err)

    }
  }

  async function buscaGeracaoSugerida() {
    setEnergiaPontaTratada(0)
    await api.post('/taxkhw/byparam', {
      "subgroup": "A3",
      "modal": "HA",
      "ep": energiaPonta,
      "state": "CE"

    }, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    }
    ).then((response) => {
      setEnergiaPontaTratada(response.data.Taxkwh.toFixed(6))

    })

  }

  function handleGrupoAConsMedio(e) {
    buscaGeracaoSugerida()

    if (modalidade === "HA" && subgrupo === "A3" && energia_FP !== null && energiaPonta !== null) {
      const valor = parseFloat(energia_FP) + parseFloat(energiaPonta)
      setConsumoMedio(valor)

      const result = parseFloat(energia_FP) + Math.round(parseFloat(energiaPonta) / parseFloat(energiaPontaTratada))
      { result > 0 ? setGeracaoSugerida(result) : setGeracaoSugerida('') }
    }

    else if (modalidade === "HV" && subgrupo === "A4" && energia_FP !== null && energiaPonta !== null) {
      const valor = parseFloat(energia_FP) + parseFloat(energiaPonta)
      setConsumoMedio(valor)

      let result = parseFloat(energia_FP) + Math.round(parseFloat(energiaPonta) / parseFloat(energiaPontaTratada))

      { result > 0 ? setGeracaoSugerida(result) : setGeracaoSugerida('') }
    }

    else if (modalidade === "HA" && subgrupo === "A4" && demandaFP !== null && energia_FP !== null && energiaPonta !== null) {
      const valor = parseFloat(demandaFP) + parseFloat(energia_FP) + parseFloat(energiaPonta)
      setConsumoMedio(valor)


      let result = parseFloat(demandaFP) + parseFloat(energia_FP) + Math.round(parseFloat(energiaPonta) / parseFloat(energiaPontaTratada))
      { result > 0 ? setGeracaoSugerida(result) : setGeracaoSugerida('') }

    }
    else {
      setConsumoMedio('')
      setGeracaoSugerida('')
    }

  }

  function resetFormCliente() {
    setNomeFantasia('')
    setCpf('')
    setCnpj('')
    setEmail('')
    setFone('')
    setWhatsapp('')
    setInf_Adicionais('')
    setEstado('')
    setCidade('')
    setCep('')
    setRua('')
    setBairro('')
    setNumero('')

  }

  function validaCampos(nome, fone, cep, whatsapp) {


    if (nome === "") {
      toast.error("Nome É obrigatório", {
        autoClose: 1000,
      })
      return false;
    }
    if (fone === "") {
      toast.error("Telefone É obrigatório", {
        autoClose: 1000,
      })
      return false;
    }

    let phonenomask = fone.replace('_', '');


    if (phonenomask.length < 14) {
      toast.error("Telefone é invalido", {
        autoClose: 1000,
      })
      return false;
    }


    if (whatsapp) {


      let zapnomask = whatsapp.replace('_', '');

      if (zapnomask.length < 14) {
        toast.error("WhatsApp é invalido", {
          autoClose: 1000,
        })
        return false;
      }
    }


    if (cep) {
      let cepnomask = cep.replace('_', '');

      if (cepnomask.length < 9) {
        toast.error("Cep é invalido", {
          autoClose: 1000,
        })
        return false;
      }
    }

    return true;
  }

  async function saveNewClient() {

    if (validaCampos(nomeFantasia, fone, cep, whatsapp)) {

      const data = {
        fantasy: nomeFantasia,
        corporatename: nomeFantasia,
        phone: fone,
        document: cpf,
        email: email,
        tipo: tipoPessoa,
        zap: whatsapp,
        addInformation: inf_Adicionais,
        Addresses: [
          {
            street: rua,
            postcode: cep,
            city: cidade,
            state: estado,
            neighborhood: bairro,
            number: numero
          }
        ]
      }

      await api.post('/client/create', data
        , {
          headers: {
            'Authorization': `Basic ${token}`
          }

        }).then((response) => {
          console.log(response.data)
        }).catch(
          (response) => {
            toast.error(response.response.data.message)
            throw new Error()
          }
        )

    }
  }

  function addNewEquipment(e) {
    e.preventDefault()
    if (tipoSistema === "Inversor") {
      const inv = {
        marca: marcaInversor,
        model: modeloInversor[0].description,
        pot: potenciaInversor,
        qtde: qtdeInversor
      }
      produtos.push(inv)
      setProdutos(produtos)

    }
    else if (tipoSistema === "Microinversor") {

      const micro = {
        marca: marcaMicroInversor,
        model: modeloMicroInversor[0].description,
        pot: potenciaMicroInv,
        qtde: qtdeMicroInve
      }

      produtos.push(micro)
      setProdutos(produtos)

    }

    console.log(produtos)
  }

  function DelEquipment(e) {
    e.preventDefault()
    listaInversor.pop()

  }

  function addPainel(e) {
    e.preventDefault()
    const painel = {
      marca: marcaPainel,
      model: selectedModeloPainel,
      pot: potenciaPainel,
      qtde: qtdePainel
    }

    if (painel.marca !== null && painel.selectedModeloPainel !== null && painel.pot !== null && painel.qtde > 0) {

      produtos.push(painel)
      setProdutos(produtos)

    }

  }

  useEffect(() => {
    setProdutos(produtos)
  }, [updateLista, produtos])



  return (


    <>
      {/* Dados do  MODAL 1*/}
      <form>

        <ToastContainer />
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="staticBackdropLabel"
          data-bs-keyboard="false" aria-hidden="true" >
          <div className="modal-dialog modal-lg w-100" >
            <div className="modal-content">
              <div className="modal-header">
                <div className="d-flex flex-column">
                  <h1 className="modal-title fs-3" id="exampleModalLabel">Proposta de Negócio </h1>
                  <h5 className='fs-5'>Dados do Cliente</h5>
                </div>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                {/* <div class="card">
                  <div class="card-header">
                    Dados
                  </div>
                  <div class="card-body">

                  </div>
                </div> */}

                <div className="container-fluid">
                  <div className="row d-flex flex-row align-items-end ">
                    <div className="col-md-3 ">
                      <label htmlFor="inputCodigo" className="form-label">
                        Tipo de Cliente:
                      </label>
                      <select name="pets" id="input-user-type" className="form-select" value={tipoPessoa} onChange={(e) => setTipoPessoa(e.target.value)}>
                        <option value="" defaultChecked>Selecione</option>
                        <option value="PF" defaultChecked>Pessoa Física</option>
                        <option value="PJ">Pessoa Jurídica</option>

                      </select>

                    </div>
                    {tipoPessoa === 'PF' ? <>
                      <div className="col-md-3">

                        <label htmlFor="inputcpf" className="form-label">
                          CPF:
                        </label>
                        <InputMask
                          className="form-control" id="inputcpf"
                          onChange={(e) => setCpf(e.target.value)}
                          mask='999.999.999-99'
                          value={cpf || ''}>
                        </InputMask>

                      </div>

                    </>
                      :
                      <>

                        <div className="col-md-4">

                          <label htmlFor="inputCnpj" className="form-label">
                            CNPJ:
                          </label>

                          <InputMask
                            className="form-control" id="inputCnpj"
                            onChange={(e) => setCnpj(e.target.value)}
                            mask='99.999.999/9999-999'
                            value={cnpj || ''}>
                          </InputMask>

                        </div>


                      </>}
                    <div className="col-md-3">
                      <button className='btn btn-primary text-light gap-2' onClick={handleFindClient} >

                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <br />
                  <hr />
                  <div className="row">
                    <div div className="col-md-6">
                      <label htmlFor="inputNomeFantasia" className="form-label">
                        Nome do Cliente:
                      </label>
                      <input type="text" className="form-control" id="inputNomeFantasia" value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} />
                    </div>

                    <div className="col-md-5">
                      <label htmlFor="inputEmail" className="form-label">
                        E-mail:
                      </label>
                      <input type="text" className="form-control" id="inputEmail" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <label htmlFor="inputFone" className="form-label">
                        Fone:
                      </label>
                      <InputMask
                        className="form-control"
                        onChange={(e) => setFone(e.target.value)} id="inputFone"
                        mask='(99)99999-9999'
                        value={fone || ''}>
                      </InputMask>

                    </div>
                    <div className="col-md-3">
                      <label htmlFor="inputWhatsapp" className="form-label">
                        Whatsapp:
                      </label>

                      <InputMask
                        className="form-control"
                        onChange={(e) => setWhatsapp(e.target.value)} id="inputWhatsapp"
                        mask='(99)99999-9999'
                        value={whatsapp || ''}>
                      </InputMask>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md">
                      <label htmlFor="inputInformAdicio" className="form-label">
                        Informações Adicionais:
                      </label>
                      <textarea class="form-control" id="inputInformAdicio" rows="3" value={inf_Adicionais} onChange={(e) => setInf_Adicionais(e.target.value)}  >

                      </textarea>

                    </div>

                  </div>
                  <br />
                  <div class="card">
                    <div class="card-header">
                      Endereço do Cliente
                    </div>
                    <div class="card-body">

                      <div className="container-fluid">
                        <div className="row d-flex">
                          <div className="col-md-2">

                            <label htmlFor="inputCEP" className="form-label">
                              CEP:
                            </label>
                            <input type="text" className="form-control" id="inputCEP" value={cep} onChange={(e) => setCep(e.target.value)} />
                          </div>
                          <div className="col-md-2">
                            <label htmlFor="inputEstado" className="form-label">
                              Estado:
                            </label>
                            <input type="text" className="form-control" id="inputEstado" value={estado} onChange={(e) => setEstado(e.target.value)} />
                          </div>
                          <div className="col-md-5">
                            <label htmlFor="inputCidade" className="form-label">
                              Cidade:
                            </label>
                            <input type="text" className="form-control" id="inputCidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                          </div>

                          <div className="row justify-content-center">
                            <div className="col-md-4">
                              <label htmlFor="inputBairro" className="form-label">
                                Bairro:
                              </label>
                              <input type="text" className="form-control" id="inputBairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="inputRua" className="form-label">
                                Rua:
                              </label>
                              <input type="text" className="form-control" id="inputRua" value={rua} onChange={(e) => setRua(e.target.value)} />
                            </div>
                            <div className="col-md-2">
                              <label htmlFor="inputNumero" className="form-label">
                                Número:
                              </label>
                              <input type="text" className="form-control" id="inputNumero" value={numero} onChange={(e) => setNumero(e.target.value)} />
                            </div>


                          </div>


                        </div>


                        <div className="row">
                          <div className="col-lg-12">
                            <label htmlFor="inputInformAdicio" className="form-label">
                              Informações Adicionais:
                            </label>
                            <textarea class="form-control" id="inputInformAdicio" rows="3" value={inf_Adicionais} onChange={(e) => setInf_Adicionais(e.target.value)}  ></textarea>

                          </div>

                        </div>
                      </div>

                    </div>
                  </div>

                </div>

              </div>
              <div className="modal-footer">


                <button type="button" onClick={resetFormCliente}
                  className="btn btn-primary text-light d-flex align-items-center gap-2" >

                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                  </svg>
                  Limpar Campos
                </button>
                <button type="button" onClick={saveNewClient}
                  className="btn btn-primary text-light d-flex align-items-center gap-2" >

                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                  </svg>
                  Salvar Cliente
                </button>
                <button type="button"
                  className="btn btn-primary text-light d-flex align-items-center gap-2" data-bs-target="#staticBackdrop2" data-bs-toggle="modal"
                  data-bs-dismiss="modal">

                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                  </svg>
                  Avançar
                </button>

              </div>


            </div>

          </div>

        </div>

        {/* Dados do  MODAL 2*/}

        <div className="modal fade modal-lg w-100" id="staticBackdrop2" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="staticBackdropLabel"
          data-bs-keyboard="false" aria-hidden="true" >
          <div className="modal-dialog" >
            <div className="modal-content">
              <div className="modal-header">
                <div className="d-flex flex-column">
                  <h1 className="modal-title fs-3" id="exampleModalLabel">Proposta de Negócio </h1>
                  <h5 className='fs-5'>Dados da Geradora</h5>
                </div>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                <div className="container-fluid">
                  <div className="row d-flex">
                    <div className="col-md-5">
                      <label htmlFor="inputCodigo" className="form-label">
                        Cliente:
                      </label>
                      <input type="text" className="form-control" id="inputCodigo" value={nome} onChange={(e) => setNomeFantasia(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="inputCodigo" className="form-label">
                        Usuário:
                      </label>
                      <input type="text" className="form-control" id="inputCodigo" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                    </div>
                    <div className="col-md-2">
                      <label htmlFor="inputCodigo" className="form-label">
                        Fator Solar:
                      </label>
                      <input type="text" className="form-control" id="inputCodigo" value={fatorSolar} onChange={(e) => setFatorSolar(e.target.value)} />
                    </div>
                    <div className="col-md-3 ">
                      <label htmlFor="tipoLigacao" className="form-label">
                        Tipo de Ligação:
                      </label>
                      <select name="tipoLigacao" className="form-select" id="tipoLigacao" value={tipoLigacao} onChange={(e) => setTipoLigacao(e.target.value)}>
                        <option value="">Selecione</option>
                        <option value="tri">Trifásico</option>
                        <option value="mono">Monofásico</option>

                      </select>
                    </div>
                    <div className="col-md-4 ">
                      <label htmlFor="tipoTelhado" className="form-label">
                        Tipo de Telhado:
                      </label>

                      <select name="tipoLigacao" className="form-select" id="tipoTelhado" value={tipoTelhado} onChange={(e) => setTipoTelhado(e.target.value)}>
                        <option value="">Selecione</option>
                        <option value="ceramico">Cerâmico</option>
                        <option value="metalico">Metálico</option>
                        <option value="solo">Solo</option>
                        <option value="fibrocimento">Fibrocimento</option>
                        <option value="laje">Laje</option>

                      </select>
                    </div>

                  </div>

                  <br />
                  <div class="card w-100">
                    <div class="card-header">
                      Informações Complementares
                    </div>
                    <div class="card-body d-flex flex-row ">

                      <div className="row p-2 d-flex flex-column">


                        <div className="col-md-3 w-100">
                          <label htmlFor="modalidade" className="form-label">
                            Modalidade:
                          </label>
                          {/* <input type="text" className="form-control" id="modalidade" value={modalidade} onChange={(e) => setModalidade(e.target.value)} /> */}
                          <select className="form-select" id="modalidade" value={modalidade} onChange={(e) => setModalidade(e.target.value)}>
                            <option value="">Selecione</option>
                            <option value="Convencional">Convencional</option>
                            <option value="HA">Horos. Azul</option>
                            <option value="HV">Horos. Verde</option>
                            <option value="Rural">Rural</option>

                          </select>
                        </div>
                        <div className="col-md-2 w-100">
                          <label htmlFor="inputGrupo" className="form-label">
                            Grupo:
                          </label>


                          <select className="form-select" id="inputGrupo" value={grupo} onChange={(e) => setGrupo(e.target.value)} >
                            <option value="">Selecione</option>
                            <option value="A">Grupo A</option>
                            <option value="B">Grupo B</option>
                          </select>
                        </div>
                        <div className="col-md-3   w-100">
                          <label htmlFor="inputSubgrupo" className="form-label">
                            Sub-Grupo:
                          </label>
                          <select className="form-select" id="inputSubgrupo" value={subgrupo} onChange={(e) => setSubgrupo(e.target.value)} >
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
                      <div className="row p-2  d-flex flex-column">

                        <div className="col-md-3  w-100 ">
                          <label htmlFor="inputDemandaFP" className="form-label">
                            Demanda FP:
                          </label>
                          <input type="text" className="form-control" id="inputDemandaFP" value={demandaFP} onChange={(e) => setDemandaFP(e.target.value)} onKeyUp={handleGrupoAConsMedio} />

                        </div>
                        <div className="col-md-3 w-100">
                          <label htmlFor="inputEnergiaFP" className="form-label">
                            Energia FP:
                          </label>
                          <input type="text" className="form-control" id="inputEnergiaFP" value={energia_FP} onChange={(e) => setEnergia_FP(e.target.value)} onKeyUp={handleGrupoAConsMedio} />

                        </div>
                        <div className="col-md-3   w-100">
                          <label htmlFor="inputEnergiaPonta" className="form-label">
                            Energia Ponta:
                          </label>
                          <input type="text" className="form-control" id="inputEnergiaPonta" value={energiaPonta} onChange={(e) => setEnergia_ponta(e.target.value)} onKeyUp={handleGrupoAConsMedio} />
                        </div>

                      </div>
                      <div className="row p-2  d-flex flex-column">
                        <div className="col-md-3  w-100">
                          <label htmlFor="inputDemandaPonta" className="form-label">
                            Demanda Ponta:
                          </label>
                          <input type="text" className="form-control" id="inputDemandaPonta" value={demPonta} onChange={(e) => setDem_ponta(e.target.value)} onKeyUp={handleGrupoAConsMedio} />
                        </div>
                        <div className="col-md-3  w-100 ">
                          <label htmlFor="inputConsMedio" className="form-label font-weight-bold">
                            Consumo Médio(KWh):
                          </label>
                          <input type="text" className="form-control" id="inputConsMedio" value={consumoMedio || ''} onChange={(e) => setConsumoMedio(e.target.value)} />

                        </div>

                        <div className="col-md-3 w-100">
                          <label htmlFor="inputGeracaoSugerida" className="form-label">
                            Geração Sugerida:
                          </label>
                          <input type="text" className="form-control" id="inputGeracaoSugerida" value={geracaoSugerida || ''} onChange={(e) => setGeracaoSugerida(e.target.value)} />
                        </div>
                      </div>

                    </div>
                  </div>
                  <br />
                  <div class="card">
                    <div class="card-header">
                      Informações Complementares
                    </div>
                    <div class="card-body">
                      <div className="row d-flex justify-content-start">

                        <div className="col-md-3">
                          <label htmlFor="inputFatorSimult" className="form-label" >
                            Fator de Simult:
                          </label>
                          <input type="text" className="form-control" id="inputFatorSimult" value={fatorSimult} onChange={(e) => setFatorSimult(e.target.value)} />
                        </div>
                        <div className="col-md-2">
                          <label htmlFor="inputCIP" className="form-label">
                            CIP:
                          </label>
                          <input type="text" className="form-control" id="inputCIP" value={cip} onChange={(e) => setCip(e.target.value)} />
                        </div>
                        <div className="col-md-2">
                          <label htmlFor="inputbandeira" className="form-label">
                            Bandeira:
                          </label>
                          <input type="text" className="form-control" id="inputbandeira" value={bandeira} onChange={(e) => setbandeira(e.target.value)} />
                        </div>

                        <div className="col-md-3">
                          <label htmlFor="inputPreco" className="form-label">
                            Preço do Kit:
                          </label>
                          <input type="text" className="form-control" id="inputCodigo" value={precoKit} onChange={(e) => setPrecoKit(e.target.value)} />
                        </div>
                      </div>



                    </div>
                  </div>



                </div>

              </div>
              <div className="modal-footer">
                <button type="button"
                  className="btn btn-secondary  d-flex align-items-center gap-2" data-bs-target="#staticBackdrop" data-bs-toggle="modal"
                  data-bs-dismiss="modal">Voltar</button>
                <button type="button"
                  className="btn btn-primary  d-flex align-items-center gap-2" data-bs-target="#staticBackdrop3" data-bs-toggle="modal"
                  data-bs-dismiss="modal">

                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                  </svg>
                  Avançar
                </button>
              </div>

            </div>

          </div>

        </div >


        {/* Dados do  MODAL 3*/}
        <div className="modal fade modal-lg " id="staticBackdrop3" role="dialog" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="staticBackdropLabel"
          data-bs-keyboard="false" aria-hidden="true" onMouseMove={updateLista} >
          <div className="modal-dialog" >
            <div className="modal-content">
              <div className="modal-header">
                <div className="d-flex flex-column">
                  <h1 className="modal-title fs-4" id="exampleModalLabel">Proposta de Negócio </h1>
                  <h5 className='fs-5'>Tipo de Sistema</h5>
                </div>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                <div className="container-fluid">
                  <div className="row">



                    <div className="col-sm-9">
                      <label htmlFor="inputTipoSistema" className="form-label ">
                        <strong>Equipamentos Adicionados:</strong>
                      </label>
                      <ul className='list-group list-group-flush '>
                        {produtos.map((item) => (
                          <li className='list-group-item'>Qtde: {item.qtde} / Marca: {item.marca} / Modelo: {item.model} </li>
                        ))}
                      </ul>

                    </div>
                  </div>
                  <br />
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <label htmlFor="inputTipoSistema" className="form-label">
                        Tipo de Sistema:
                      </label>
                      {/* <input type="text" className="form-control" id="inputTipoSistema" value={tipoSistema} onChange={(e) => setTipoSistema(e.target.value)} /> */}
                      <select className="form-select" id="inputTipoSistema" value={tipoSistema} onChange={(e) => findAllProductsByBrand(e.target.value)} >
                        <option value="">Selecione</option>
                        <option value="Inversor">Inversor</option>
                        <option value="Microinversor">Microinversor</option>

                      </select>

                    </div>
                  </div>
                  <br />

                  <div class="card">
                    <div class="card-header">
                      <div className="row d-flex justify-content-center">
                        <strong>Especifique o(s) {tipoSistema} (es):</strong>

                      </div>
                    </div>

                    <div class="card-body">

                      <div className="row d-flex justify-content-start">
                        {tipoSistema === 'Inversor' ? <>

                          <div className="col-sm-3">
                            <label htmlFor="inputFatorSimult" className="form-label" >
                              Marca:
                            </label>


                            <select className="form-select" aria-label="Selecionar" onChange={(e) => setMarcaInversor(e.target.value)} value={marcaInversor} >
                              <option value="">Selecionar </option>
                              {modeloInversor ? modeloInversor.map((option) =>
                              (<option key={option.id}
                                value={option.brand} >
                                {option.brand}</option>)) : ""}
                            </select>

                          </div>

                          <div className="col-sm-3">
                            <label htmlFor="inputFatorSimult" className="form-label" >
                              Modelo:
                            </label>


                            <select className="form-select" id="inputModeloInversor" value={selectedInversor} onChange={(e) => setSelectecInversor(e.target.value)}  >
                              <option value="">Selecione</option>
                              {modeloInversor && modeloInversor.map((produto) => (
                                <option key={produto.id} value={produto.description}>{produto.description}</option>
                              ))}
                            </select>
                          </div>

                          <div className="col-sm-2">
                            <label htmlFor="inputFatorSimult" className="form-label" >
                              Potência:
                            </label>

                            <input type="text" className="form-control" id="inputPotModulos" value={potenciaInversor} onChange={(e) => setPotenciaInversor(e.target.value)} />
                          </div>

                          <div className="col-sm-2">
                            <label htmlFor="inputFatorSimult" className="form-label" >
                              Qtde:
                            </label>

                            <input type="text" className="form-control" id="inputFatorSimult" value={qtdeInversor} onChange={(e) => setQtdeInversor(e.target.value)} />
                          </div>

                        </>
                          :
                          <>

                            <div className="col-sm-3">
                              <label htmlFor="inputFatorSimult" className="form-label" >
                                Marca:
                              </label>


                              <select className="form-select" aria-label="Selecionar" onChange={(e) => setMarcaMicroInversor(e.target.value)} value={marcaMicroInversor}>
                                <option value="">Selecionar </option>
                                {modeloMicroInversor ? modeloMicroInversor.map((option) => (<option key={option.id} value={option.brand} >{option.brand}</option>)) : ""}
                              </select>
                            </div>
                            <div className="col-sm-3">
                              <label htmlFor="inputFatorSimult" className="form-label" >
                                Modelo:
                              </label>

                              <select className="form-select" id="inputModeloMicro" value={selectedMicroinversor} onChange={(e) => setSelectecMicroinversor(e.target.value)}  >
                                <option value="">Selecione</option>
                                {modeloMicroInversor && modeloMicroInversor.map((produto) => (
                                  <option key={produto.id} value={produto.description}>{produto.description}</option>
                                ))}

                              </select>

                            </div>
                            <div className="col-sm-2">
                              <label htmlFor="inputFatorSimult" className="form-label" >
                                Potência:
                              </label>

                              <input type="text" className="form-control" id="inputPotModulos" value={potenciaPainel} onChange={(e) => setPotenciaPainel(e.target.value)} />
                            </div>



                            <div className="col-md-2">
                              <label htmlFor="inputFatorSimult" className="form-label" >
                                Qtde:
                              </label>

                              <input type="text" className="form-control" id="inputFatorSimult" value={qtdeMicroInve} onChange={(e) => setQtdeMicroInve(e.target.value)} />
                            </div>

                          </>}

                        <div className="col-sm-1  d-flex align-items-center">
                          <button onClick={(e) => addNewEquipment(e)} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                          </svg></button>
                        </div>

                        <div className="col-sm-1  d-flex align-items-center">
                          <button onClick={(e) => DelEquipment(e)} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                          </svg></button>
                        </div>

                      </div>

                    </div>
                  </div>
                  <br />


                  <div class="card">
                    <div class="card-header">
                      Painéis
                    </div>
                    <div class="card-body">
                      <div className="row d-flex justify-content-start">
                        <div className="col-md-3">
                          <label htmlFor="inputFatorSimult" className="form-label" >
                            Marca
                          </label>
                          <select className="form-select" id="inputTipoSistema" value={marcaPainel} onChange={(e) => setMarcaPainel(e.target.value)}  >
                            <option value="">Selecione</option>
                            {modeloPlaca && modeloPlaca.map((produto) => (
                              <option key={produto.id} value={produto.brand}>{produto.brand}</option>
                            ))}


                          </select>
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="inputComplem" className="form-label">
                            Modelo do Painel
                          </label>
                          <select className="form-select" id="inputTipoSistema" value={selectedModeloPainel} onChange={(e) => setSelectedModeloPainel(e.target.value)}  >
                            <option value="">Selecione</option>
                            {modeloPlaca && modeloPlaca.map((produto) => (
                              <option key={produto.id} value={produto.description}>{produto.description}</option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-2">
                          <label htmlFor="inputPotModulos" className="form-label">
                            Potência:
                          </label>
                          <input type="text" className="form-control" id="inputPotModulos" value={potenciaPainel} onChange={(e) => setPotenciaPainel(e.target.value)} />
                        </div>


                        <div className="col-md-2">
                          <label htmlFor="inputPotModulos" className="form-label">
                            Qtde:
                          </label>
                          <input type="text" className="form-control" id="inputQtdeModulos" value={qtdePainel} onChange={(e) => setQtdePainel(e.target.value)} />
                        </div>

                        <div className="col-sm-1  d-flex align-items-center">
                          <button onClick={(e) => addPainel(e)} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                          </svg></button>
                        </div>

                        {/* <div className="col-sm-1  d-flex align-items-center">
                          <button onClick={(e) => DelEquipment(e)} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                          </svg></button>
                        </div> */}
                      </div>

                    </div>
                  </div>
                  <br />
                  <div class="card">
                    <div class="card-header">
                      Dados do Cliente
                    </div>
                    <div class="card-body">
                      <div className="row d-flex justify-content-start">
                        <div className="col-md-3">
                          <label htmlFor="inputConsumo" className="form-label">
                            Consumo(Kwh):
                          </label>
                          <input type="text" className="form-control" id="inputConsumo" value={consumoMedio} onChange={(e) => setConsumoMedio(e.target.value)} />
                        </div>

                        <div className="col-md-3">
                          <label htmlFor="inputPerda" className="form-label">
                            Perda:
                          </label>
                          <input type="text" className="form-control" id="inputPerda" value={perdas} onChange={(e) => serPerdas(e.target.value)} />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="inputmediaMensal" className="form-label">
                            Média Mensal(Kwh):
                          </label>
                          <input type="text" className="form-control" id="inputCodigo" value={mediaMensal} onChange={(e) => setMediaMensal(e.target.value)} />
                        </div>
                      </div>
                    </div>
                  </div>


                </div>

              </div>

              <div className="modal-footer">
                <button type="button"
                  className="btn btn-secondary  d-flex align-items-center gap-2" data-bs-target="#staticBackdrop2" data-bs-toggle="modal"
                  data-bs-dismiss="modal">Voltar</button>

                <button type="button"
                  className="btn btn-primary  d-flex align-items-center gap-2">

                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save2" viewBox="0 0 16 16">
                    <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v4.5h2a.5.5 0 0 1 .354.854l-2.5 2.5a.5.5 0 0 1-.708 0l-2.5-2.5A.5.5 0 0 1 5.5 6.5h2V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
                  </svg>
                  Salvar Proposta
                </button>
                <button type="button"
                  className="btn btn-primary  d-flex align-items-center gap-2">

                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                  </svg>
                  Gerar Proposta
                </button>
              </div>

            </div>

          </div>

        </div>

      </form >

    </ >

  )

}








